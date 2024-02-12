import React from "react";
import { AiOutlineCamera } from "react-icons/ai";

export default function HeroSection({
  title,
  setTitle,
  desc,
  setDesc,
  image,
  handleUpdate,
  handleEdit,
}) {
  return (
    <section className="bg-transparent w-[95%] m-auto">
      <div className="grid max-w-screen-lg px-4 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7 pl-10">
          {/*  */}
          <textarea
            className="max-w-lg text-4xl resize-none font-bold md:text-4xl xl:text-5xl dark:text-white text-gray-700 bg-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Hello, I'm Abdul"
          />
          <textarea
            value={desc}
            rows={4}
            cols="40"
            onChange={(e) => setDesc(e.target.value)}
            className="max-w-lg bg-transparent font-light text-gray-600 md:text-lg lg:text-xl dark:text-gray-400 focus:ring-0"
            placeholder="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae fuga quas dolores ea reiciendis nemo. Ducimus blanditiis amet eligendi molestiae?."
          />
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex relative">
          <img
            className="h-[350px] w-[350px] rounded-full"
            src={image ? image : "/portI.png"}
            alt="profile"
          />
          <input
            type="file"
            name=""
            id="banner"
            className="hidden"
            onChange={handleUpdate}
            accept="image/*"
          />
          <label htmlFor="banner">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-12 right-10 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera
                size={20}
                className="z-1 text-black dark:text-white"
              />
            </div>
          </label>
        </div>
      </div>
      <div
        className={`rounded-2xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex flex-row justify-center items-center py-3 px-6 cursor-pointer text-black dark:text-white text-[16px] font-Poppins font-semibold w-[100px] min-h-[40px] h-[40px] bg-[#cccccc34]  ${
          title !== title || desc !== desc || image?.url !== image
            ? "cursor-pointer !bg-[#42d383]"
            : "!cursor-not-allowed"
        } absolute bottom-12 right-12`}
        onClick={
          title !== title || desc !== desc || image?.url !== image
            ? handleEdit
            : () => null
        }
      >
        Save
      </div>
    </section>
  );
}
