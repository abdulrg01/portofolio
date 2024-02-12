import { useGetHistoryDataQuery } from "@/redux/history/historyApiSlice";
import { useEffect } from "react";
import { useGetSkillsDataQuery } from "@/redux/skills/skillsApiSlice";

export default function Experience() {
  const { data: history, refetch } = useGetHistoryDataQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data, refetch: skillsRefetch } = useGetSkillsDataQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    refetch();
    skillsRefetch();
  }, []);

  return (
    <section id="experiance" className="bg-gray-200 dark:bg-[#020A13]">
      <div className="max-w-[1000px] mx-auto py-5 lg:py-14">
        <h2 class="mb-20 head_text blue_gradient title">Experience</h2>
        <div className="content flex flex-row justify-evenly mt-[14px] ">
          <div className="skills w-[45%] flex flex-wrap gap-[37px]">
            {data &&
              data?.map((skill, index) => {
                return (
                  <div
                    key={index}
                    className="skill flex flex-col items-center gap-3"
                  >
                    <div className="skillImg rounded-full flex items-center justify-center w-[120px] h-[120px]">
                      <img
                        className="w-[75px]"
                        src={skill.img.url}
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
            {history &&
              history?.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="historyItem flex flex-row items-center gap-[10px] bg-[#19376d]"
                  >
                    <img
                      className="w-[50px]"
                      src={item.imageSrc.url}
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
