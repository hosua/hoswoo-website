import tetricVideo from "/videos/tetric.mp4";
import tetripyVideo from "/videos/tetripy.mp4";
import tetrijsVideo from "/videos/tetrisjs.mp4";
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
        <div style={{ maxWidth: "1000px", margin: "auto" }}>
          <Video src={tetricVideo} />
        </div>
      </>
    );
  };

  const tetripyBody = () => {
    return (
      <>
        <Card.Text>
          TetriPy is a version of Tetris that I wrote in Python3 using pygame.
          This version is probably the most polished version I created, aside
          from the fact that it lacks sound.
        </Card.Text>
        <Card.Text>
          TetriPy features fluid controls, a next piece queue, Tetronimo
          statistics counter, the ability to hold pieces, scoring, and a
          leveling system.
        </Card.Text>
        <Card.Text>
          Similar to TetriC, the user can start TetriPy on a higher level by
          passing the level as a command line argument.
        </Card.Text>
        <Card.Text>
          For example, to start on level 10{" "}
          <div style={{ maxWidth: "200px", display: "inline-block" }}>
            <CodeBlock
              text={"python3 main.py 10"}
              language={"bash"}
              theme={dracula}
              showLineNumbers={false}
            />
          </div>
          .
        </Card.Text>
        <div style={{ maxWidth: "800px", margin: "auto" }}>
          <Video src={tetripyVideo} />
        </div>
      </>
    );
  };

  const tetrisjsBody = () => {
    return (
      <>
        <Card.Text>
          This is the version of Tetris that I made in JavaScript. This was one
          of the first and only things that I made with pure JavaScript and a
          canvas and as a result, it is quite awful. TetrisJS does feature the
          ability to hold pieces, a leveling system and scoring system, but it
          is something I never got around to or felt like polishing.
        </Card.Text>
        <Card.Text>
          It has this weird bug where all of the pieces currently on the field
          will change to the color of the piece that most recently fell. It's
          probably an easy fix, but I'm too lazy to figure it out.
        </Card.Text>
        <div style={{ maxWidth: "600px", margin: "auto" }}>
          <Video src={tetrijsVideo} />
        </div>
        <Card.Text>
          <strong>TODO:</strong> Get this working in browser (maybe after fixing
          the stupid bug), I am too mentally fatigued to figure this out at the
          time of writing this.
        </Card.Text>
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
