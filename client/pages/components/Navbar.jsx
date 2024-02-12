import Link from "next/link";
import { motion } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import {
  useRefreshMutation,
  useSendLogoutMutation,
} from "@/redux/auth/authApiSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setCredentials, setUser } from "@/redux/auth/authSlice";
import { AiFillContacts, AiFillProfile, AiFillProject } from "react-icons/ai";
import CustomModel from "./CustomModal";
import Login from "../login";

export default function Navbar() {
  const [gadget, setGadget] = useState(false);
  const [refresh, { data }] = useRefreshMutation();
  const dispatch = useDispatch();
  const [sendLogout] = useSendLogoutMutation();
  const user = data?.user;
  const token = data?.token;
  const router = useRouter();
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
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
    <div className="w-full flex items-center justify-center h-20 lg:h-[12vh] fixed top-0 left-0 right-0 z-50 bg-gray-200 dark:bg-[#020A13] border-gray-800 border-b-[1px]">
      <div className="w-screen mx-auto">
        <div className="max-w-[1180px] h-full mx-auto py-3 md:px-0 px-3 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/logo.png"
              className="h-[75px] w-[75px]"
              alt="Logo"
            />
          </motion.div>
          <div className="hidden md:inline-flex items-center gap-7">
            <ul className="flex text-[13px] gap-7">
              <Link
                href="#home"
                className="hover:text-green-300 font-medium text-sm flex items-center gap-1 cursor-pointer duration-300 nav-link"
              >
                <motion.li
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.1 }}
                >
                  Home
                </motion.li>
              </Link>
              <Link
                href="#about"
                className="flex items-center gap-1 cursor-pointer duration-300 nav-link hover:text-green-300 font-medium text-sm"
              >
                <motion.li
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.1, delay: 0.1 }}
                >
                  About
                </motion.li>
              </Link>
              <Link
                href="#experiance"
                className="flex items-center gap-1 cursor-pointer duration-300 nav-link hover:text-green-300 font-medium text-sm"
              >
                <motion.li
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.1, delay: 0.1 }}
                >
                  Experiance
                </motion.li>
              </Link>
              <Link
                href="#project"
                className="flex items-center gap-1 cursor-pointer duration-300 nav-link hover:text-green-300 font-medium text-sm"
              >
                <motion.li
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.1, delay: 0.1 }}
                >
                  Project
                </motion.li>
              </Link>
              <Link
                href="#contact"
                className="flex items-center gap-1 cursor-pointer duration-300 nav-link hover:text-green-300 font-medium text-sm"
              >
                <motion.li
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.1, delay: 0.1 }}
                >
                  Contact
                </motion.li>
              </Link>
              <ThemeSwitcher />
            </ul>
          </div>
          {/* small icon section */}
          <div
            onClick={() => setGadget((prev) => !prev)}
            className="w-6 h-5 flex flex-col justify-between items-center md:hidden text-4xl text-green-300 cursor-pointer overflow-hidden"
          >
            <span className="sr-only">View notifications</span>
            {/* <!-- Icon --> */}
            <svg
              className="w-4 h-4 text-purple-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
          </div>
          {gadget && (
            <div className="overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-900 dark:divide-gray-900 absolute top-11 right-2">
              <div className="grid grid-cols-3 gap-4 p-4">
                <Link
                  href="#home"
                  className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                >
                  <svg
                    className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                  </svg>
                  <div className="text-sm font-medium ">Home</div>
                </Link>
                <Link
                  href="#project"
                  className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                >
                  <AiFillProject className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" />
                  <div className="text-sm font-medium ">Projects</div>
                </Link>
                <Link
                  href="#experiance"
                  className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                >
                  <svg
                    className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    {" "}
                    <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />{" "}
                    <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />{" "}
                  </svg>
                  <div className="text-sm font-medium ">Experiance</div>
                </Link>
                <Link
                  href="#contact"
                  className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                >
                  <AiFillContacts className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" />
                  <div className="text-sm font-medium ">Contact</div>
                </Link>

                {token ? (
                  <span
                    onClick={() => router.push("/profile")}
                    className="block items-center p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                  >
                    <img
                      className="mx-auto mb-2 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                      src={image}
                      alt="profile"
                    />
                    Profile
                  </span>
                ) : (
                  <span
                    onClick={() => setOpen(true)}
                    className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                  >
                    <AiFillProfile className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" />
                    Profile
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => sendLogout}
                  className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                >
                  <svg
                    className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                    />
                  </svg>
                  <div className="text-sm font-medium ">Logout</div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
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
