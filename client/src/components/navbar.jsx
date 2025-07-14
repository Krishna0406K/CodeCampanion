import wavingHand from "../assets/Happy-Wave-GIF-by-VIEWAR-unscreen.gif";

const Navbar = () => {
  
  return (
    <nav className="bg-[#121417]  px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-white text-4xl font-black">
          Code Campanion
        </div>
        <div className="w-30 h-30 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          <img
            src={wavingHand}
            alt="Waving hand"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;