import React from "react";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import { socialMedia } from "@/data";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      
      <div className="flex flex-col items-center ">
        <h1 className="heading">
          Ready to take{" "}
          <span className="text-purple">
            your code to the{" "}
            <span className="text-purple font-bold underline">N</span>ext.js
            level?
          </span>
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Let&apos;s Connect and craft code to reach your goals.
        </p>
        <a href="mailto:someemail@someemail.com">
          <MagicButton
            title="Let's Connect"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
    
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright &copy; 2025 Aaron Perez
        </p>
        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((profile) => (
            <div
              key={profile.id}
              className="w-10 h-10 mt-6 cursor-pointer flex justify-center items-center backdrop:filter backdrop:-blur-lg saturate-150 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img
                src={profile.img}
                alt={profile.id.toString()}
                width={20}
                height={20}
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
