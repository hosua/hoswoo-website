import { Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import ProjectPathFinder from "@pages/projects/PathFinder";
import ProjectTetris from "@pages/projects/Tetris";
import ProjectChip8Emulator from "@pages/projects/Chip8Emulator";
import ProjectFlappyBird from "@pages/projects/FlappyBird";
import ProjectShermieInvaders from "@pages/projects/ShermieInvaders";

const HoswooRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/path-finder" element={<ProjectPathFinder />} />
      <Route path="/projects/tetris" element={<ProjectTetris />} />
      <Route
        path="/projects/chip-8-emulator"
        element={<ProjectChip8Emulator />}
      />
      <Route path="/projects/flappy-bird" element={<ProjectFlappyBird />} />
      <Route
        path="/projects/shermie-invaders"
        element={<ProjectShermieInvaders />}
      />
    </Routes>
  );
};

export default HoswooRoutes;
