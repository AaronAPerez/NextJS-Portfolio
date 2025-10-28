"use client";
import React from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";


const HoverBorderGradientBtn = () => {
  return (
    <div className="m-40 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="bg-black text-white flex items-center space-x-2"
      >

        {/* <span>Aceternity UI</span> */}
      </HoverBorderGradient>
    </div>
  );
}

export default HoverBorderGradientBtn;
