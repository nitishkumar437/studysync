import { useEffect, useState } from "react";
import { createNote, updateNote } from "../../services/noteService";

const NoteModal = ({ isOpen, onClose, fetchNotes, selectedNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");
      setContent(selectedNote.content || "");
      setCategory(selectedNote.category || "General");
    } else {
      resetForm();
    }
  }, [selectedNote]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("General");
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const noteData = {
        title,
        content,
        category,
      };

      const data = selectedNote
        ? await updateNote(selectedNote._id, noteData)
        : await createNote(noteData);

      if (data.success) {
        resetForm();
        onClose();
        fetchNotes();
      }
    } catch (error) {
      console.log("Note Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {selectedNote ? "Edit Note" : "Create New Note"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Content</label>

            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your notes..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="CS">CS</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="Literature">Literature</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl disabled:opacity-50 transition"
            >
              {loading
                ? "Saving..."
                : selectedNote
                  ? "Update Note"
                  : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
