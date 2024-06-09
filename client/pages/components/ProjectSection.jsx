import React, { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { motion, useInView } from "framer-motion";

const projectsUI = [
  {
    title: "Social Media Platform",
    imageSrc: "/social.png",
    description:
      "From breaking news and entertainment to sports, politics, and everyday interests, when it happens in the world.",
    skills: ["Next js", "Express", "Node"],
    previewUrl: "social-media-opal-sigma.vercel.app",
    gitUrl: "https://github.com/abdulrg01/social-media",
  },
  {
    title: "AI Prompt",
    imageSrc: "/ai.png",
    description:
      "AI Prompt is an open-source AI prompting tool for modern world tip to discover, create and share creative prompts",
    skills: ["React", "Express", "Node"],
    previewUrl: "https://ai-prompt-tan.vercel.app/",
    gitUrl: "https://github.com/abdulrg01/AI_Prompt",
  },
  {
    title: "RG Elearning",
    imageSrc: "/eclass.png",
    description:
      "ABC is an online learning platform that helps students, companies, and governments gain the skills they need to reach their goals",
    previewUrl: "https://eclass-two.vercel.app/",
    gitUrl: "https://github.com/abdulrg01/eclass.git",
  },
  {
    title: "Gpower",
    imageSrc: "/gpower.png",
    description:
      "Gpower An all-in-one app for bill payments, airtime, data, betting, electricity, TV and other services.",
    previewUrl: "https://dashboard-nu-liart-54.vercel.app/",
    gitUrl: "https://github.com/abdulrg01/dashboard.git",
  },
];

export default function ProjectSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <div className="bg-gray-200 dark:bg-[#020A13]" id="project">
      <div className="max-w-[1000px] mx-auto py-5 lg:py-14">
        <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 class="mb-4 head_text blue_gradient">My Projects</h2>
          <p class="font-light text-gray-700 lg:mb-16 sm:text-xl">
            Explore the whole collection of open-source web components and
            elements built with the utility classes from Tailwind
          </p>
        </div>
        <ul
          ref={ref}
          class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2"
        >
          {projectsUI.map((item, index) => (
            <motion.li
              key={index}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: index + 0.4 }}
            >
              <ProjectCard
                key={index}
                title={item.title}
                desc={item.description}
                img={item.imageSrc}
                gitUrl={item.gitUrl}
                previewUrl={item.previewUrl}
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
