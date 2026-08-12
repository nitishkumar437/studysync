import { useEffect, useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Upload,
  Save,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import { getInstitute, updateInstitute } from "../services/instituteService";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  // Fetch Institute Settings
  useEffect(() => {
    fetchInstitute();
  }, []);

  const fetchInstitute = async () => {
    try {
      setLoading(true);

      const response = await getInstitute();

      const institute = response.institute;

      setFormData({
        name: institute?.name || "",
        email: institute?.email || "",
        phone: institute?.phone || "",
        address: institute?.address || "",
      });

      setLogoPreview(institute?.logo || "");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Logo Change
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Logo size should be less than 5MB.");
      return;
    }

    setLogo(file);

    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Institute name is required.");
    }

    if (!formData.email.trim()) {
      return toast.error("Institute email is required.");
    }

    try {
      setSaving(true);

      const response = await updateInstitute({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      });

      toast.success(
        response.message || "Institute settings updated successfully.",
      );
      window.dispatchEvent(new Event("instituteUpdated"));
      // Refresh latest data
      await fetchInstitute();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

          <p className="text-gray-500 mt-1">Manage your institute settings.</p>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border p-16">
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Loader2 size={22} className="animate-spin" />
              Loading institute settings...
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            {/* Card Header */}

            <div className="p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Building2 size={23} className="text-violet-600" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Institute Profile
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Update your institute information.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit} className="p-6">
              {/* Logo */}

              <div className="mb-8">
                <label className="font-medium text-gray-700">
                  Institute Logo
                </label>

                <div className="flex items-center gap-5 mt-3">
                  <div className="w-20 h-20 rounded-2xl bg-violet-100 border flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Institute Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building2 size={35} className="text-violet-600" />
                    )}
                  </div>

                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-3 border rounded-xl hover:bg-gray-50 transition">
                      <Upload size={18} />
                      <span>Upload Logo</span>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      disabled={saving}
                      className="hidden"
                    />
                  </label>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG or WEBP. Maximum size 5MB.
                </p>
              </div>

              {/* Fields */}

              <div className="grid grid-cols-2 gap-6">
                {/* Institute Name */}

                <div className="col-span-2">
                  <label className="font-medium text-gray-700">
                    Institute Name
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative mt-2">
                    <Building2
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={saving}
                      placeholder="Enter institute name"
                      className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                {/* Email */}

                <div>
                  <label className="font-medium text-gray-700">
                    Institute Email
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative mt-2">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={saving}
                      placeholder="institute@example.com"
                      className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                {/* Phone */}

                <div>
                  <label className="font-medium text-gray-700">
                    Institute Phone
                  </label>

                  <div className="relative mt-2">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={saving}
                      placeholder="Enter phone number"
                      className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                {/* Address */}

                <div className="col-span-2">
                  <label className="font-medium text-gray-700">
                    Institute Address
                  </label>

                  <div className="relative mt-2">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-4 text-gray-400"
                    />

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={saving}
                      rows="4"
                      placeholder="Enter institute address"
                      className="w-full pl-11 pr-4 py-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}

              <div className="flex justify-end mt-8 pt-6 border-t">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl transition disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Settings;
