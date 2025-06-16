'use client';
import { useUser } from "@/hooks/querys/useUser";
import { useState, useEffect } from "react";

import { UserEntity } from "@/type/user.entity";
const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserEntity>();
  const { data: user, isLoading, isError } = useUser();
  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (isError) {
    return <div>Error loading user</div>;
  }
  
  const profileEntries = [
    { label: "Registration Date", value: profile?.createdAt },
    { label: "Fullname", value: profile?.name },
    { label: "Email", value: profile?.email },
    { label: "Role", value: profile?.role },
  ];

  return (
    <ul className="flex flex-col gap-4">
      {profileEntries.map(({ label, value }) => (
        <li
          key={label}
          className="flex flex-row gap-8 text-base font-medium text-[#5D5E62]"
        >
          <span className="w-2/5">{label}</span>
          {value || "-"}
        </li>
      ))}
    </ul>
  );
};

const ProfilePage: React.FC = () => {

  return (
    <div className="w-full p-8 drop-shadow h-fit min-h-full bg-white rounded-2xl flex flex-col gap-6">
      <h3 className="font-semibold text-lg">My Profile</h3>
      <Profile />
    </div>
  );
};

export default ProfilePage;
