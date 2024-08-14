import snakePlusPlusVideo from "/videos/snake-plus-plus.mp4";
import Video from "@components/Video";
import { Card } from "react-bootstrap";
import ProjectPage from "@components/ProjectPage";

const ProjectSnakePlusPlus = () => {
  const body = () => {
    return (
      <>
        <Card.Text>
          Snake++ is, as you might have guessed by the name, a snake clone that
          I created in C++ with SDL2. It was one of my first attempts at
          creating menus in SDL2.
        </Card.Text>
        <Card.Text>
          It features 10 different difficulty levels that dictate the speed of
          the snake, high score saving for each difficulty level, and sound
          effects.
        </Card.Text>
        <Video src={snakePlusPlusVideo} />
      </>
    );
  };
  return (
    <ProjectPage
      title="Snake++"
      body={body()}
      srcUrl={"https://github.com/hosua/SnakePlusPlus.git"}
    />
  );
};

export default ProjectSnakePlusPlus;
