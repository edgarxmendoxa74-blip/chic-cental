import React, { useState } from 'react';
import { Save, Upload, X, Loader } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { useImageUpload } from '../hooks/useImageUpload';

const SiteSettingsManager: React.FC = () => {
  const { siteSettings, loading, updateSiteSettings } = useSiteSettings();
  const { uploadImage, uploading } = useImageUpload();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    site_name: '',
    site_description: '',
    currency: '',
    currency_code: ''
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');

  React.useEffect(() => {
    if (siteSettings) {
      setFormData({
        site_name: siteSettings.site_name,
        site_description: siteSettings.site_description,
        currency: siteSettings.currency,
        currency_code: siteSettings.currency_code
      });
      setLogoPreview(siteSettings.site_logo);
    }
  }, [siteSettings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let logoUrl = logoPreview;
      
      // Upload new logo if selected
      if (logoFile) {
        try {
          console.log('Uploading logo...');
          const uploadedUrl = await uploadImage(logoFile);
          logoUrl = uploadedUrl;
          console.log('Logo uploaded successfully:', uploadedUrl);
        } catch (uploadError) {
          console.error('Logo upload error:', uploadError);
          alert(`❌ Failed to upload logo: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}\n\nPlease try again or use a different image.`);
          setIsSaving(false);
          return; // Don't proceed if logo upload fails
        }
      }

      // Update all settings
      console.log('Updating settings...');
      await updateSiteSettings({
        site_name: formData.site_name,
        site_description: formData.site_description,
        currency: formData.currency,
        currency_code: formData.currency_code,
        site_logo: logoUrl
      });

      alert('✅ Site settings saved successfully! The changes will appear after page refresh.');
      setIsEditing(false);
      setLogoFile(null);
      
      // Refresh page to show updated logo
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error saving site settings:', error);
      alert(`❌ Failed to save settings: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease try again.`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (siteSettings) {
      setFormData({
        site_name: siteSettings.site_name,
        site_description: siteSettings.site_description,
        currency: siteSettings.currency,
        currency_code: siteSettings.currency_code
      });
      setLogoPreview(siteSettings.site_logo);
    }
    setIsEditing(false);
    setLogoFile(null);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-chick-beige">
      {/* Saving Indicator */}
      {isSaving && (
        <div className="bg-chick-beige border-l-4 border-chick-golden rounded-lg p-4 mb-6 flex items-center space-x-3 shadow-lg">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-chick-orange border-t-transparent"></div>
          <div>
            <p className="font-bold text-chick-dark">
              {uploading ? 'Uploading logo...' : 'Saving settings...'}
            </p>
            <p className="text-sm text-chick-brown">Please wait while we update your settings.</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-chick-dark">⚙️ Site Settings</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-chick-gradient text-white px-6 py-2 rounded-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 font-bold"
          >
            <Save className="h-4 w-4" />
            <span>Edit Settings</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || uploading}
              className="bg-chick-gradient text-white px-6 py-2 rounded-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving || uploading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>{uploading ? 'Uploading...' : 'Saving...'}</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>💾 Save Changes</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Site Logo */}
        <div>
          <label className="block text-sm font-medium text-chick-dark mb-2">
            🐔 Site Logo
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-chick-beige flex items-center justify-center ring-2 ring-chick-golden shadow-md">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Site Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="text-3xl text-chick-brown">🐔</div>
              )}
            </div>
            <div className="flex-1">
              {isEditing && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                    id="logo-upload"
                    disabled={isSaving || uploading}
                  />
                  <label
                    htmlFor="logo-upload"
                    className={`bg-chick-beige text-chick-dark px-4 py-2 rounded-lg hover:bg-chick-golden transition-colors duration-200 flex items-center space-x-2 cursor-pointer border-2 border-chick-golden font-semibold ${
                      isSaving || uploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Upload className="h-4 w-4" />
                    <span>{uploading ? 'Uploading...' : 'Upload New Logo'}</span>
                  </label>
                  <p className="text-xs text-chick-brown mt-2">
                    Supported: JPG, PNG, WebP, GIF (Max 5MB)
                  </p>
                  {logoFile && (
                    <p className="text-xs text-chick-orange mt-1 font-semibold">
                      ✓ New logo selected: {logoFile.name}
                    </p>
                  )}
                </div>
              )}
              {!isEditing && (
                <p className="text-sm text-gray-600">Current logo displayed above</p>
              )}
            </div>
          </div>
        </div>

        {/* Site Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="site_name"
              value={formData.site_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chick-orange focus:border-chick-orange"
              placeholder="Enter site name"
            />
          ) : (
            <p className="text-lg font-medium text-black">{siteSettings?.site_name}</p>
          )}
        </div>

        {/* Site Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Description
          </label>
          {isEditing ? (
            <textarea
              name="site_description"
              value={formData.site_description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chick-orange focus:border-chick-orange"
              placeholder="Enter site description"
            />
          ) : (
            <p className="text-gray-600">{siteSettings?.site_description}</p>
          )}
        </div>

        {/* Currency Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency Symbol
            </label>
            {isEditing ? (
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chick-orange focus:border-chick-orange"
                placeholder="e.g., ₱, $, €"
              />
            ) : (
              <p className="text-lg font-medium text-black">{siteSettings?.currency}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency Code
            </label>
            {isEditing ? (
              <input
                type="text"
                name="currency_code"
                value={formData.currency_code}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chick-orange focus:border-chick-orange"
                placeholder="e.g., PHP, USD, EUR"
              />
            ) : (
              <p className="text-lg font-medium text-black">{siteSettings?.currency_code}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsManager;
