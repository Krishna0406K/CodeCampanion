import img1 from '../assets/leetcode.png';
import img2 from '../assets/codeStiudio.png';
import img3 from '../assets/codeforces.png';
import img4 from '../assets/gfg.png';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer'

const Home = () => {
  const platforms = [img1, img2, img3, img4];
  const navigate = useNavigate()
  const goToWorkspace = () =>{
    navigate('/Problems')
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#121417] text-foreground flex flex-col">
      
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl text-[#E5E8EB] md:text-5xl font-bold mb-4">
            Welcome Back, Coder
          </h1>
          <p className="text-[#9CABBA] text-lg mb-6">
            Continue your coding journey and level up your skills.
          </p>
          <p className="text-[#E5E8EB] text-base mb-16 italic">
            "The only way to do great work is to love what you do." - Steve Jobs
          </p>

         
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
            {platforms.map((platform, index) => (
              <img key={index} src={platform} alt={`img-${index}`}/>
            ))}
          </div>

         
          <button
          onClick={goToWorkspace}
            className="bg-[#E5E8EB] text-foreground hover:bg-muted/80 px-8 py-3 rounded-full font-medium"
          >
            Launch Workspace
          </button>
        </div>
      </div>
      <Footer/>
    </div>
    </>
  );
};

export default Home;