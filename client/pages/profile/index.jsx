import React, { useEffect, useState } from "react";
import {
  useGetHeroDataQuery,
  useUpdateHeroMutation,
} from "@/redux/hero/heroApiSlice";
import SideBarProfile from "../components/SideBarProfile";
import HeroSection from "../components/HeroSection";
import HistoryInfo from "../components/HistoryInfo";
import ProfileInfo from "../components/ProfileInfo";
import Skills from "../components/Skills";
import ProjectsInfo from "../components/ProjectsInfo";
import PortData from "../portData";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";

export default function index() {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { data, isSuccess } = useGetHeroDataQuery();
  const [updateHero, { error }] = useUpdateHeroMutation();

  useEffect(() => {
    if (isSuccess && data) {
      setTitle(data[0].banner.title);
      setDesc(data[0].banner.desc);
      setImage(data[0].banner.image.url);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error;

        console.log(errorMessage.data.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (reader.readyState === 2) {
        setImage(e.target.result);
      }
    };
  };

  const handleEdit = async (e) => {
    await updateHero({ image, title, desc, type: "Hero" });
  };

  return (
    <div className="bg-gray-200 dark:bg-[#020A13]">
      {/* navbar */}
      <div className="w-full flex items-center justify-center h-20 lg:h-[12vh] sticky top-0 z-50 px-4 bg-gray-200 dark:bg-[#020A13] border-gray-700 border-b-[1px]">
        <div className="w-[95%] mx-auto">
          <div className="max-w-[1100px] h-full mx-auto py-3 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/">
                <img
                  src="/logo.png"
                  className="h-[70px] w-[70px]"
                  alt="Logo"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      {/* body */}
      <div className="w-[85%] flex mx-auto mt-12">
        <div className="hidden">
          <Navbar />
        </div>
        <div className="top-[20px] w-[60px] md:w-[310px] h-[450px] bg-gray-200 dark:bg-[#020A13] bg-opacity-90 bg-transparent border dark:border-[#ffffff1d] border-[#ffffff0d] rounded-[5px] dark:shadow-sm shadow-xl mt-[20px] mb-[30px] sticky left-[30px]">
          <SideBarProfile setActive={setActive} active={active} />
        </div>
        {active === 1 && (
          <div className="w-full h-full bg-transparent mt-[20px]">
            <ProfileInfo />
          </div>
        )}
        {active === 2 && (
          <div className="w-full h-full bg-transparent mt-[20px]">
            <HeroSection
              title={title}
              setTitle={setTitle}
              desc={desc}
              setDesc={setDesc}
              image={image}
              setImage={setImage}
              handleUpdate={handleUpdate}
              handleEdit={handleEdit}
            />
          </div>
        )}
        {active === 3 && (
          <div className="w-full h-full bg-transparent">
            <HistoryInfo />
          </div>
        )}
        {active === 4 && (
          <div className="w-full h-full bg-transparent">
            <ProjectsInfo />
          </div>
        )}
        {active === 5 && (
          <div className="w-full h-full bg-transparent">
            <Skills />
          </div>
        )}
        {active === 6 && (
          <div className="w-full h-full bg-transparent mt-[20px]">
            <PortData />
          </div>
        )}
      </div>
    </div>
  );
}
