
import FittingBrowser from "@/app/components/fittings/FittingBrowser";
import { getJWT } from "@/helpers/getJWT";

import { cookies } from "next/headers";



const getFittings = async () => {
  const cookieStore = cookies();
const jwt = cookieStore.get("JWT");
  const resp = await fetch(`${process.env.URL}/fit`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt?.value}`,
    },
    cache: "default",
  });
  if (resp.ok) {
    const fittings = await resp.json();

    return fittings;
  }
};
const getDoctrines = async () => {
  const cookieStore = cookies();
const jwt = cookieStore.get("JWT");
  const resp = await fetch(`${process.env.URL}/doctrine`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt?.value}`,
    },
    cache: "default",
    next: { tags: ["fittings"] },
  });
  if (resp.ok) {
    const doctrines: { id: number; name: string; description: string }[] =
      await resp.json();

    return doctrines;
  }
};
const page = async () => {
  const fittings = await getFittings();
  const doctrines = await getDoctrines();
  const session = getJWT();

  return (
    <div className="flex w-full flex-col">
        <h1 className="text-3xl font-bold my-8 md:pl-10 md:text-start text-center p-0">Fittings</h1>
      <div className="flex justify-center w-full ">
        <FittingBrowser
          doctrines={doctrines ? doctrines : []}
          fittings={...await fittings}
          roles={session?.user.roles}
        />
      </div>
    </div>
  );
};

export default page;
