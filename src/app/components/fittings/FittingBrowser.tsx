"use client";

import { useState, useEffect, useRef } from "react";

import FitCard from "./FitCard";
import { Listbox, Transition } from "@headlessui/react";
import { sortFits } from "@/helpers/sort";
import ListboxSelect from "../ListboxSelect";
import Button from "../Button";
import { BiSearchAlt, BiSolidCog } from "react-icons/bi";
import Portal from "../Portal";
import Notification from "../Notification";

interface Props {
  roles: string[];
  doctrines: { id: number; name: string; description: string }[];
  fittings: {
    activePlayerCount: number;
    inactivePlayerCount: number;
    totalPlayer: number;
    fitId: number;
    typeId: number;
    doctrine: string;
    shipName: string;
    fitName: string;
    activeCharacterList: {
      charId: number;
      username: string;
      corpId: boolean;
    }[];
    inactiveCharacterList: {
      charId: number;
      username: string;
      corpId: boolean;
    }[];
  }[];
}
const FittingBrowser = ({ fittings, roles, doctrines }: Props) => {
  const canModify = roles.filter((r) => r.includes("ROLE_ADD_FIT"))
    ? true
    : false;
  const [showForm, setShowForm] = useState(false);
  const [filterString, setFilterString] = useState("");
  const [fit, setFit] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedDoctrine, setSelectedDoctrine] = useState<number | null>();
  const [fitArray, setFitArray] = useState(fittings);
  const [filteredFitArray, setFilteredFitArray] = useState<
    {
      fitId: number;
      typeId: number;
      doctrine: string;
      activePlayerCount: number;
      inactivePlayerCount: number;
      totalPlayer: number;
      shipName: string;
      fitName: string;
      inactiveCharacterList: {
        charId: number;
        username: string;
        corpId: boolean;
      }[];
      activeCharacterList: {
        charId: number;
        username: string;
        corpId: boolean;
      }[];
    }[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [sorter, setSorter] = useState("fit");
  const sorterArray = ["fit", "ship", "active", "total"];
  const inputEl = useRef<HTMLInputElement>(null);
  const [isWorking, setIsWorking] = useState(false);
  const [notify, setNotify] = useState({
    error: false,
    show: false,
    message: "",
    animate: true,
    Icon: null,
  });

  const addFit = async (fit: {
    description: string;
    fit: string;
    doctrine: number | null | undefined;
  }) => {
    if (typeof fit.doctrine === "undefined" || fit.doctrine === null) return;
    setNotify({
      animate: false,
      error: false,
      Icon: BiSolidCog,
      show: true,
      message: "",
    });
    setIsWorking(true);
    try {
      const resp = await fetch(`/api/services/fittings`, {
        method: "POST",
        body: JSON.stringify({
          description: fit.description,
          fit: fit.fit,
          doctrine: fit.doctrine,
        }),
      });
      const message = await resp.json();
      if (message.error) {
        setIsWorking(false);
        setNotify({
          show: true,
          error: true,
          message: message.error,
          Icon: null,
          animate: true,
        });
      } else {
        setIsWorking(false);
        setFitArray((prev) => [...prev, message.newFit]);
        setNotify({
          show: true,
          error: false,
          message: message.message,
          Icon: null,
          animate: true,
        });
      }
    } catch (error) {
      setIsWorking(false);
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

  const SortFittings = (e: React.MouseEvent) => {
    let target = e.currentTarget.innerHTML.toLowerCase();

    if (!target) {
      return null;
    }
    if (sorter !== target) {
      setSorter(target);
      setFitArray((prev) => [...sortFits(prev, target)]);
      setFilteredFitArray((prev) => [...sortFits(prev, target)]);
      console.log(target);
    } else {
      setFitArray((prev) => [...prev.reverse()]);
      setFilteredFitArray((prev) => [...prev.toReversed()]);
    }
  };
  useEffect(() => {
    setFilteredFitArray(
      fitArray.filter((fit) => fit.doctrine === selectedFilter)
    );
  }, [selectedFilter]);
  useEffect(() => {});
  return (
    <>
      <div className="flex flex-col p-8 items-center">
        <h1 className="font-bold text-xl my-4 self-start">
          {fittings.length}&nbsp;Total Fits
        </h1>
        <div className="flex relative self-start">
          {showForm ? (
            <></>
          ) : (
            <div className="flex lg:flex-row flex-col ">
              <div className="flex ">
                {" "}
                <Listbox value={selectedFilter} onChange={setSelectedFilter}>
                  <Listbox.Button
                    className={`whitespace-nowrap font-bold p-1 px-2 bg-black/60 w-[8rem] hover:bg-text hover:text-black transition-all duration-300 hover:shadow-link hover:shadow-text uppercase`}
                  >
                    {selectedFilter}
                  </Listbox.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Listbox.Options
                      className={`absolute whitespace-nowrap grid z-50 origin-bottom-right -translate-x-[200%] bg-black/60`}
                    >
                      <Listbox.Option
                        className={`cursor-pointer w-full font-bold p-1 px-2 hover:bg-text hover:text-black transition-all duration-300 hover:shadow-link hover:shadow-text uppercase`}
                        value={"ALL"}
                      >
                        ALL
                      </Listbox.Option>
                      {doctrines
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((doctrine, index) => (
                          <Listbox.Option
                            className={`cursor-pointer w-full font-bold p-1 px-2 hover:bg-text hover:text-black transition-all duration-300 hover:shadow-link hover:shadow-text uppercase`}
                            key={index}
                            value={doctrine.name}
                          >
                            {doctrine.name}
                          </Listbox.Option>
                        ))}
                    </Listbox.Options>
                  </Transition>
                </Listbox>
                <Listbox value={sorter} onChange={setSorter}>
                  <Listbox.Button
                    className={`font-bold p-1 px-2 bg-black/60 w-[8rem] hover:bg-text hover:text-black transition-all duration-300 hover:shadow-link hover:shadow-text uppercase`}
                  >
                    Sort by
                  </Listbox.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Listbox.Options
                      className={`absolute whitespace-nowrap flex z-50 translate-x-[-8rem] translate-y-[100%]`}
                    >
                      {sorterArray
                        .sort((a, b) => a.localeCompare(b))
                        .map((sorter, index) => (
                          <Listbox.Option
                            className={`cursor-pointer font-bold p-1 px-2 hover:bg-text w-fit hover:text-black transition-all duration-300 hover:shadow-link hover:shadow-text uppercase`}
                            key={index}
                            value={sorter}
                            onClick={(e) => {
                              SortFittings(e);
                            }}
                          >
                            {sorter}
                          </Listbox.Option>
                        ))}
                    </Listbox.Options>
                  </Transition>
                </Listbox>
              </div>
              <div
                onClick={(e) => {
                  inputEl.current?.focus();
                }}
                className="hover:bg-text group -order-1 lg:order-none search hover:text-black transition-all duration-300 hover:shadow-link hover:shadow-text px-4 flex items-center bg-black/60"
              >
                <BiSearchAlt />
                <input
                  ref={inputEl}
                  className="bg-transparent p-1 outline-none"
                  placeholder="Search..."
                  value={filterString}
                  onPaste={(e) => setFilterString(e.currentTarget.value)}
                  onInput={(e) => setFilterString(e.currentTarget.value)}
                />
              </div>
              {canModify ? (
                <button
                  onClick={(e) => setShowForm(!showForm)}
                  className={`text-center font-bold p-1 px-2 lg:order-none -order-1 bg-black/60 lg:w-[8rem] w-[16rem]  hover:bg-text hover:text-black transition-all duration-300 hover:shadow-link hover:shadow-text uppercase`}
                >
                  {showForm ? "Fit Browser" : "Add fit"}
                </button>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
        {canModify && showForm ? (
          <div className="w-full flex justify-end">
            <button
              onClick={(e) => setShowForm(!showForm)}
              className={`text-center font-bold p-1 px-2 bg-black/60 w-[8rem] hover:bg-text hover:text-black transition-all duration-300 hover:shadow-link hover:shadow-text uppercase`}
            >
              {showForm ? "Fit Browser" : "Add fit"}
            </button>
          </div>
        ) : (
          <></>
        )}
        {!showForm ? (
          <div className=" bg-black/60 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 md:gap-2 p-2 pt-20 lg:pt-10  min-w-[24rem] w-full ">
            {filteredFitArray.length > 0
              ? filteredFitArray
                  .filter(
                    (fit) =>
                      fit.doctrine
                        .toLocaleLowerCase()
                        .includes(filterString.toLocaleLowerCase()) ||
                      fit.shipName
                        .toLocaleLowerCase()
                        .includes(filterString.toLocaleLowerCase()) ||
                      fit.fitName
                        .toLocaleLowerCase()
                        .includes(filterString.toLocaleLowerCase())
                  )
                  .map((f, index) => (
                    <FitCard
                      setWorkingFn={(working) => setIsWorking(working)}
                      isWorking={isWorking}
                      deleteFitFn={(id) =>
                        setFilteredFitArray((prev) => [
                          ...prev.filter((p) => p.fitId !== id),
                        ])
                      }
                      canModify={canModify}
                      key={index}
                      fitId={f.fitId}
                      activeCharacterList={f.activeCharacterList}
                      inactiveCharacterList={f.activeCharacterList}
                      activePlayerCount={f.activePlayerCount}
                      inactivePlayerCount={f.inactivePlayerCount}
                      fitName={f.fitName}
                      shipName={f.shipName}
                      shipType={f.typeId}
                      totalPlayer={f.totalPlayer}
                    />
                  ))
              : fitArray
                  .filter(
                    (fit) =>
                      fit.doctrine
                        .toLocaleLowerCase()
                        .includes(filterString.toLocaleLowerCase()) ||
                      fit.shipName
                        .toLocaleLowerCase()
                        .includes(filterString.toLocaleLowerCase()) ||
                      fit.fitName
                        .toLocaleLowerCase()
                        .includes(filterString.toLocaleLowerCase())
                  )
                  .map((f, index) => (
                    <FitCard
                      setWorkingFn={(working) => setIsWorking(working)}
                      isWorking={isWorking}
                      deleteFitFn={(id) =>
                        setFitArray((prev) => [
                          ...prev.filter((p) => p.fitId !== id),
                        ])
                      }
                      canModify={canModify}
                      key={index}
                      fitId={f.fitId}
                      activeCharacterList={f.activeCharacterList}
                      inactiveCharacterList={f.activeCharacterList}
                      activePlayerCount={f.activePlayerCount}
                      inactivePlayerCount={f.inactivePlayerCount}
                      fitName={f.fitName}
                      shipName={f.shipName}
                      shipType={f.typeId}
                      totalPlayer={f.totalPlayer}
                    />
                  ))}
          </div>
        ) : (
          <div
            className={`p-4 flex flex-col gap-2 bg-black/60 min-w-[30rem] bg-[url("/images/wrench-hammer.svg")] bg-[5rem_-7.5rem] bg-contain bg-no-repeat`}
          >
            <div className="h-32 flex items-start justify-between">
              <ListboxSelect
              positionAbsolute
                text="Doctrine :"
                array={doctrines.sort((a, b) => a.name.localeCompare(b.name))}
                getSelected={(value) => {
                  setSelectedDoctrine(value);
                }}
              />
              <div className="self-center">
                <Button
                  text={isWorking ? "Working..." : "Upload Fitting"}
                  interactive={isWorking ? false : true}
                  fn={() => {
                    if (isWorking) {
                      return;
                    } else {
                      addFit({
                        description: desc,
                        doctrine: selectedDoctrine,
                        fit: fit,
                      });
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex gap-2 lg:flex-row flex-col lg:items-center justify-between">
              <div className="flex flex-col">
                <label className="font-semibold py-2">Fit :</label>
                <textarea
                  onPaste={(e) => setFit(e.currentTarget.value)}
                  onChange={(e) => setFit(e.currentTarget.value)}
                  className=" whitespace-pre-wrap w-full resize-none text-baseColor p-1 lg:h-[20rem] h-[15rem] ring-2 ring-primary shadow-[inset_0.2rem_0.2rem_1rem]"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold py-2">Description :</label>
                <textarea
                  onPaste={(e) => setDesc(e.currentTarget.value)}
                  onChange={(e) => setDesc(e.currentTarget.value)}
                  className=" whitespace-pre-wrap w-full resize-none text-baseColor p-1 lg:h-[20rem] h-[15rem] ring-2 ring-primary shadow-[inset_0.2rem_0.2rem_1rem]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Portal>
        
          <Notification
            {...notify}
            onAnim={(e) => {
              setNotify({
                show: false,
                error: false,
                message: "",
                animate: true,
                Icon: null,
              });
            }}
          />

      </Portal>
    </>
  );
};

export default FittingBrowser;
