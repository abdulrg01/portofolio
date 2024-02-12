import { useSendLogoutMutation } from "@/redux/auth/authApiSlice";
import { useRouter } from "next/router";
import { SiHackerone, SiSkillshare } from "react-icons/si";
import { PiProjectorScreen } from "react-icons/pi";
import { BiData, BiHistory, BiHome } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/auth/authSlice";

export default function SideBarProfile({ active, setActive }) {
  const [sendLogout, { isSuccess }] = useSendLogoutMutation();
  const user = useSelector(selectCurrentUser);

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) router.replace("/");
  }, [isSuccess, router]);

  const handleSignOut = async () => {
    await sendLogout();
  };

  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800" : " bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <img
          className=" md:w-[30px] md:h-[30px] w-[20px] h-[20px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          src={user && user.image.url}
          alt="avatar"
        />
        <h5 className="pl-2 md:block hidden dark:text-white text-black ">
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800" : " bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <SiHackerone className="dark:text-white text-black" />
        <h5 className="pl-2 md:block hidden dark:text-white text-black ">
          Hero
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800" : " bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <BiHistory className="dark:text-white text-black" />
        <h5 className="pl-2 md:block hidden dark:text-white text-black ">
          History
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800" : " bg-transparent"
        }`}
        onClick={() => setActive(4)}
      >
        <PiProjectorScreen className="dark:text-white text-black" />
        <h5 className="pl-2 md:block hidden dark:text-white text-black ">
          Projects
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 5 ? "dark:bg-slate-800" : " bg-transparent"
        }`}
        onClick={() => setActive(5)}
      >
        <SiSkillshare className="dark:text-white text-black" />
        <h5 className="pl-2 md:block hidden dark:text-white text-black ">
          Skills
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 6 ? "dark:bg-slate-800" : " bg-transparent"
        }`}
        onClick={() => setActive(6)}
      >
        <BiData className="dark:text-white text-black" />
        <h5 className="pl-2 md:block hidden dark:text-white text-black ">
          Edit Portfolio
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 7 ? "dark:bg-slate-800" : " bg-transparent"
        }`}
        onClick={handleSignOut}
      >
        <AiOutlineLogout className="dark:text-white text-black" />
        <h5 className="pl-2 md:block hidden dark:text-white text-black ">
          Log Out
        </h5>
      </div>
    </div>
  );
}
