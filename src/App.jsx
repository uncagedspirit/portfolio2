import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Social from "./components/Social";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Layout>
      <Hero />
      <Experience />
      <Projects />
      <Education />
      <Social />
      <Footer />
    </Layout>
  );
}