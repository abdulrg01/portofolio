import { TbBrandGithub } from "react-icons/tb";
import {
  SlSocialFacebook,
  SlSocialTwitter,
  SlSocialInstagram,
} from "react-icons/sl";
import { useEffect, useState } from "react";
import { useRefreshMutation } from "@/redux/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import CustomModel from "./CustomModal";
import Login from "../login";
import { setCredentials, setUser } from "@/redux/auth/authSlice";

export default function LeftSide() {
  const [refresh, { data }] = useRefreshMutation();
  const dispatch = useDispatch();
  const user = data?.user;
  const token = data?.token;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [image, setImage] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        //const response =
        await refresh();
        //const { accessToken } = response.data
      } catch (err) {
        console.error(err);
      }
    };

    if (!data) verifyRefreshToken();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setUser({ user }));
      dispatch(setCredentials({ token }));
      setImage(user.image.url);
      setRole(user.role);
    }
  }, [data, router]);

  return (
    <div className="flex flex-col w-full h-full items-center justify-end gap-4 text-gray-300">
      <div className="flex flex-col gap-4">
        <a href="https://github.com/abdulrg01/dashboard.git" target="_blank">
          <span className="w-10 h-10 text-xl bg-slate-800 dark:bg-slate-900 rounded-full inline-flex items-center justify-center hover:text-green-300 cursor-pointer hover:translate-y-2 transition-all duration-300">
            <TbBrandGithub />
          </span>
        </a>
        <a href="#" target="_blank">
          <span className="w-10 h-10 text-xl bg-slate-800 dark:bg-slate-900 rounded-full inline-flex items-center justify-center hover:text-green-300 cursor-pointer hover:translate-y-2 transition-all duration-300">
            <SlSocialTwitter />
          </span>
        </a>
        <a href="#" target="_blank">
          <span className="w-10 h-10 text-xl bg-slate-800 dark:bg-slate-900 rounded-full inline-flex items-center justify-center hover:text-green-300 cursor-pointer hover:translate-y-2 transition-all duration-300">
            <SlSocialFacebook />
          </span>
        </a>
        <a href="#" target="_blank">
          <span className="w-10 h-10 text-xl bg-slate-800 dark:bg-slate-900 rounded-full inline-flex items-center justify-center hover:text-green-300 cursor-pointer hover:translate-y-2 transition-all duration-300">
            <SlSocialInstagram />
          </span>
        </a>
        {data && role === "admin" ? (
          <Link
            href="/profile"
            className="w-10 h-10 text-xl bg-slate-900 rounded-full inline-flex items-center justify-center hover:text-green-300 cursor-pointer hover:translate-y-2 transition-all duration-300"
          >
            <img
              className="w-[30px] h-[30px] rounded-full cursor-pointer"
              src={image}
              alt="profile"
            />
          </Link>
        ) : (
          <span
            className="w-10 h-10 text-xl bg-slate-800 dark:bg-slate-900 rounded-full inline-flex items-center justify-center hover:text-green-300 cursor-pointer hover:translate-y-2 transition-all duration-300"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">View notifications</span>
            {/* <!-- Icon --> */}
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
          </span>
        )}
      </div>
      <div className="w-[2px] h-28 dark:bg-gray-300 bg-gray-800"></div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              Component={Login}
            />
          )}
        </>
      )}
    </div>
  );
}
