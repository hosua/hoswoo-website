import flappyBirdVideo from "/videos/flapPy-bird.mp4";
import Video from "@components/Video";
import { Card } from "react-bootstrap";
import ProjectPage from "@components/ProjectPage";

const ProjectFlappyBird = () => {
  const body = () => {
    return (
      <>
        <Card.Text>
          FlapPy Bird is a Flappy Bird clone that I created in Python using
          PyGame. It is played by simply clicking on the screen when you want to
          flap.
        </Card.Text>
        <Card.Text>
          It features high score saving and uses assets from the original game.
        </Card.Text>
        <div style={{ maxWidth: "400px", margin: "auto" }}>
          <Video src={flappyBirdVideo} />
        </div>
      </>
    );
  };
  return (
    <ProjectPage
      title="FlapPy Bird"
      body={body()}
      srcUrl={"https://github.com/hosua/FlapPy-bird"}
    />
  );
};

export default ProjectFlappyBird;
