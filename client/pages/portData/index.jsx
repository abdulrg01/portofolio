import { useState } from "react";
import Expe from "../info/Expe";
import Proje from "../info/Proje";
import Hist from "../info/Hist";

export default function PortData() {
  const [category, setCategory] = useState("Experience");

  return (
    <div>
      <div className="w-[95%] md:w-[85%] min-h-[70vh] m-auto">
        <div className="w-full flex items-center flex-wrap">
          <div
            className={`h-[35px] ${
              category === "Experience" ? "bg-[crimson]" : "bg-[#5050cb]"
            } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
            onClick={() => setCategory("Experience")}
          >
            Experience
          </div>
          {["Projects", "History"].map((item, index) => (
            <div key={index}>
              <div
                className={`h-[35px] ${
                  category === item ? "bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory(item)}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
        <br />
            {category === "Experience" && (
                <Expe />
            )}
            {category === "History" && (
                <Hist />
            )}
            {category === "Projects" && (
                <Proje />
            )}
      </div>
    </div>
  );
}
