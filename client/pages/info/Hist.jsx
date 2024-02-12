import { useGetHistoryDataQuery } from "@/redux/history/historyApiSlice";
import Link from "next/link";
import { useEffect } from "react";

export default function Hist() {
  const { data, refetch } = useGetHistoryDataQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <section>
      <div className="containerS ml-20 mr-20 mb-10">
        <h2 class="mb-20 head_text blue_gradient title">History</h2>
        <div className="content flex flex-row justify-evenly mt-[14px] ">
          <div className="history">
            {data &&
              data?.map((item, index) => {
                return (
                  <Link
                    href={`/historyAccess/${item._id}`}
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
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
