
import Box from "../../components/box";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Badge } from "../../components/ui/badge";

const Home = () => {
  
  const Experience = () => [
    {
      title: "PT Indivara Group",
      desc: "Frontend Developer yang mengerjakan 3 Aplikasi Wealth Management System dengan optimasi performa modern.",
    },
    {
      title: "PT Suka Group",
      desc: "Backend Developer yang mengerjakan 3 Aplikasi Distribution Management System dengan skalabilitas tinggi.",
    },
  ];



  return (
    <div className="movie-page-container min-h-screen bg-[#000000] text-[#EEEEEE] flex flex-col w-full overflow-x-hidden font-sans relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#CB2957]/10 via-[#000000] to-[#000000] bg-grid-pattern">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-12 pt-32 pb-16 flex flex-col items-center gap-12 relative z-10 text-left">
        
        {/* Cinematic Hero Branding */}
        <section className="text-center max-w-3xl flex flex-col items-center gap-4 py-8">
          <Badge variant="outline" className="inline-flex items-center px-5 py-5 rounded-full text-xl font-semibold border border-[#CB2957]/45 text-[#CB2957] w-fit tracking-wider uppercase pb-6">
            JDT 17
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#EEEEEE] leading-none drop-shadow-lg uppercase">
            Naufal Yoga Pratama
          </h1>
        </section>

        {/* Experience Section */}
        <section className="w-full flex flex-col gap-6 ml-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {Experience().map((el, index) => {
              return <Box key={index} title={el.title} desc={el.desc} index={index} />;
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

