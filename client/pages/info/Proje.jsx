import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useGetProjectsDataQuery } from "@/redux/projects/projectApiSlice";
import ProjectCard from "../components/ProjectCard";
import Link from "next/link";

export default function Proje() {
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
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="px-4 mx-auto max-w-6xl lg:py-10 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center mb-5 lg:mb-16">
              <h2 class="mb-4 head_text blue_gradient">My Projects</h2>
              <p class="font-light text-gray-700 lg:mb-16 sm:text-xl">
                Explore the whole collection of open-source web components and
                elements built with the utility classes from Tailwind
              </p>
            </div>
            <ul
              ref={ref}
              class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 grid-cols-2"
            >
              {projects &&
                projects.map((item, index) => (
                  <Link href={`/projectAccess/${item._id}`}>
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
                  </Link>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
