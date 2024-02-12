import { useCreateProjectsMutation } from "@/redux/projects/projectApiSlice";
import { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";

export default function ProjectsInfo({}) {
  const [createProjects, { isSuccess, error }] = useCreateProjectsMutation();
  const [projects, setProjects] = useState({
    title: "",
    imageSrc: null,
    desc: "",
    skills: "",
    previewUrl: "",
    gitUrl: "",
  });

  useEffect(() => {
    if (isSuccess) {
      setProjects({
        title: "",
        imageSrc: null,
        desc: "",
        skills: "",
        previewUrl: "",
        gitUrl: "",
      });
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  const projectImage = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        const avatar = reader.result;
        setProjects({ ...projects, imageSrc: avatar });
      }
    };
  };

  const projectsHandler = async (e) => {
    e.preventDefault();
    await createProjects({
      title: projects.title,
      desc: projects.desc,
      gitUrl: projects.gitUrl,
      previewUrl: projects.previewUrl,
      imageSrc: projects.imageSrc,
    });
  };

  return (
    <div>
      <h2 class="w-full flex justify-start ml-24 mb-6 head_text orange_gradient title">
        Add Projects
      </h2>
      <div className="w-full flex justify-center mb-10">
        <div className="relative">
          <img
            src={projects.imageSrc}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={projectImage}
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
      <div className="w-full pl-6 md:px-10 mb-10">
        <form onSubmit={projectsHandler}>
          <div className="md:w-[80%] m-auto block">
            <div className=" w-full flex justify-between mb-5">
              <div className="w-[45%]">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  title
                </label>
                <input
                  type="text"
                  value={projects.title}
                  onChange={(e) =>
                    setProjects({ ...projects, title: e.target.value })
                  }
                  className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:bg-transparent dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-[45%]">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  gitUrl
                </label>
                <input
                  type="text"
                  value={projects.gitUrl}
                  onChange={(e) =>
                    setProjects({ ...projects, gitUrl: e.target.value })
                  }
                  className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:bg-transparent dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                previewUrl
              </label>
              <input
                type="text"
                value={projects.previewUrl}
                className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:bg-transparent dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setProjects({ ...projects, previewUrl: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                desc
              </label>
              <textarea
                name=""
                placeholder="Write something amazing..."
                className={`bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                id=""
                cols="30"
                rows="8"
                onChange={(e) =>
                  setProjects({ ...projects, desc: e.target.value })
                }
                value={projects.desc}
              ></textarea>
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
  );
}
