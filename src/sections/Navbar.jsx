import { useRef, useState, useEffect } from "react";
import Button from "../components/Button";
import { TiLocationArrow } from "react-icons/ti";
import { GiHamburger } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useWindowScroll } from "react-use";
import { gsap } from "gsap";
import { FaPlay, FaPause } from "react-icons/fa";

const navItems = ["Home", "About", "Features", "Story", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [isIndicatorActive, setIsIndicatorActive] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // NEW

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between px-4 py-2">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Audio Button */}
            <button
              className="flex items-center justify-center relative w-8 h-8 text-violet-200 transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white/10 rounded-full"
              onClick={toggleAudioIndicator}
            >
                <audio
                    src="/audio/loop.mp3"
                    loop
                    ref={audioElementRef}
                    className="hidden"
                />

                {/* Always show Play Icon */}
                <FaPlay className="w-5 h-5 z-10 text-violet-200" />

                {/* Animated Bars Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-[2px] pointer-events-none">
                    {[1, 2, 3, 4].map((bar) => (
                    <div
                        key={bar}
                        className={`bg-violet-200 ${
                        isIndicatorActive ? "animate-bounce-bar" : ""
                        }`}
                        style={{
                        animationDelay: `${bar * 0.1}s`,
                        width: '2px',
                        height: '10px',
                        }}
                    />
                    ))}
                </div>
            </button>



            {/* Hamburger (mobile) */}
            <button
              className="md:hidden flex items-center ml-2 transition-all duration-200 ease-in-out hover:scale-110 hover:bg-white/10 rounded-full"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <IoClose className="w-6 h-6 text-violet-200" />
              ) : (
                <GiHamburger className="w-6 h-6 text-violet-200" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black bg-opacity-80 backdrop-blur-sm flex flex-col items-center py-4 space-y-4 md:hidden z-40">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white text-lg hover:text-blue-300"
                onClick={() => setMobileMenuOpen(false)} // auto-close
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
