const historyUI = [
  {
    organisation: "RG",
    experiences: "Worked on Rg Maps, Reduced load times by 50%",
    startDate: "Sept, 2022",
    endDate: "Present",
    imageSrc: "/project.png",
  },
];

const skillsUI = [
  {
    title: "HTML",
    imageSrc: "/html.png",
  },
  {
    title: "CSS",
    imageSrc: "/css.png",
  },
  {
    title: "React",
    imageSrc: "/react.png",
  },
  {
    title: "Node",
    imageSrc: "/node.png",
  },
  {
    title: "MongoDB",
    imageSrc: "/mongodb.png",
  },
  {
    title: "Figma",
    imageSrc: "/figma.png",
  },
];

export default function Experience() {
  return (
    <section id="experiance" className="bg-gray-200 dark:bg-[#020A13]">
      <div className="max-w-[1000px] mx-auto py-5 lg:py-14">
        <h2 class="mb-20 head_text blue_gradient title">Experience</h2>
        <div className="content flex flex-row justify-evenly mt-[14px] ">
          <div className="skills w-[45%] flex flex-wrap gap-[37px]">
            {skillsUI.map((skill, index) => {
              return (
                <div
                  key={index}
                  className="skill flex flex-col items-center gap-3"
                >
                  <div className="skillImg rounded-full flex items-center justify-center w-[120px] h-[120px]">
                    <img
                      className="w-[75px]"
                      src={skill.imageSrc}
                      alt={skill.title}
                    />
                  </div>
                  <p className="text-[20px] font-[500] text-black dark:text-gray-300">
                    {skill.title}
                  </p>
                </div>
              );
            })}
          </div>
          <ul className="history w-[45%] flex flex-col gap-[30px]">
            {historyUI.map((item, index) => {
              return (
                <li
                  key={index}
                  className="historyItem flex flex-row items-center gap-[10px] bg-[#19376d]"
                >
                  <img
                    className="w-[50px]"
                    src={item.imageSrc}
                    alt={item.organisation}
                  />
                  <div className="historyItemDetails">
                    <h3 className="text-[20px] font-[400] text-gray-300">
                      {item.organisation}
                    </h3>
                    <p className="desc">{item.experiences}</p>
                    <p className="desc">{`${item.startDate} ${item.endDate}`}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
