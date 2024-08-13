import chip8Video from "/videos/chip8.mp4";
import Video from "@components/Video";
import { Card } from "react-bootstrap";
import ProjectPage from "@components/ProjectPage";
import { CodeBlock, dracula } from "react-code-blocks";

const ProjectChip8Emulator = () => {
  const body = () => {
    return (
      <>
        <Card.Text>
          The CHIP-8 is an old interpreted language that was used to make games
          in the 1970s. It also just so happens to be one of the easiest
          "systems" to create an emulator for, and was a fun way to learn how
          emulators are developed.
        </Card.Text>
        <Card.Text>
          This project was created with C++ and was one of my first SDL2
          projects. It runs most CHIP8 games mostly well, but does not support
          Super-CHIP8 games.
        </Card.Text>
        <Card.Text>
          To view some of the flags that can be run with the emulator, the user
          can run
          <div style={{ maxWidth: "125px", display: "inline-block" }}>
            <CodeBlock
              text={"./CHIP8 -h"}
              language={"bash"}
              theme={dracula}
              showLineNumbers={false}
            />
          </div>
          . There are some useful debugging options for developing CHIP8 games.
        </Card.Text>
        <Video src={chip8Video} />
      </>
    );
  };
  return (
    <ProjectPage
      title="CHIP-8 Emulator"
      body={body()}
      srcUrl="https://github.com/hosua/chip8"
    />
  );
};

export default ProjectChip8Emulator;
