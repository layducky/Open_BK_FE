"use client";
import React from "react";
import { motion } from "framer-motion";
import { ProfileFrom } from "./settingTabs/ProfileForm";
import { PasswordForm } from "./settingTabs/PasswordForm";
import { FaCamera } from "react-icons/fa";
import { useModal } from "@/context/ModalContext";
import { UserEntity } from "@/type/user.entity";

const tabs: Array<{
  id: string;
  label: string;
  component: React.FC;
}> = [
  // { id: "profile", label: "Profile", component: ProfileFrom },
  { id: "password", label: "Password", component: PasswordForm },
  //   { id: "completedCourses", label: "Completed Courses" },
];

const SettingsPage: React.FC<{
  data: any;
  isLoading: boolean;
  isError: boolean;
}> = ({ data, isLoading, isError }) => {
  const [selectedTab, setSelectedTab] = React.useState(tabs[0].id);
  const { openModal } = useModal();

  const [user, setUser] = React.useState<UserEntity>();
  // const { data: user, isLoading, isError } = useUser();

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [user]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (isError) {
    return <div>Error loading user</div>;
  }
  
  // Hàm xử lý sự kiện khi nhấn vào tab
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="w-full p-8 drop-shadow h-fit min-h-full bg-white rounded-2xl flex flex-col gap-6 min-w-full">
      <h3 className="font-semibold text-lg">Settings</h3>
      <div className="flex flex-col h-fit w-full gap-6">
        <div className="dashboard-top w-full bg-pink-300 h-[15vw] rounded-2xl flex flex-col-reverse px-10 py-8 min-h-fit">
          <div className="flex flex-row gap-5 relative w-fit h-fit rounded-full">
            <img
              className="rounded-full bg-white w-28 aspect-square object-cover border-[6px] border-white"
              src={user?.imageUrl}
            />
            <button
              className="rounded-full border-1 aspect-square border-white w-7 absolute right-[2px] bottom-2 bg-white flex items-center justify-center text-stone-600 duration-200 hover:bg-dodger-blue-500 hover:text-white"
              onClick={() => openModal("UploadProfileModal")}
            >
              <FaCamera />
            </button>
          </div>
        </div>


        <div className="flex flex-row w-full flex-wrap relative gap-3">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex flex-row w-fit flex-wrap px-7 py-2 text-base cursor-pointer hover:bg-gray-500/10 rounded-t-md duration-300 ease-in-out transition-all transform relative${
                selectedTab === tab.id ? "font-semibold" : "font-medium"
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
              {selectedTab === tab.id && (
                <motion.div
                  layoutId="active"
                  className="absolute bottom-0 left-0 bg-dodger-blue-500 h-[3px] w-full"
                  transition={{ durration: 0.6 }}
                />
              )}
            </div>
          ))}
          <div className="w-full h-full border-b-[3px] border-[#C7C6CA] absolute left-0 top-0 -z-10"></div>
        </div>
      </div>
      
      <div className="tab_content w-full h-fit flex flex-col">
        {tabs.map(({ id, component: Component }) =>
          selectedTab === id ? (
            <React.Fragment key={id}>
              <Component />
            </React.Fragment>
          ) : null
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
