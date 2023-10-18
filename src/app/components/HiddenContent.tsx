"use client";

import { useState } from "react";
import Button from "./Button";
import CopyToClipboard from "./CopyToClipboard";
interface Props {
  content: string;
}
const HiddenContent = ({ content }: Props) => {
  const [show, setShow] = useState(false);
  return (
    <div className="h-fit flex flex-col w-full items-center">
      <div className="flex gap-2 justify-between w-full">
        {show ? (
          <Button fn={() => setShow(false)} text="hide" />
        ) : (
          <Button fn={() => setShow(true)} text="show" />
        )}
        <CopyToClipboard value={content} />
      </div>
      {show ? (
        <span className=" whitespace-pre-wrap text-sm w-[15rem] py-4">
          {content}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HiddenContent;
