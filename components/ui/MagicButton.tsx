
import React, { ReactNode } from "react";


const MagicButton = ({
  title,icon,position,otherClasses,handleClick
}: {
  title:string;
  icon:ReactNode;
  position:string;
  handleClick?: () => void;
  otherClasses?:string
}) => {
  return (
    // Button code
    <button  onClick={handleClick}className=" w-full inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 md:w-60 md: mt-10 ">
    <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg px-7 text-sm font-medium text-white gap-2 ${otherClasses}`}>{position === 'left' && icon}{title}{position === 'right' && icon}</span>
  </button>
  );
};
export default MagicButton;
