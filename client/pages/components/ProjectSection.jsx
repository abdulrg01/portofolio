import React, { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { motion, useInView } from "framer-motion";
import { useGetProjectsDataQuery } from "@/redux/projects/projectApiSlice";

export default function ProjectSection() {
  const ref = useRef(null);
  const [projects, setProjects] = useState([]);
  const isInView = useInView(ref, { once: true });
  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const { data, isLoading } = useGetProjectsDataQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data) {
      setProjects(data?.projects);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
              {projects &&
                projects.map((item, index) => (
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
                      desc={item.desc}
                      img={item.imageSrc.url}
                      gitUrl={item?.gitUrl}
                      previewUrl={item?.previewUrl}
                    />
                  </motion.li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
