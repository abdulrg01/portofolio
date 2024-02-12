// import React from "react";

// export default function About() {
//   return (
//     <section className="bg-gray-50 dark:bg-gray-950">
//       <div class="gap-16 items-center py-4 px-4 lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 mx-auto max-w-6xl">
//         <div class="font-light">
//           <h2 class="mb-4 head_text blue_gradient">
//             About me
//           </h2>
//           <p class="mb-4 desc">
//             We are strategists, designers and developers. Innovators and problem
//             solvers. Small enough to be simple and quick, but big enough to
//             deliver the scope you want at the pace you need. Small enough to be
//             simple and quick, but big enough to deliver the scope you want at
//             the pace you need.
//           </p>
//           <p className="desc">
//             We are strategists, designers and developers. Innovators and problem
//             solvers. Small enough to be simple and quick.
//           </p>
//         </div>
//         <div class="grid grid-cols-2 gap-4">
//           <img
//             class="w-full rounded-lg"
//             src="/portI.png"
//             alt="office content 1"
//           />
//           <img
//             class="mt-4 w-full lg:mt-10 rounded-lg"
//             src="port2.png"
//             alt="office content 2"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

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
