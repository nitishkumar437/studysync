import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { X, Loader2 } from "lucide-react";

const ImageCropModal = ({ image, onClose, onUpload, uploading }) => {
  const editorRef = useRef(null);

  const [zoom, setZoom] = useState(1.2);

  const handleUpload = () => {
    if (!editorRef.current) return;

    const canvas = editorRef.current.getImageScaledToCanvas();

    canvas.toBlob(
      (blob) => {
        if (blob) {
          onUpload(blob);
        }
      },
      "image/jpeg",
      0.95,
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Crop Profile Photo
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Drag the image and adjust zoom.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={uploading}
            className="w-11 h-11 rounded-full hover:bg-gray-100 transition flex items-center justify-center disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Crop Area */}

        <div className="bg-gray-900 flex items-center justify-center h-130">
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={360}
            height={360}
            border={35}
            borderRadius={180}
            color={[0, 0, 0, 0.65]}
            scale={zoom}
            rotate={0}
            className="rounded-2xl shadow-2xl cursor-move"
          />
        </div>

        {/* Zoom */}

        <div className="px-8 py-6">
          <div className="flex justify-between mb-3">
            <label className="font-semibold text-gray-700">Zoom</label>

            <span className="text-indigo-600 font-semibold">
              {zoom.toFixed(1)}x
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={4}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 px-8 pb-8">
          <button
            onClick={onClose}
            disabled={uploading}
            className="
              px-7
              py-3
              rounded-xl
              border
              border-gray-300
              hover:bg-gray-100
              transition
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            disabled={uploading}
            onClick={handleUpload}
            className="
              flex
              items-center
              gap-2
              px-8
              py-3
              rounded-xl
              bg-linear-to-r
              from-indigo-600
              to-purple-600
              text-white
              font-semibold
              hover:shadow-xl
              hover:scale-105
              transition-all
              duration-300
              disabled:opacity-60
              disabled:hover:scale-100
            "
          >
            {uploading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Uploading...
              </>
            ) : (
              "Crop & Upload"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
