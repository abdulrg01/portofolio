import About from "./components/About";
import ProjectSection from "./components/ProjectSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Navbar from "./components/Navbar";
import LeftSide from "./components/LeftSide";
import RigthSide from "./components/RigthSide";
import { motion } from "framer-motion";
import Banner from "./components/Banner";

export default function Home() {
  return (
    <main className="flex h-screen flex-col w-full overflow-x-hidden overflow-y-scroll bg-gray-200 dark:bg-[#020A13]">
      <Navbar />
      <div className="w-full h-[88vh] xl:flex items-center gap-20 justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="hidden xl:inline-flex w-32 h-full fixed left-0 bottom-0"
        >
          <LeftSide />
        </motion.div>
        <div className="mx-auto p-4 h-[88vh] w-full">
          <Banner />
          <About />
          <Experience />
          <ProjectSection />
          <EmailSection />
          <Footer />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden xl:inline-flex w-32 h-full fixed right-0 bottom-0"
        >
          <RigthSide />
        </motion.div>
      </div>
    </main>
  );
}
