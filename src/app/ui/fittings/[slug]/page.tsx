import FitAndImage from "@/app/components/fittings/FitAndImage";
import { cookies } from "next/headers";

const getFit = async (id: string) => {
  const cookieStore = cookies();
  const jwt = cookieStore.get("JWT");
  try {
    const resp = await fetch(`${process.env.URL}/fit/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt?.value ? jwt.value : ""}`,
      },
    });
    if (resp.ok) {
      const fit = await resp.json();

      return fit;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }: { params: { slug: string } }) => {
  const id = params.slug;
  const fit: {
    id: number;
    name: string;
    doctricne: string;
    description: string;
    eft: string;
    ship: { id: string; name: string; canUser: boolean };
    items: { id: number; name: string; canUser: boolean }[];
  } | null = await getFit(id);
  if (fit === null) {
    return (
      <div className="p-4 w-full">
        <h1 className="p-4 text-start font-bold text-3xl">Fit not Found</h1>
      </div>
    );
  } else
    return (
      <div className="p-4 w-full">
        <h1 className="p-4 text-start font-bold text-3xl">{fit.name}</h1>
        <h2 className="p-4 text-start font-bold text-2xl">{fit.ship.name}</h2>
        <div className=" bg-black/40 flex gap-2 justify-start flex-col lg:flex-row">
          <FitAndImage fit={fit} />
          <div className="flex gap-2 p-2 md:flex-row flex-col">
            <div className="h-full w-full flex flex-col  md:border-t-0 border-t-2 md:border-l-2  border-l-0 border-primary p-2 whitespace-nowrap">
              <span className="p-1 font-semibold">Unmet requirements :</span>
              <div className="flex flex-col p-1 ">
                {fit.items
                  .filter((i) => i.canUser === false)
                  .map((i) => (
                    <span key={i.id} className="">
                      {i.name}
                    </span>
                  ))}
                <h4 className="p-4 text-center w-full font-semibold">
                  All skilled up, you&apos;re good to go
                </h4>
              </div>
            </div>
            <div className="h-full flex flex-col md:border-t-0 border-t-2 md:border-l-2  border-l-0 border-primary w-full min-w-[12rem] p-2">
              <span className="p-1 font-semibold">Description :</span>
              <span className="p-1 ">{fit.description}</span>
            </div>
          </div>
        </div>
      </div>
    );
};

export default page;
