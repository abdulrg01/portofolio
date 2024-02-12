import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { PiLinkedinLogoFill } from "react-icons/pi";

export default function EmailSection() {
  return (
    <section className="bg-gray-200 dark:bg-[#020A13]" id="contact">
      <div className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 max-w-[1000px] mx-auto lg:py-14 p-5 relative">
        <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-transparent rounded-full h-60 w-60 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
        <div className="z-10">
          <h5 class="mb-4 head_text blue_gradient">Let's Connect</h5>
          <p className="mb-4 max-w-md desc">
            {" "}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            perferendis sunt modi distinctio ab minima tempore! Illo quae vitae
            cupiditate.
          </p>
          <div className="flex flex-row gap-2 my-5">
            <Link href="github.com">
              <AiFillGithub className="text-white h-8 w-8" />
            </Link>
            <Link href="linkedin.com">
              <PiLinkedinLogoFill className="text-white h-8 w-8" />
            </Link>
          </div>
        </div>
        <div>
          <form className="flex flex-col">
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-gray-700 block mb-2 text-sm font-medium"
              >
                Your Email
              </label>
              <input
                type="text"
                id="email"
                required
                placeholder="adam@gmail.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-gray-700 block mb-2 text-sm font-medium"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                required
                placeholder="Just saying hi"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-gray-700 block text-sm mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Let's talk about..."
              />
            </div>
            <button
              className=" bg-purple-500 hover:bg-purple-600 text-white font-medium py-2.5 px-2.5 rounded-lg w-full"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
