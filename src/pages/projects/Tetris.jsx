import Video from "@components/Video";
import { Card } from "react-bootstrap";
import ProjectPage from "@components/ProjectPage";

const ProjectTetris = () => {
  const body = () => {
    return (
      <>
        <Card.Text>TO DO</Card.Text>
      </>
    );
  };
  return <ProjectPage title="Tetris" body={body()} />;
};

export default ProjectTetris;
