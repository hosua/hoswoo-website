import Video from "@components/Video";
import shermieInvadersVideo from "/videos/shermie-invaders.mp4";
import { Card, Button } from "react-bootstrap";
import ProjectPage from "@components/ProjectPage";

const ProjectShermieInvaders = () => {
  const body = () => {
    return (
      <>
        <Card.Text>
          Shermie Invaders is a game that I wrote with classmates as my final
          senior project using the Phaser game engine, an engine written in
          JavaScript. The game is a spin on Space Invaders, using Shermie as the
          main character, a mascot for the company Navitend.
        </Card.Text>
        <Card.Text>
          My role in this project was designing the game, implementing the UI in
          a reusable fashion, designing the enemy behavior, designing the
          bosses, and implementing the challenge mode.
        </Card.Text>
        <Video src={shermieInvadersVideo} />
        <Card.Text>
          Unfortunately, the source code cannot be provided since I do not own
          the rights to the source code, though if that is ever changed, the
          link to the repository will be added to this page.
        </Card.Text>
        <Card.Text>
          However, you can click the button below to play the game in your
          browser!
        </Card.Text>
        <a href="/hoswoo-website/shermie-invaders/index.html">
          <Button className="my-3">Play Shermie Invaders</Button>
        </a>
        <hr />
        <Card.Text>
          <h2>Features</h2>
          <hr />
          <ul>
            <li> 150+ levels with difficulty scaling </li>
            <li>
              Upgradable stats, such as a shield, spread shot, and piercing shot
              that the player can purchase from drops at the end of each level
            </li>
            <li> 3 unique and challenging bosses </li>
            <li>
              A very challenging boss rush where you are tasked to fight all 3
              bosses with only one life
            </li>
            <li> Local high score saving </li>
            <li> In-game dialogue and story </li>
            <li>
              Cheat codes for debugging and testing (type navitend in the main
              menu to enable them)
            </li>
            <li> Mobile PWA support </li>
          </ul>
        </Card.Text>
      </>
    );
  };
  return <ProjectPage title="Shermie Invaders" body={body()} />;
};

export default ProjectShermieInvaders;
