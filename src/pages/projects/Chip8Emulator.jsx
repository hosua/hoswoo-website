import Video from "@components/Video";
import { Card } from "react-bootstrap";
import ProjectPage from "@components/ProjectPage";

const ProjectChip8Emulator = () => {
  const body = () => {
    return (
      <>
        <Card.Text>TO DO</Card.Text>
      </>
    );
  };
  return <ProjectPage title="CHIP-8 Emulator" body={body()} />;
};

export default ProjectChip8Emulator;
