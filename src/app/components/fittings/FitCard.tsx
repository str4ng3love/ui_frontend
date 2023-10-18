"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiRobotHelmet } from "react-icons/gi";
import { BiSolidCog } from "react-icons/bi";
import Portal from "../Portal";
import Notification from "../Notification";
interface Props {
  deleteFitFn: (id: number) => void;
  isWorking: boolean;
  setWorkingFn: (working: boolean) => void;
  canModify: boolean;
  fitId: number;
  shipType: number;
  shipName: string;
  fitName: string;
  activePlayerCount: number;
  inactivePlayerCount: number;
  totalPlayer: number;
  activeCharacterList: { charId: number; username: string; corpId: boolean }[];
  inactiveCharacterList: {
    charId: number;
    username: string;
    corpId: boolean;
  }[];
}
const FitCard = ({
  setWorkingFn,
  shipName,
  shipType,
  fitName,
  activeCharacterList,
  inactiveCharacterList,
  totalPlayer,
  activePlayerCount,
  inactivePlayerCount,
  fitId,
  canModify,
  isWorking,
  deleteFitFn,
}: Props) => {
  const [showContext, setShowContext] = useState(false);
  const [notify, setNotify] = useState({
    error: false,
    show: false,
    message: "",
    Icon: null,
    animate: false,
  });

  const deleteFit = async (id: number) => {
    try {
      if (!canModify) return;
      setNotify({
        error: false,
        Icon: BiSolidCog,
        animate: false,
        show: true,
        message: "",
      });
      setWorkingFn(true);
      const resp = await fetch("/api/services/fittings", {
        method: "DELETE",
        body: JSON.stringify(id),
      });
      const message = await resp.json();

      if (message.error) {
        setWorkingFn(false);
        setNotify({
          show: true,
          error: true,
          message: message.error,
          Icon: null,
          animate: true,
        });
      } else {
        setShowContext(false);
        setWorkingFn(false);
        deleteFitFn(fitId);
        setNotify({
          show: true,
          error: false,
          message: message.message,
          Icon: null,
          animate: true,
        });
      }
    } catch (error) {
      setWorkingFn(false);
      setNotify({
        show: true,
        error: true,
        message: "Something went wrong, try again later",
        animate: true,
        Icon: null,
      });
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="group flex flex-col"
        onContextMenu={(e) => {
          if (canModify && !isWorking ){
            e.preventDefault();
            setShowContext(!showContext);
          } else {
            return;
          }
        }}
      >
        <Link href={`/ui/fittings/${fitId}`} className="">
          <div
            className={`hover:bg-text hover:text-primary group flex w-[10rem] lg:w-[12rem] lg:h-[5rem] h-[6rem] relative transition-all duration-300 overflow-hidden hover:shadow-link hover:shadow-text`}
          >
            <div className="h-full w-full hover:bg-text p-1 flex items-center gap-1 font-semibold transition-all duration-700 ">
              <span className="w-[50%] h-full  text-ellipsis whitespace-pre-wrap overflow-clip">
                {fitName.trim()}
              </span>
              <span className=" w-[50%] text-ellipsis whitespace-pre-wrap overflow-clip h-full flex flex-col justify-between items-center">
                <span className="group-hover:opacity-0 opacity-100  transition-all duration-300">
                  {shipName.trim()}
                </span>
                <span className="absolute bottom-0 group-hover:opacity-100 opacity-0  transition-all duration-300 flex items-center justify-start gap-1">
                  <GiRobotHelmet title={"Pilots"} />{" "}
                  <span title="Active" className="text-emerald-800">
                    {activePlayerCount}
                  </span>
                  &nbsp;|&nbsp;
                  <span title="Total" className="">
                    {totalPlayer}
                  </span>
                </span>
              </span>
            </div>
            <Image
              title={shipName}
              className="drop-shadow-2xl group-hover:opacity-100 opacity-0 w-14 group-hover:translate-x-[-1rem] group-hover:translate-y-[0.15rem] absolute right-0 top-0 rounded-bl-md shadow-[1rem_0rem_1rem_black] transition-all duration-300 translate-x-[3rem] translate-y-[-3rem] "
              alt="ship's image"
              src={`https://images.evetech.net/types/${shipType}/render`}
              width={512}
              height={512}
            />
          </div>
        </Link>
        {canModify ? (
          <div
            onContextMenu={(e) => {}}
            className={`${
              showContext ? "flex" : "hidden"
            } gap-2 uppercase text-sm font-semibold items-center justify-evenly mt-2`}
          >
            <span
              onClick={() => {
                if (isWorking) {
                  return;
                } else {
                  deleteFit(fitId);
                }
              }}
              className={` ${
                isWorking
                  ? "bg-transparent"
                  : "bg-red-700 hover:bg-text hover:text-baseColor hover:shadow-link hover:shadow-text"
              } w-full h-full cursor-pointer text-center transition-all duration-300`}
            >
              {isWorking ? "Working..." : "delete"}
            </span>
            <span
              onClick={() => setShowContext(false)}
              className=" w-full h-full cursor-pointer text-center hover:bg-text hover:text-baseColor hover:shadow-link hover:shadow-text transition-all duration-300"
            >
              cancel
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Portal>
        
          <Notification
            {...notify}
            onAnim={(e) => {
              setNotify({
                error: false,
                message: "",
                show: false,
                animate: false,
                Icon: null,
              });
            }}
          />
        
      </Portal>
    </>
  );
};

export default FitCard;
