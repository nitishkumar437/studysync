import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProfileHero from "../components/profile/ProfileHero";
import ChangePassword from "../components/profile/ChangePassword";
import StatsCard from "../components/profile/StatsCard";
import EditProfile from "../components/profile/EditProfile";

import { getProfile } from "../services/profileService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log("Error fetching profile:", error);
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
        <div className="flex items-center justify-center h-[70vh]">
          <h2 className="text-2xl font-semibold text-gray-500">
            Loading Profile...
          </h2>
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
