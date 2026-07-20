import { Camera, User, Upload, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import { useUser } from "../../context/userContext";
import ImageCropModal from "./ImageCropModal";
import { uploadProfilePhoto } from "../../services/profileService";

const ProfileHero = ({ user, refreshProfile }) => {
  const { fetchUser } = useUser();

  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);

  const handleSelectImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5 MB");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    const preview = URL.createObjectURL(file);

    setSelectedImage(preview);
    setShowCropModal(true);

    e.target.value = "";
  };

  const handleCropUpload = async (blob) => {
    try {
      if (!blob) {
        toast.error("Please select an image.");
        return;
      }

      setUploading(true);

      const compressedImage = await imageCompression(blob, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      const formData = new FormData();

      formData.append("avatar", compressedImage, "profile.jpg");

      const data = await uploadProfilePhoto(formData);

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success("Profile photo updated successfully!");
      await fetchUser();
      await refreshProfile();

      setShowCropModal(false);

      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }

      setSelectedImage(null);
    } catch (error) {
      console.log(error);

      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        hidden
        accept="image/*"
        ref={fileInputRef}
        onChange={handleSelectImage}
      />
      {showCropModal && (
        <ImageCropModal
          image={selectedImage}
          uploading={uploading}
          onClose={() => {
            if (selectedImage) {
              URL.revokeObjectURL(selectedImage);
            }

            setSelectedImage(null);
            setShowCropModal(false);
          }}
          onUpload={handleCropUpload}
        />
      )}
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
        <div className="h-40 sm:h-48 bg-linear-to-r from-indigo-600 via-violet-500 to-purple-500" />

        <div className="px-6 sm:px-8 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 -mt-16 sm:-mt-20">
              <div className="relative mx-auto sm:mx-0  group">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-[6px] border-white shadow-2xl bg-white"
                  />
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-white shadow-2xl bg-white flex items-center justify-center">
                    <User size={70} className="text-indigo-600" />
                  </div>
                )}

              
                <div
                  className="
    absolute inset-0
    rounded-full
    bg-black/40
    flex items-center justify-center
    opacity-0
    group-hover:opacity-100
    transition-all duration-300
    cursor-pointer
  "
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center text-white">
                    <Camera size={28} />
                    <span className="text-xs mt-1 font-medium">Change</span>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-left mt-2 sm:mt-12">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                  {user?.name}
                </h1>

                <p className="mt-2 text-lg text-gray-500">
                  {user?.course} • {user?.college}
                </p>

                {user?.email && (
                  <p className="mt-2 text-gray-400 text-sm">{user.email}</p>
                )}
              </div>
            </div>

            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition disabled:opacity-60"
              >
                {uploading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Upload Photo
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHero;
