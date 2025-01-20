"use client";
import { cn } from "@/lib/utils";

export function MatrixCard() {
  return (
    <section id="approach" className="w-full py-20">
      <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        My <span className="text-purple">Approach</span>
      </h1>

      <div className="my-20 flex flex-col lg:flex-row gap-8">
        <div
          className={cn(
            "group w-full  cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800 bg-cover",
            "bg-[url(https://images.unsplash.com/photo-1669023414162-8b0573b9c6b2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover",
            // Preload hover image by setting it in a pseudo-element
            "before:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTB4ZHgxczZpdGYyMzNpbnM4ajF4d3JveTNicW92dWM5NjNzaHg4biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A06UFEx8jxEwU/giphy.gif)]opacity-50 before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
            "hover:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTB4ZHgxczZpdGYyMzNpbnM4ajF4d3JveTNicW92dWM5NjNzaHg4biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A06UFEx8jxEwU/giphy.gif)] bg-cover ",
            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
            "transition-all duration-500"
          )}
        >
          <div className="text relative z-50">
            <h1 className="font-bold text-xl md:text-3xl text-white relative">
              Planning and Strategie
            </h1>
            <p className="font-normal text-base text-white relative my-4">≠
              Well planned flow chart project, then map out figma design,
              website&apos;s goals, target audience and key functionaliteies. Look at
              site sturcture, navigation and content requirements
            </p>
          </div>
        </div>
        <div
          className={cn(
            "group w-full  cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
            "bg-[url(https://images.unsplash.com/photo-1564865878688-9a244444042a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover",
            // Preload hover image by setting it in a pseudo-element
            "before:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTB4ZHgxczZpdGYyMzNpbnM4ajF4d3JveTNicW92dWM5NjNzaHg4biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A06UFEx8jxEwU/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
            "hover:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTB4ZHgxczZpdGYyMzNpbnM4ajF4d3JveTNicW92dWM5NjNzaHg4biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A06UFEx8jxEwU/giphy.gif)] bg-cover ",
            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
            "transition-all duration-500"
          )}
        >
          <div className="text relative z-50">
            <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
             Development & Progress Update
            </h1>
            <p className="font-normal text-base text-gray-50 relative my-4">
              Once project is hahed out, I make a daily time box, cue some lofi playlist and dive into coding. Updating status every step of the way
            </p>
          </div>
        </div>
        <div
          className={cn(
            "group w-full  cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
            "bg-[url(https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover",
            // Preload hover image by setting it in a pseudo-element
            "before:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTB4ZHgxczZpdGYyMzNpbnM4ajF4d3JveTNicW92dWM5NjNzaHg4biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A06UFEx8jxEwU/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
            "hover:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTB4ZHgxczZpdGYyMzNpbnM4ajF4d3JveTNicW92dWM5NjNzaHg4biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A06UFEx8jxEwU/giphy.gif)] bg-cover ",
            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
            "transition-all duration-500"
          )}
        >
          <div className="text relative z-50">
            <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
             Development - Test - Launch
            </h1>
            <p className="font-normal text-base text-gray-50 relative my-4">
            Transform figma into fucntional code, build project to specs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
