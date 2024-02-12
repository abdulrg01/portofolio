import { useGetHistoryDataQuery } from "@/redux/history/historyApiSlice";
import { useEffect } from "react";
import { useGetSkillsDataQuery } from "@/redux/skills/skillsApiSlice";
import Link from "next/link";

export default function Expe() {
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
    <section>
      <div className="containerS ml-20 mr-20 mb-10 p-3">
        <h2 class="mb-20 head_text blue_gradient title">Experience</h2>
        <div className="content flex flex-row justify-evenly mt-[14px] ">
          <div className="grid grid-cols-3 gap-5">
            {data &&
              data?.map((skill, index) => {
                return (
                  <Link
                    href={`/expeAccess/${skill._id}`}
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
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
