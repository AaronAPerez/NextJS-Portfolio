import MagicButton from "./MagicButton"
import { Spotlight } from "./Spotlight"
import { TextGenerateEffect } from "./TextGenerateEffect"
import { GoProjectRoadmap } from "react-icons/go";


const Hero = () => {
    return (
        <>
            <div className="relative min-h-screen flex items-center justify-center p-8">
                {/* Background Effects */}
                <div>
                <Spotlight
                    className="top-40 -left-10 md:-left-32 md:-top-20 h-screen"
                     fill="white"
                    />
                </div>
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />
                <div className="absolute inset-0 bg-grid-small-white/[0.2] bg-grid" />
                <div className="absolute inset-0 backdrop-blur-sm" />

                <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8
                max-w-7xl xl:max-w-8xl 2xl:max-w-9xl 3xl:max-w-screen-2xl">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="relative">

                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
                                <img src="/images/profile/headshot.png" alt="Aaron A. Perez"
                                    className="object-cover rounded-full" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-violet-500/10" />

                            </div>
                        </div>

                        <div className="space-y-8 lg:flex-1">
                            {/* Name and Title */}
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-6xl font-bold">
                                    Aaron A. Perez
                                </h1>
                                <TextGenerateEffect
                                    className="text-[40px] md:text-3xl lg:text-4xl"
                                    words="Full Stack Developer"
                                />
                                {/* Description */}
                                <p className="text-lg max-w-2xl mx-auto lg:mx-0">
                                    Building modern web experiences with cutting-edge technology and a focus on
                                    creating intuitive user experiences and robust systems.
                                </p>




                                <a href="#about">
                                    <MagicButton position="right"
                                        title="My Projects"
                                        icon={<GoProjectRoadmap />} />
                                </a>

                            </div>

                        </div>
                    </div>

                </div>
                {/* <div className="h-screen w-full dark:bg-black-100 bg-white  dark:bg-grid-white/[0.06] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
          {/* Radial gradient for the container to give a faded look 
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
        <div className="flex justify-center relative my-20 z-10 ">
            <div className="mx-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center">
                <h2 className="uppercase tracking-widest text-xs text-center text-blue-400 max-w-80" >Dynamic web Magic Next.js</h2>
            <TextGenerateEffect
                className="text-center text-[40px] md:text-5xl lg:text-6xl"
                words="Hey there! I'm your friendly neighborhood code instructor."
            />
            <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">Hi, I&apos;am Jose a Next.js Developer based in Stockton, CA</p>
            <a href="#about"><MagicButton position="right" title="My Projects" icon={<GoProjectRoadmap/>}/></a>

            </div>
        </div> */}

            </div>
        </>
    )
}

export default Hero