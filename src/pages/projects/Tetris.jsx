import tetricVideo from "/videos/tetric.mp4";
import Video from "@components/Video";
import { Card } from "react-bootstrap";
import ProjectPage from "@components/ProjectPage";
import { CodeBlock, dracula } from "react-code-blocks";

const ProjectTetris = () => {
  const tetricBody = () => {
    return (
      <>
        <Card.Text>
          TetriC is a version of Tetris that I wrote in C using SDL2 to render
          graphics. This was the first version of Tetris that I created and is
          missing some important features such as hard dropping, pausing, and
          piece holding. However, it does support sound effects, a next piece
          queue, tetronimo statistics counter, scoring, and a leveling system.
        </Card.Text>
        <Card.Text>
          The player can start the game on a higher level by running the game
          from the command line, and passing the number as an argument.
        </Card.Text>
        <Card.Text>
          For example, to start on level 10{" "}
          <div style={{ maxWidth: "125px", display: "inline-block" }}>
            <CodeBlock
              text={"./Tetric 10"}
              language={"bash"}
              theme={dracula}
              showLineNumbers={false}
            />
          </div>{" "}
          or if on Windows{" "}
          <div style={{ maxWidth: "125px", display: "inline-block" }}>
            <CodeBlock
              text={"./Tetric.exe 10"}
              language={"bash"}
              theme={dracula}
              showLineNumbers={false}
            />
          </div>
          .
        </Card.Text>
        <Video style={{ width: "50% !important" }} src={tetricVideo} />
      </>
    );
  };

  const tetripyBody = () => {
    return (
      <>
        <Card.Text>TO DO</Card.Text>
      </>
    );
  };

  const tetrisjsBody = () => {
    return (
      <>
        <Card.Text>TO DO</Card.Text>
      </>
    );
  };
  return (
    <>
      <div className="project-content">
        <Card>
          <Card.Header className="project-title">
            <h1>Tetris Projects</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              I enjoy playing Tetris, so making these was a fun thing for me to
              do. Tetris is pretty simple game to implement, but not so simple
              that it is trivial. Reimplementing Tetris in different languages
              was a great excercise for learning languages that I'm unfamiliar
              with.
            </Card.Text>
            <Card.Text>
              Here are the different versions of Tetris that I've created in C,
              Python, and JavaScript.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <ProjectPage
        title="TetriC"
        body={tetricBody()}
        srcUrl={"https://github.com/hosua/TetriC"}
      />
      <ProjectPage
        title="TetriPy"
        body={tetripyBody()}
        srcUrl={"https://github.com/hosua/TetriPy"}
      />
      <ProjectPage
        title="TetrisJS"
        body={tetrisjsBody()}
        srcUrl={"https://github.com/hosua/TetrisJS.git"}
      />
    </>
  );
};

export default ProjectTetris;
