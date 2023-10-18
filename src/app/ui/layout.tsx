import { getJWT } from "@/helpers/getJWT";
import Login from "../components/header/Login";
import Sidebar from "../components/sidebar/Sidebar";
import GoBack from "../components/GoBack";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Useless Idea | UI ZONE",
  description: "Useless Idea - Eve online corporation",
};
const layout = ({ children }: { children: React.ReactNode }) => {


  const session = getJWT();
  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col gap-4">
        <h1 className="text-3xl font-bold">You need to be authenticated</h1>
        <div className="p-1 hover:bg-text transition-all duration-300 mt-8">
          <Login url={process.env.HOST as string} large />
        </div>
      </div>
    );
  }
  if(session?.user.corpId != process.env.UI_CORP_ID as string){
    return (
      <div className="flex justify-center items-center min-h-screen flex-col gap-4">
        <h1 className="text-3xl font-bold">Useless Idea members only</h1>
          <GoBack />
      </div>
    );
  }
  return (
    <>
      <main className="flex min-h-[calc(100dvh-6rem)] pt-16">
        <Sidebar />
        {children}
      </main>
    </>
  );
};

export default layout;
