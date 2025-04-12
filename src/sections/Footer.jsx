import { FaDiscord, FaTwitter, FaYoutube, FaGithub, FaTwitch } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://github.com", icon: <FaGithub /> },
  { href: "https://twitch.com", icon: <FaTwitch /> },
];

const Footer = () => {
  return (
    <footer className="w-full bg-violet-300 py-4 text-black">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
            <p className="text-center text-sm md:text-left">
                 <a href="https://zentry.com" target="_blank">&copy; Zentry.com</a>
            </p>

            <div className="flex justify-center gap-4">
            {socialLinks.map((link, index) => (
                <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black transition-colors duration-500 ease-in-out hover:text-white"
                >
                {link.icon}
                </a>
            ))}
            </div>

            <a
                href="#privacy-policy"
                className="text-sm hover:underline text-center md:text-right"
            >
                Privacy Policy
            </a>
    </div>
</footer>

  );
};

export default Footer;
