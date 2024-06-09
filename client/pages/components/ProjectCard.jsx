import { AiFillGithub } from "react-icons/ai";
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";

export default function ProjectCard({ title, img, desc, previewUrl, gitUrl }) {
  return (
    <div>
      <div
        className="h-48 md:h-64 rounded-t-xl relative group"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className=" bg-[#181818] h-full w-full bg-opacity-0 hidden absolute top-0 left-0 group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 items-center justify-center">
          <a
            href={`${gitUrl}`}
            className="h-14 w-14  border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link mr-3"
            target="_blank"
          >
            <AiFillGithub className="h-8 w-8 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white  mr-3" />
          </a>
          <a
            href={`${previewUrl}`}
            target="_blank"
            className="h-14 w-14  border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <PiLinkSimpleHorizontalBold className="h-8 w-8 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
          </a>
        </div>
      </div>
      <div className="text-white rounded-b-xl bg-gray-900 py-6 px-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE]">{desc}</p>
      </div>
    </div>
  );
}
