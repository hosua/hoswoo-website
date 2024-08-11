import pathFinderVideo from "/videos/sdl2-pathfinder.mp4";
import Video from "@components/Video";
import { Card } from "react-bootstrap";
import ProjectPage from "@components/ProjectPage";

const ProjectPathFinder = () => {
  const body = () => {
    return (
      <>
        <Card.Text>
          This project is a maze generator/solver created in C++ using SDL2 for
          graphics rendering.
        </Card.Text>
        <Video src={pathFinderVideo} />
        <h2>Features</h2>
        <hr />
        <h5>Scene Management and Reusable UI Components</h5>
        <Card.Text>
          This project uses a simple engine I created that manages the app
          through the usage of scenes similar to Unity and the PhaserJS game
          engines. This allows for easier menu management and creating reusable
          components.
        </Card.Text>
        <Card.Text>Some of UI components that were made are:</Card.Text>
        <ol>
          <li>
            Spinner: similar to the spinner used in HTML that allows the user to
            change a value with their scroll wheel or by clicking plus and minus
            buttons.
          </li>
          <li>
            Button: calls a function when clicked on and can be changed to any
            color or text. Plays a sound when clicked and changes colors when
            hovered over.
          </li>
        </ol>
        <Card.Text>
          More components are planned on being added to the engine in the
          future, but in the name of getting things done, the only components
          that were created were the ones I needed for this project.
        </Card.Text>
        <hr />
        <h5>Generate random mazes using two different algorithms</h5>
        <ol className="mt-2">
          <li>Randomize A: Pseudo-randomly places blocks on the grid.</li>
          <li>
            Randomize B: Uses an algorithm based on Conway's Game of Life.
          </li>
        </ol>
        <Card.Text>
          Generated mazes are always guaranteed to be solvable.
        </Card.Text>
        <Card.Text>You can also manually make mazes of your own.</Card.Text>
        <hr />
        <h5>Visualize 3 different pathfinding algorithms to solve mazes</h5>
        <ol className="mt-2">
          <li>Depth First Search (DFS)</li>
          <li>Breadth First Search (BFS)</li>
          <li>A-Star Search (A*)</li>
        </ol>
        <Card.Text>
          The user can also change the speed of the maze solvers where 1 is the
          slowest speed and 10 is the fastest.
        </Card.Text>
        <Card.Text>
          In the settings menu, the user can also change the size of the blocks,
          allowing for more complex mazes to be generated and solved.
        </Card.Text>
      </>
    );
  };

  return <ProjectPage title="SDL2 Pathfinder" body={body()} />;
};

export default ProjectPathFinder;
