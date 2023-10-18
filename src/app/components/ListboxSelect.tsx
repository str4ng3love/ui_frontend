"use client";
import { Listbox, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

interface Props {
  array: {id:number, name:string, description:string}[]
  text: string;
  positionAbsolute?:boolean;
  getSelected:(value:number)=>void
}
const ListboxSelect = ({ array, text, getSelected, positionAbsolute }: Props) => {
  const [selected, setSelected] = useState(array[0].name);

useEffect(()=>{
  getSelected(array.filter(a=>a.name === selected).map(arr => arr.id)[0])
}, [selected])
  return (<div className={`relative flex gap-2 flex-col ${positionAbsolute ? "py-6":""}`}>
    <span>{text}</span>
    <Listbox value={selected} onChange={setSelected}>
      <Listbox.Button className={`w-[10ch] text-center hover:bg-text hover:text-baseColor hover:shadow-link hover:shadow-text transition-all duration-300 font-semibold text-sm p-1`}>{selected}</Listbox.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Listbox.Options className={`${positionAbsolute? "absolute top-0 -translate-y-[5rem] -translate-x-[115%]" : "absolute"} whitespace-nowrap grid z-50  bg-black/60`}>
          {array.filter(a=>a.name !==selected).map((a, i) => (
            <Listbox.Option className={`cursor-pointer w-full hover:bg-text hover:text-baseColor hover:shadow-link hover:shadow-text px-4 transition-all duration-300 font-semibold text-sm p-1`} value={a.name} key={i}>
              {a.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
    </div>
  );
};

export default ListboxSelect;
