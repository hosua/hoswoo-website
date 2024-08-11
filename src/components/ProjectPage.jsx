import { Card } from "react-bootstrap";

const ProjectPage = ({ title, body }) => {
  return (
    <div className="project-content">
      <Card>
        <Card.Header className="project-title">
          <h1> {title} </h1>
        </Card.Header>
        <Card.Body className="project-body">{body}</Card.Body>
      </Card>
    </div>
  );
};

export default ProjectPage;
