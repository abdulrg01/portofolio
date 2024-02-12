import React from "react";

export default function RigthSide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-end gap-6 dark:text-gray-900 text-gray-300">
      <a href="mailto:abdulrg01@gmail.com">
        <p className="text-sm rotate-90 w-72 tracking-wide text-black dark:text-white">
          react.abdulrg.me
        </p>
      </a>
      <div className="w-[2px] h-28 dark:bg-gray-300 bg-gray-800"></div>
    </div>
  );
}
