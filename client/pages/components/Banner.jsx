import { useGetHeroDataQuery } from "@/redux/hero/heroApiSlice";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

export default function Banner() {
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const { data } = useGetHeroDataQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data) {
      setTitle(data[0].banner.title);
      setDesc(data[0].banner.desc);
    }
  }, [data]);

  return (
    <section
      id="home"
      className="max-w-[950px] mx-auto py-5 md:pb-5 md:pt-32 flex flex-col gap-4 lg:gap-6 md:px-10 xl:px-4"
    >
      <motion.h3
        className="text-lg tracking-wide text-black dark:text-white"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Hello I'am
      </motion.h3>
      <motion.h1
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-2 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white flex flex-col"
      >
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Abdul",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "Web Developer",
            1000,
            "Mobile Developer",
            1000,
            "Mern Stack",
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
        <span className="mt-2 lg:mt-2 text-gray-600 dark:text-gray-500">
          {title ? title : "I build things for the web."}
        </span>
      </motion.h1>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-base md:max-w-[650px] text-gray-500 dark:text-gray-400 font-medium"
      >
        {desc
          ? desc
          : "Welcome to my portfolio! I am Abdulrahman Abubakar, a passionate web developer with a keen eye for design and a drive for innovation. Through my diverse range of projects, I aim to showcase my creativity, technical proficiency, and dedication to delivering exceptional results."}
      </motion.p>
      <a href="https://github.com/abdulrg01">
        <motion.button
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1, delay: 0.1 }}
          class="text-black dark:text-white hover:underline font-medium rounded-lg text-sm py-2.5 text-center me-2 mb-2 inline-flex"
        >
          Learn More
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </motion.button>
      </a>
    </section>
  );
}
