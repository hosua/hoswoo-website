import Video from "@components/Video";
import { Card } from "react-bootstrap";
import ProjectPage from "@components/ProjectPage";

const ProjectFlappyBird = () => {
  const body = () => {
    return (
      <>
        <Card.Text>TO DO</Card.Text>
      </>
    );
  };
  return <ProjectPage title="FlapPy Bird" body={body()} />;
};

export default ProjectFlappyBird;
