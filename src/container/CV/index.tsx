import { useNavigate } from "react-router";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import HeroImg from "../../assets/hero-react.jpeg";
import { Award, Lightbulb, FlaskConical, BookOpen } from "lucide-react";

function CvPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 font-sans text-slate-900 ">
      {/* content-up */}
      <div className="mx-auto max-w-5xl space-y-24 text-center">
        <Button
          variant={"outline"}
          size="sm"
          className="mb-8"
          onClick={() => navigate("/")}
        >
          Kembali ke home
        </Button>

        {/* HERO SECTION */}
        <section className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24">
          {/* content left */}
          <div className="flex-1 space-y-4">
            {/* content inside 1 */}
            <Badge
              variant="secondary"
              className="text-blue-700 bg-slate-50 font-mono"
            >
              <span className="mr-2 h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              - alo amigos -
              <span className="mr-2 h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            </Badge>
            {/* content inside 2 */}
            <div className="space-y-2 ">
              {/* content inside 2.1 */}
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Naufal Yoga Pratama
              </h1>
              {/* content inside 2.2 */}
              <p className="text-lg md:text-xl text-slate-600 font-medium">
                Software Engineer | Fans Messi
              </p>
            </div>
            {/* content inside 3 */}
            <p className="text-slate-600 leading-relaxed max-w-xl italic">
              kadang suka ngoding kadang kidding
            </p>
            {/* content inside 4 */}
            <div className="flex items-center gap-4 pt-4 ml-40 mt-12">
              <Button className="bg-blue-600/80 hover:bg-blue-700 text-white px-8">
                Email me
              </Button>
              <Button
                variant="outline"
                className="text-slate-900 hover:bg-slate-100"
              >
                Connect
              </Button>
            </div>
          </div>

          {/* content right */}
          <div className="md:w-[350px] shrink-0">
            {/* content inside 1 */}
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 shadow-xl border border-slate-200 mr-4 shadow-lg">
              <img
                src={HeroImg}
                alt="foto-hero"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </section>
        {/* EDUCATION SECTION */}
        <section className="space-y-8 pt-12 border-t border-slate-200 text-left ">
          <h2 className="text-2xl font-bold">Education</h2>
          {/* content inside */}
          <div className="flex flex-col mt-4 md:flex-row gap-4 md:gap-16">
            {/* content kiwo */}
            <div className="md:w-48 shrink-0 text-sm font-medium text-slate-400 mt-1">
              Aug 2021 - April 2026
            </div>
            {/* content tengen */}
            <div className="space-y-2">
              <div className="ml-2">
                {/* content tengen 1 */}
                <h3 className="text-xl font-bold text-slate-900 font-mono">
                  Universitas Diponegoro
                </h3>
                {/* content tengen 2 */}
                <p className="text-slate-600 font-medium">
                  Bachelor of Computer Engineering
                </p>
              </div>
              {/* content tengen 3 */}
              <div className="flex items-center gap-3 pt-2">
                <Badge
                  variant="secondary"
                  className="text-blue-600 hover:bg-blue-200 border-none font-mono"
                >
                  GPA: 3.84/4.00
                </Badge>
              </div>
            </div>
          </div>
        </section>
        {/* ABOUT ME SECTION */}
        <section className="space-y-8 pt-12 border-t border-slate-200 text-left">
          <h2 className="text-2xl font-bold">About Me</h2>
          {/* content kiri */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* content inside 1 */}
            <div className="space-y-4 text-slate-600 leading-relaxed text-justify mt-4">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat eveniet tempore cumque velit tenetur distinctio
                inventore, officia ratione vitae? Expedita porro officia
                possimus, earum eligendi magnam sint et deleniti illum.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Impedit molestias, amet eum quos quod voluptatibus cumque labore
                error laudantium in at officia modi officiis veniam ad, nemo,
                quaerat ea neque.
              </p>
            </div>
            {/* content kanan */}
            <div>
              {/* content inside 2.1 */}
              <div className="bg-slate-200/30 border border-slate-200/30 p-6 rounded-xl shadow-sm h-full hover:shadow-md transition-shadow mt-2">
                <h3 className="font-semibold mb-4 text-slate-900 font-mono">
                  Core Discipline
                </h3>
                {/* content inside 2.2 */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 font-mono"
                  >
                    Web Developer
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 font-mono"
                  >
                    Cloud Computing
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 font-mono"
                  >
                    Backend Developer
                  </Badge>
                </div>
                <h3 className="font-semibold mb-4 text-slate-900 font-mono mt-8">
                  Programming Languages
                </h3>
                {/* content inside 2.2 */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 font-mono"
                  >
                    Java
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 font-mono"
                  >
                    Javascript
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 font-mono"
                  >
                    Typescript
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 font-mono"
                  >
                    PHP
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 font-mono"
                  >
                    Python
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* EXPERIENCE SECTION */}
        <section className="space-y-8 pt-12 border-t border-slate-200 text-left">
          <h2 className="text-2xl font-bold">Experience</h2>

          {/* content inside (Timeline Container dengan Garis Vertikal) */}
          <div className="relative border-l-2 border-slate-100 ml-2 space-y-8 pb-4 mt-4">
            {/* content inside 1 */}
            <div className="relative flex flex-col md:flex-row gap-4 md:gap-16 pl-6 md:pl-8">
              {/* Titik Timeline (The Dot) */}
              <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-slate-300"></span>

              {/* content kiwo (Year) */}
              <div className="md:w-32 shrink-0 text-sm font-medium text-slate-400">
                2026
              </div>

              {/* content tengen (Card) */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex-1">
                {/* content tengen 1 */}
                <h3 className="text-lg font-bold text-slate-900 font-mono">
                  Laboratory Assistant
                </h3>
                {/* content tengen 2 */}
                <p className="text-sm font-semibold text-blue-600 mb-3 font-mono">
                  Computer Engineering Lab, Universitas Diponegoro
                </p>
                {/* content tengen 3 */}
                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  Mentoring students in core computer engineering concepts,
                  grading assignments, and maintaining laboratory
                  infrastructure. Facilitating practical sessions on
                  microcontrollers, networking, and software engineering
                  principles.
                </p>
              </div>
            </div>

            {/* content inside 2 */}
            <div className="relative flex flex-col md:flex-row gap-4 md:gap-16 pl-6 md:pl-8">
              {/* Titik Timeline (The Dot) */}
              <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-slate-300"></span>

              {/* content kiwo (Year) */}
              <div className="md:w-32 shrink-0 text-sm font-medium text-slate-400">
                2023
              </div>

              {/* content tengen (Card) */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex-1">
                {/* content tengen 1 */}
                <h3 className="text-lg font-bold text-slate-900 font-mono">
                  Google Cloud Arcade Facilitator
                </h3>
                {/* content tengen 2 */}
                <p className="text-sm font-semibold text-blue-600 mb-3 font-mono">
                  Google Cloud Platform
                </p>
                {/* content tengen 3 */}
                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  Guided participants through hands-on labs and challenges
                  within the Google Cloud Arcade environment. Provided technical
                  support on GCP services, including Compute Engine, Kubernetes,
                  and BigQuery, helping peers achieve cloud certifications.
                </p>
              </div>
            </div>

            {/* content inside 3 (Bisa ditambah sesuai desain) */}
            <div className="relative flex flex-col md:flex-row gap-4 md:gap-16 pl-6 md:pl-8">
              {/* Titik Timeline (The Dot) */}
              <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-slate-300"></span>

              {/* content kiwo (Year) */}
              <div className="md:w-32 shrink-0 text-sm font-medium text-slate-400">
                2023
              </div>

              {/* content tengen (Card) */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex-1">
                {/* content tengen 1 */}
                <h3 className="text-lg font-bold text-slate-900 font-mono">
                  Web Developer Intern
                </h3>
                {/* content tengen 2 */}
                <p className="text-sm font-semibold text-blue-600 mb-3 font-mono">
                  Dinas Kepemudaan dan Olahraga Kota Semarang
                </p>
                {/* content tengen 3 */}
                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  Developed and maintained responsive web applications using
                  modern JavaScript frameworks. Collaborated with the design
                  team to implement pixel-perfect UIs and integrated RESTful
                  APIs to enhance platform functionality.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* ACHIEVEMENTS SECTION */}
        <section className="space-y-8 pt-12 border-t border-slate-200 text-left pb-24">
          <h2 className="text-2xl font-bold">Achievements</h2>
          
          {/* content inside */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            
            {/* content inside 1 */}
            <div className="bg-[#f8f9fa] border border-slate-200 p-6 rounded-xl shadow-sm h-full hover:shadow-md transition-shadow">
              {/* content inside 1.1 */}
              <div className="h-10 w-10 rounded-lg bg-blue-100/50 text-blue-700 flex items-center justify-center mb-4">
                <Award size={20} />
              </div>
              {/* content inside 1.2 */}
              <h3 className="font-bold text-slate-900 mb-2 font-mono">Bangkit Academy Distinction</h3>
              {/* content inside 1.3 */}
              <p className="text-sm text-slate-600 leading-relaxed">
                Selected and graduated with distinction from the prestigious Bangkit Academy program, specializing in Cloud Computing and Machine Learning pathways.
              </p>
            </div>

            {/* content inside 2 */}
            <div className="bg-[#f8f9fa] border border-slate-200 p-6 rounded-xl shadow-sm h-full hover:shadow-md transition-shadow">
              {/* content inside 2.1 */}
              <div className="h-10 w-10 rounded-lg bg-blue-100/50 text-blue-700 flex items-center justify-center mb-4">
                <Lightbulb size={20} />
              </div>
              {/* content inside 2.2 */}
              <h3 className="font-bold text-slate-900 mb-2 font-mono">Samsung Solve for Tomorrow</h3>
              {/* content inside 2.3 */}
              <p className="text-sm text-slate-600 leading-relaxed">
                National finalist in the Samsung Solve for Tomorrow competition, presenting an innovative IoT and AI-driven solution for sustainable urban environments.
              </p>
            </div>

            {/* content inside 3 */}
            <div className="bg-[#f8f9fa] border border-slate-200 p-6 rounded-xl shadow-sm h-full hover:shadow-md transition-shadow">
              {/* content inside 3.1 */}
              <div className="h-10 w-10 rounded-lg bg-blue-100/50 text-blue-700 flex items-center justify-center mb-4">
                <FlaskConical size={20} />
              </div>
              {/* content inside 3.2 */}
              <h3 className="font-bold text-slate-900 mb-2 font-mono">PKM Funding Recipient</h3>
              {/* content inside 3.3 */}
              <p className="text-sm text-slate-600 leading-relaxed">
                Awarded research funding under the Student Creativity Program (PKM) by the Ministry of Education for advanced technological implementation research.
              </p>
            </div>

            {/* content inside 4 */}
            <div className="bg-[#f8f9fa] border border-slate-200 p-6 rounded-xl shadow-sm h-full hover:shadow-md transition-shadow">
              {/* content inside 4.1 */}
              <div className="h-10 w-10 rounded-lg bg-blue-100/50 text-blue-700 flex items-center justify-center mb-4">
                <BookOpen size={20} />
              </div>
              {/* content inside 4.2 */}
              <h3 className="font-bold text-slate-900 mb-2 font-mono">International Publication</h3>
              {/* content inside 4.3 */}
              <p className="text-sm text-slate-600 leading-relaxed">
                Co-authored a technical paper published in an international engineering journal, detailing findings on distributed cloud architecture efficiency.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CvPage;
