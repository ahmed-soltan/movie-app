import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="">
      <h1 className="text-xl md:text-3xl font-bold text-white">
        MOVIE<span className="text-[#5a2e98]">HOME</span>
      </h1>
    </Link>
  );
};

export default Logo;
