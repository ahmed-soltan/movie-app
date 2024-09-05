import footerBGImage from "../../assets/footer-bg.jpeg";
import Logo from "../header/components/logo";

const Footer = () => {
  return (
    <footer
      className="text-white py-8 bg-cover bg-center h-[300px]"
      style={{
        backgroundImage: `url(${footerBGImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className=" w-full max-w-[2000px] mx-auto md:ml-auto px-5 flex flex-col items-center md:items-start gap-4">
        <Logo />
        <ul className="flex items-center md:items-start gap-3 flex-wrap text-gray-400">
          <li>
            <a href="#" className="hover:underline">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </li>
        </ul>
        <div className="text-center md:text-left text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} MovieApp. All Rights Reserved.
          </p>
          This site does not store any files on its server. All contents are
          provided by non-affiliated third parties.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
