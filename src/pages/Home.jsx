import { Carousel, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import ProjectCarousel from "@components/ProjectCarousel";

const Home = () => {
  return (
    <>
      <h1 className="mb-3"> My Personal Projects </h1>
      <ProjectCarousel />
      <h3 className="mt-3">
        Click on any project to view more details about it!
      </h3>
    </>
  );
};

export default Home;
