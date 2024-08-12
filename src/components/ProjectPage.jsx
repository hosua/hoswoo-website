import { Card } from "react-bootstrap";
import SourceCodeButton from "@components/SourceCodeButton";

/* A template for all project pages */

const ProjectPage = ({ title, body, srcUrl }) => {
  return (
    <div className="project-content">
      <Card>
        <Card.Header className="project-title">
          <h1> {title} </h1>
          {srcUrl ? <SourceCodeButton srcUrl={srcUrl} /> : null}
        </Card.Header>
        <Card.Body className="project-body">{body}</Card.Body>
      </Card>
    </div>
  );
};

export default ProjectPage;
