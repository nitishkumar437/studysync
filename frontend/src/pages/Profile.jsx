import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProfileHero from "../components/profile/ProfileHero";
import ChangePassword from "../components/profile/ChangePassword";
import StatsCard from "../components/profile/StatsCard";
import EditProfile from "../components/profile/EditProfile";

import { getProfile } from "../services/profileService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try { 
      setLoading(true);
      setError("");

      const data = await getProfile();

      if (data.success) {
        setUser(data.user);
      } else {
        setError(data.message || "Failed to load profile.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="text-lg text-gray-500">Loading Profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
          <h2 className="text-2xl font-semibold text-red-500">{error}</h2>

          <button
            onClick={fetchProfile}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900">My Profile</h1>

          <p className="text-gray-500 mt-2">
            Manage your personal information and account settings.
          </p>
        </div>

        <ProfileHero user={user} refreshProfile={fetchProfile} />

        <div className="my-8">
          <StatsCard user={user} notesCount={15} plannerCount={8} />
        </div>

        <div className="space-y-8">
          <EditProfile user={user} refreshProfile={fetchProfile} />

          <ChangePassword />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
