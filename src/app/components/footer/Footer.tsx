import { getJWT } from "@/helpers/getJWT";
import Anchor from "./Anchor";

const Footer = () => {
  const session = getJWT();
  return (
    <footer className=" bg-black p-4 w-full flex justify-center">
      <div className="flex justify-start items-center w-[80%] h-full gap-x-10 ">
        <div className="flex flex-col self-start gap-y-2">
          <Anchor
            dest="https://www.facebook.com/uselessidea.co"
            text="Facebook" 
          />
          <Anchor
            dest="https://www.youtube.com/@uselessidea3485"
            text="youtube" 
          />
        </div>
        <div className="flex flex-col self-start gap-y-2">
          {session?.user.corpId == process.env.UI_CORP_ID ? (
            <Anchor dest="https://pf.krainagoblinow.pl" text="Pathfinder"  />
          ) : (
            <></>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
