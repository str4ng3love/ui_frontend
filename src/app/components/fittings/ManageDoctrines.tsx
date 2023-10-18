"use client";
import { useState, useEffect } from "react";
import Button from "../Button";
import Spinerini from "../Spinerini";

import ListboxSelect from "../ListboxSelect";
import Portal from "../Portal";
import Notification from "../Notification";
import { BiSolidCog } from "react-icons/bi";
const ManageDoctrines = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selected, setSelected] = useState<number>();
  const [notify, setNotify] = useState({
    error: false,
    show: false,
    message: "",
    animate: true,
    Icon: null,
  });
  const [doctrines, setDoctrines] = useState<
    { name: string; id: number; description: string }[]
  >([]);

  const getDoctrines = async () => {
    try {
      const resp = await fetch(`/api/services/doctrines`, {
        method: "GET",
      });
      const message = await resp.json();
      if (message.error) {
      } else {
        setDoctrines(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addDoctrine = async () => {
    setIsWorking(true);
    setNotify({
      animate: false,
      error: false,
      Icon: BiSolidCog,
      show: true,
      message: "",
    });
    try {
      const resp = await fetch(`/api/services/doctrines`, {
        method: "POST",
        body: JSON.stringify({ name: name, description: description }),
      });
      const message = await resp.json();

      if (message.error) {
        setNotify({
          error: true,
          show: true,
          message: message.error,
          Icon: null,
          animate: true,
        });
        setIsWorking(false);
      } else {
        setNotify({
          error: false,
          show: true,
          message: message.message,
          Icon: null,
          animate: true,
        });
        setDoctrines((prev) => [...prev, message.doctrine]);

        setIsWorking(false);
      }
    } catch (error) {
      setIsWorking(false);
      console.log(error);
    }
  };
  const deleteDoctrine = async () => {
    setIsWorking(true);
    setNotify({
      animate: false,
      error: false,
      Icon: BiSolidCog,
      show: true,
      message: "",
    });
    try {
      const resp = await fetch(`/api/services/doctrines`, {
        method: "DELETE",
        body: JSON.stringify(selected),
      });
      const message = await resp.json();

      if (message.error) {
        setNotify({
          error: true,
          show: true,
          message: message.error,
          Icon: null,
          animate: true,
        });
        setIsWorking(false);
      } else {
        setNotify({
          error: false,
          show: true,
          message: message.message,
          Icon: null,
          animate: true,
        });
        setDoctrines((prev) => {
          return prev.filter((d) => d.id != selected);
        });
        setIsWorking(false);
      }
    } catch (error) {
      console.log(error);
      setIsWorking(false);
    }
  };
  useEffect(() => {
    (async () => {
      await getDoctrines();
    })();
  }, []);

  return (
    <>
      <div className="flex p-8  gap-2 w-full">
        <div className="flex md:flex-row flex-col h-fit gap-4">
          <div className="flex flex-col md:px-8 py-8 bg-black/60 p-4">
            <h2 className="text-xl font-semibold mb-4 ">Add a doctrine</h2>
            <div className="p-1 flex">
              <label className="w-[10ch]">Name :</label>
              <input
                className="p-1  outline-none text-baseColor"
                type="text"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
            <div className="p-1 flex ">
              <label className="w-[10ch]">Description :</label>
              <input
                className="p-1 outline-none text-baseColor"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </div>
            <div className="w-full flex justify-center mt-8">
              <Button
                text="submit"
                interactive={isWorking ? false : true}
                fn={() => {
                  if (isWorking) {
                    return;
                  } else {
                    addDoctrine();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex flex-col  md:px-8 py-8 bg-black/60 p-4">
            <h2 className="text-xl font-semibold mb-4 ">Delete a doctrine</h2>
            <div className="flex">
              {doctrines && doctrines.length > 0 ? (
                <div className="flex gap-2 items-start justify-between w-full h-16">
                  <ListboxSelect
                    array={doctrines}
                    text=""
                    getSelected={(val) => {
                      setSelected(val);
                    }}
                  />
                  <Button
                    text="Delete"
                    interactive={isWorking ? false : true}
                    fn={() => {
                      if (isWorking) {
                        return;
                      } else {
                        deleteDoctrine();
                      }
                    }}
                    bg="bg-red-500 text-text"
                  />
                </div>
              ) : (
                <div className="w-full flex justify-center mt-4">
                  <Spinerini borderSize="border-[0.4rem]" h="h-8" w="w-8" />
                </div>
              )}
            </div>
          </div>
        </div>
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

export default ManageDoctrines;
