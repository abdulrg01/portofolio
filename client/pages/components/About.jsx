import { SiFrontendmentor } from "react-icons/si";
import { TfiServer } from "react-icons/tfi";
import { CgIfDesign } from "react-icons/cg";

export default function About() {
  return (
    <section className="bg-gray-200 dark:bg-[#020A13]" id="about">
      <div className="max-w-[1000px] mx-auto py-5 lg:py-14 relative">
        <h2 class="mb-12 head_text blue_gradient title">About me</h2>
        <div className="content flex flex-row items-center gap-28">
          <img
            className="aboutImage rounded-full w-[40%]"
            src="/port2.png"
            alt="about_image"
          />
          <ul className="aboutItems flex flex-col gap-[40px]">
            <li className="aboutItem flex flex-row items-center rounded-3xl list-none p-[10px] gap-5">
              <SiFrontendmentor className="w-[70px] h-[70px]" />
              <div className="aboutItemText">
                <h3 className=" text-[25px] font-[600]">Frontend Developer</h3>
                <p className="desc">
                  I'm a frontend developer with experience in building
                  responsive and optimized sites
                </p>
              </div>
            </li>
            <li className="aboutItem flex flex-row items-center rounded-3xl list-none p-[10px] gap-5">
              <TfiServer className="w-[70px] h-[70px]" />
              <div className="aboutItemText">
                <h3 className=" text-[25px] font-[600]">Backend Developer</h3>
                <p className="desc">
                  I have experience developing fast and optimized and APIs
                </p>
              </div>
            </li>
            <li className="aboutItem flex flex-row items-center rounded-3xl list-none p-[10px] gap-5">
              <CgIfDesign className="w-[70px] h-[70px]" />
              <div className="aboutItemText">
                <h3 className=" text-[25px] font-[600]">UI Designer</h3>
                <p className="desc">
                  I have designed multiple landing pages and have systems as
                  well
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
