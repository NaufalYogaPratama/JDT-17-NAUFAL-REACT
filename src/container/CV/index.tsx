import { useNavigate } from 'react-router'
import { Badge } from '../../components/ui/badge'
import {Button} from '../../components/ui/button'
import HeroImg from "../../assets/hero.png";

function CvPage() {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-slate-50 py-12 px-6 font-sans text-slate-900 text-left'>
        {/* content-up */}
        <div className='mx-auto max-w-5xl space-y-24'>
            <Button variant={'outline'} size="sm" className='mb-8' onClick={() => navigate("/")}>Kembali ke home</Button>
            
            {/* HERO SECTION */}
            <section className='flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24'>
                {/* content left */}
                <div className='flex-1 space-y-6'>
                    {/* content inside 1 */}
                    <Badge variant="secondary" className="text-blue-700 bg-slate-50 hover:bg-blue-200 font-mono">
                        <span className="mr-2 h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                        - alo amigos -
                        <span className="mr-2 h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                    </Badge>
                    {/* content inside 2 */}
                    <div className='space-y-2 '>
                        {/* content inside 2.1 */}
                        <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight'>
                            Naufal Yoga Pratama
                        </h1>
                        {/* content inside 2.2 */}
                        <p className='text-lg md:text-xl text-slate-600 font-medium'>
                            Software Engineer | Fans Messi
                        </p>
                    </div>
                    {/* content inside 3 */}
                    <p className='text-slate-600 leading-relaxed max-w-xl'>
                        Kadang suka ngoding kadang kidding
                    </p>
                    {/* content inside 4 */}
                    <div className='flex items-center gap-4 pt-4 ml-40 mt-12'>
                        <Button className='bg-blue-600 hover:bg-blue-700 text-white px-8'>Email me</Button>
                        <Button variant="outline" className='text-slate-900 hover:bg-slate-100'>Connect</Button>
                    </div>
                </div>

                {/* content right */}
                <div className='md:w-[350px] shrink-0'>
                    {/* content inside 1 */}
                    <div className='aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 shadow-xl border border-slate-200'>
                        <img src={HeroImg} alt="foto-hero" className='w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500'/>
                    </div>
                </div>
            </section>
            {/* ABOUT ME SECTION */}
            <section className="space-y-8 pt-12 border-t border-slate-200">
                <h2 className="text-2xl font-bold">
                    About Me
                </h2>
                {/* content kiri */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* content inside 1 */}
                    <div className="space-y-4 text-slate-600 leading-relaxed text-justify">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat eveniet tempore cumque velit tenetur distinctio inventore, officia ratione vitae? Expedita porro officia possimus, earum eligendi magnam sint et deleniti illum.
                        </p>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit molestias, amet eum quos quod voluptatibus cumque labore error laudantium in at officia modi officiis veniam ad, nemo, quaerat ea neque.
                        </p>
                    </div>
                    {/* content kanan */}
                    <div>
                        {/* content inside 2.1 */}
                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-sm h-full hover:shadow-md transition-shadow">
                            <h3 className="font-semibold mb-4 text-slate-900">Core Discipline</h3>
                            {/* content inside 2.2 */}
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="bg-slate-200/50 hover:bg-slate-200">Web Developer</Badge>
                                <Badge variant="secondary" className="bg-slate-200/50 hover:bg-slate-200">Cloud Computing</Badge>
                                <Badge variant="secondary" className="bg-slate-200/50 hover:bg-slate-200">Backend Developer</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* EDUCATION SECTION */}
            <section className="space-y-8 pt-12 border-t border-slate-200">
                <h2 className="text-2xl font-bold">Education</h2>
                {/* content inside */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-16">
                    {/* content kiwo */}
                    <div className="md:w-48 shrink-0 text-sm font-medium text-slate-400 mt-1">Aug 2021 - April 2026</div>
                    {/* content tengen */}
                    <div className="space-y-2">
                        {/* content tengen 1 */}
                        <h3 className="text-xl font-bold text-slate-900">Universitas Diponegoro</h3>
                        {/* content tengen 2 */}
                        <p className="text-slate-600 font-medium">Bachelor of Computer Engineering</p>
                        {/* content tengen 3 */}
                        <div className="flex items-center gap-3 pt-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none font-bold">GPA: 3.84/4.00</Badge>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default CvPage
