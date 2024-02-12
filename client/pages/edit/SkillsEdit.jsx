import {
  useGetSkillDetailsQuery,
  useUpdateSkillsMutation,
} from "@/redux/skills/skillsApiSlice";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";

export default function SkillsEdit({ id }) {
  const [updateSkills, { isSuccess, error }] = useUpdateSkillsMutation();
  const { data, isLoading, refetch } = useGetSkillDetailsQuery(id);
  const [skills, setSkills] = useState({
    title: "",
    img: null,
  });

  useEffect(() => {
    if (data) {
      setSkills({
        title: data.skill.title,
        img: data.skill.img.url,
      });
    }
    if (isSuccess) {
      refetch();
      setSkills({
        title: data.skill.title,
        img: data.skill.img.url,
      });
    }
    if (error) {
      console.log(error);
    }
  }, [data, isSuccess, error]);

  const skillsImage = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        const avatar = reader.result;
        setSkills({ ...skills, img: avatar });
      }
    };
  };

  const skillsHandler = async (e) => {
    e.preventDefault();
    await updateSkills({
      title: skills.title,
      img: skills.img,
      id,
    });
  };
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-gray-200 dark:bg-[#020A13]">
          {/* navbar */}
          <div className="w-full bg-gray-200 dark:bg-[#020A13] flex items-center justify-center h-20 lg:h-[12vh] sticky top-0 z-50 px-4 border-gray-700 border-b-[1px]">
            <div className="w-[95%] mx-auto">
              <div className="max-w-5xl h-full mx-auto py-3 flex items-center justify-between">
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
          <div className="mt-24">
            <h2 class="w-full flex justify-start ml-36 mb-6 head_text orange_gradient title">
              Edit Skills
            </h2>
            <div className="w-full flex justify-center">
              <div className="relative">
                <img
                  src={skills.img}
                  className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
                />
                <input
                  type="file"
                  name=""
                  id="avatar"
                  className="hidden"
                  onChange={skillsImage}
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
              <form onSubmit={skillsHandler}>
                <div className="md:w-[80%] m-auto block">
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Skills
                    </label>
                    <input
                      type="text"
                      value={skills.title}
                      className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:bg-transparent dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) =>
                        setSkills({ ...skills, title: e.target.value })
                      }
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
        </div>
      )}
    </>
  );
}
