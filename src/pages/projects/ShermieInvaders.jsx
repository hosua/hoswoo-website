import Video from "@components/Video";
import { Card } from "react-bootstrap";
import ProjectPage from "@components/ProjectPage";

const ProjectShermieInvaders = () => {
  const body = () => {
    return (
      <>
        <Card.Text>TO DO</Card.Text>
      </>
    );
  };
  return <ProjectPage title="Shermie Invaders" body={body()} />;
};

export default ProjectShermieInvaders;
