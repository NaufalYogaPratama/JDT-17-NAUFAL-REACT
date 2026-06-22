
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-[#000000] border-t border-white/10 py-6 px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DDDDDD] relative z-20 select-none">
      <div className="flex items-center gap-2">
        <span 
          onClick={() => navigate("/movie-page")} 
          className="text-base font-black tracking-wider text-[#CB2957] cursor-pointer hover:opacity-90 transition-opacity"
        >
          NeoPal
        </span>
        <span className="text-neutral-700">|</span>
        <p className="text-neutral-500 font-light">© 2026 Naufal. All rights reserved.</p>
      </div>
      
      <div className="flex items-center gap-6 text-neutral-400 font-semibold">
      </div>
    </footer>
  );
};

export default Footer;