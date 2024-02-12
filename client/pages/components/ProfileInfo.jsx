import { selectCurrentUser } from "@/redux/auth/authSlice";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/user/userApiSlice";
import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function ProfileInfo() {
  const [updateAvatar] = useUpdateAvatarMutation();
  const [editProfile] = useEditProfileMutation();
  const user = useSelector(selectCurrentUser)
  const [name, setName] = useState(null);

  const imageHandler = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        const avatarI = reader.result;
        updateAvatar(avatarI);
      }
    };
  };

  const handleSummit = async (e) => {
    e.preventDefault();
    await editProfile({ name });
  };

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="relative">
          <img
            src={user && user.image.url}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera
                size={20}
                className="z-1 text-white dark:text-white"
              />
            </div>
          </label>
        </div>
      </div>
      <div className="w-full pl-6 md:px-10">
        <form onSubmit={handleSummit}>
          <div className="md:w-[80%] m-auto block">
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                value={user && user.name}
                className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:bg-transparent dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                readOnly
                value={user && user.email}
                className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:bg-transparent dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
