"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

const Portal = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {


    setMounted(true);
  
  }, []);
  if(typeof window!=="undefined"){
  const target = window.document.body.getElementsByTagName("header");
  return mounted ? createPortal(<>{children}</>, target[0]) : null;
}
  return <></>
};

export default Portal;
