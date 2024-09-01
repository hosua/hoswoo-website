import { Carousel, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./ProjectCarousel.css";

const bannerStyle = {
  color: "white",
  background: "rgba(25,25,25,0.75)",
  borderRadius: "10px",
  width: "50%",
  position: "absolute",
  top: "75%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "150px",
  textAlign: "center",
  padding: "20px",
};

const imgStyle = {
  width: "100%", // Ensure it fills the carousel item
  height: "80vh", // Fixed height for consistency
  objectFit: "contain", // Ensures the image covers the area without stretching
  borderRadius: "10px",
};

const imgWrapper = {
  width: "100%",
  height: "90vh",
  overflow: "hidden",
  borderRadius: "10px",
};

const ProjectCarousel = () => {
  return (
    <Container style={{ borderRadius: "10px", backgroundColor: "#353b45" }}>
      <Carousel interval={5000}>
        <Carousel.Item>
          <LinkContainer to="/projects/path-finder">
            <div style={imgWrapper}>
              <img src="images/SDL2-pathfinder.png" style={imgStyle} />
            </div>
          </LinkContainer>
          <Carousel.Caption style={bannerStyle}>
            <h3>SDL2 Pathfinder</h3>
            <p>Maze generator and pathfinder made in C++ using SDL2.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <LinkContainer to="/projects/shermie-invaders">
            <div style={imgWrapper}>
              <img src="images/ShermieInvaders.png" style={imgStyle} />
            </div>
          </LinkContainer>
          <Carousel.Caption style={bannerStyle}>
            <h3>Shermie Invaders</h3>
            <p>
              Shooter game based on Space Invaders, made in JavaScript using the
              Phaser game engine. This was my senior final project.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <LinkContainer to="/projects/tetris">
            <div style={imgWrapper}>
              <img src="images/TetriPy.png" style={imgStyle} />
            </div>
          </LinkContainer>
          <Carousel.Caption style={bannerStyle}>
            <h3>Tetris</h3>
            <p>
              Three Tetris clones made in three different programming languages:
            </p>
            <p>C, Python, and JavaScript.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <LinkContainer to="/projects/snake-plus-plus">
            <div style={imgWrapper}>
              <img src="images/Snake++.png" style={imgStyle} />
            </div>
          </LinkContainer>
          <Carousel.Caption style={bannerStyle}>
            <h3>Snake++</h3>
            <p>
              A snake clone written in C++ and rendered with SDL2, featuring
              different difficulty levels and hi-score saving.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <LinkContainer to="/projects/flappy-bird">
            <div style={imgWrapper}>
              <img src="images/FlapPy-bird.png" style={imgStyle} />
            </div>
          </LinkContainer>
          <Carousel.Caption style={bannerStyle}>
            <h3>FlapPy Bird</h3>
            <p>
              A Flappy Bird clone written in Python using PyGame. Features
              hi-score saving.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <LinkContainer to="/projects/chip-8-emulator">
            <div style={imgWrapper}>
              <img src="images/Chip8.png" style={imgStyle} />
            </div>
          </LinkContainer>
          <Carousel.Caption style={bannerStyle}>
            <h3>CHIP8 Emulator</h3>
            <p>
              An emulator for the CHIP8 written in C++ using SDL2 for rendering.
              Features a useful debugger for observing opcode flow and
              step-by-step execution.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default ProjectCarousel;
