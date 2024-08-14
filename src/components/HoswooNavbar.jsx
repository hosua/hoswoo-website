import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import ThemeButton from "@components/ThemeButton";

const HoswooNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top px-3">
      <Navbar.Brand href="/">Hoswoo's Website</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="Projects" id="basic-nav-dropdown">
            <NavDropdown.Item href="/projects/path-finder">
              SDL2 Path Finder
            </NavDropdown.Item>
            <NavDropdown.Item href="/projects/tetris">Tetris</NavDropdown.Item>
            <NavDropdown.Item href="/projects/snake-plus-plus">
              Snake++
            </NavDropdown.Item>
            <NavDropdown.Item href="/projects/flappy-bird">
              FlapPy Bird
            </NavDropdown.Item>
            <NavDropdown.Item href="/projects/chip-8-emulator">
              CHIP-8 Emulator
            </NavDropdown.Item>
            <NavDropdown.Item href="/projects/shermie-invaders">
              Shermie Invaders
            </NavDropdown.Item>
          </NavDropdown>
          <ThemeButton />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HoswooNavbar;
