import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Social from "./components/Social";
import Footer from "./components/Footer";
import ProjectDetail from "./pages/ProjectDetail";
import AllProjects from "./pages/AllProjects";

function Home() {
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

function ProjectDetailPage() {
  return (
    <Layout>
      <ProjectDetail />
    </Layout>
  );
}

function AllProjectsPage() {
  return (
    <Layout>
      <AllProjects />
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<AllProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
    </Routes>
  );
}