import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import NoteCard from "../components/notes/NoteCard";
import NoteModal from "../components/notes/NoteModal";
import { Search } from "lucide-react";
import { getNotes, deleteNote } from "../services/noteService";
import DeleteModal from "../components/common/DeleteModal";
const Notes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [noteToDelete, setNoteToDelete] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      if (data.success) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.log("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };
  const openDeleteModal = (id) => {
    setNoteToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      const data = await deleteNote(noteToDelete);

      if (data.success) {
        fetchNotes();

        setShowDeleteModal(false);

        setNoteToDelete(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      note.title.toLowerCase().includes(keyword) ||
      note.content.toLowerCase().includes(keyword);

    const matchesCategory =
      selectedCategory === "All" || note.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center text-gray-500">Loading notes...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Notes
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Capture ideas, lectures and study materials in one place.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedNote(null);
            setIsModalOpen(true);
          }}
          className="
      w-full
      sm:w-auto
      px-6
      py-3
      rounded-2xl
      bg-linear-to-r
      from-purple-600
      to-violet-600
      text-white
      font-semibold
      shadow-lg
      hover:shadow-xl
      hover:scale-105
      transition-all
      duration-300
    "
        >
          + New Note
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="flex-1 w-full relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
      w-full
      pl-11
      pr-4
      py-3
      rounded-2xl  
      border
      border-gray-200
      outline-none
      focus:ring-2
      focus:ring-purple-500
      transition
    "
            />
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {["All", "CS", "Math", "Science", "Literature"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold">No Notes Found</h2>

          <p className="text-gray-500 mt-2">
            Create your first note to get started.
          </p>
        </div>
      ) : (
        <div
          className="grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
2xl:grid-cols-4
gap-6"
        >
          {filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              category={note.category}
              time={new Date(note.createdAt).toLocaleDateString()}
              onDelete={openDeleteModal}
              onEdit={() => handleEdit(note)}
            />
          ))}
        </div>
      )}

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNote(null);
        }}
        fetchNotes={fetchNotes}
        selectedNote={selectedNote}
      />
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setNoteToDelete(null);
        }}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
      />
    </DashboardLayout>
  );
};

export default Notes;
