import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "../components/AnimatedTitle";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger)

const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline( {
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: '+=800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            }
        })

        clipAnimation.to('.mask-clip-path', {
            width: '100vw',
            height: '100vh',
            borderRadius: 0,
        })
    })

    //used to keep the about image well sized
    useEffect(() => {
        const timer = setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 300); // wait a bit after DOM paints
        return () => clearTimeout(timer);
      }, []);
      

  return (
    <div id="about" className="min-h-screen w-screen">
        <div className="relative mb-8 mt-36 flex flex-col gap-5 items-center">
            <h2 className="font-general text-sm uppercase md:text-[10px]">
                Welcome to Zentry
            </h2>

            <AnimatedTitle title="Disc<b>o</b>ver the World's <br /> L<b>a</b>rgest Shared Adventure"
                containerClass="mt-5 !text-black text-center" />

            <div className="about-subtext">
                <p>
                    The Game of Games begins-your life, now an epic MMORPG
                </p>
                <p>
                    Zentry unites every player from countless games and platforms
                </p>
            </div>
        </div>
        
        <div className="h-dvh w-screen" id="clip">
            <div className="mask-clip-path about-image">
                <img src="img/about.webp" alt="Background" className="absolute left-0 top-0 size-full object-cover" />
            </div>
        </div>
    </div>
    );
};

export default About;
