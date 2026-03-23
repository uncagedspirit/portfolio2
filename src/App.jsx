import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Social from "./components/Social";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full md:ml-[220px] pb-16 md:pb-0">
        <Hero />
        <Experience />
        <Projects />
        <Education />
        <Social />
        <Footer />
      </main>
    </div>
  );
}
