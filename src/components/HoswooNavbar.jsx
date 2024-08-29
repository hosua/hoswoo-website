import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ThemeButton from "@components/ThemeButton";

const HoswooNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top px-3">
      <LinkContainer to="/">
        <Navbar.Brand>Hoswoo's Website</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <NavDropdown title="Projects" id="basic-nav-dropdown">
            <LinkContainer to="/projects/path-finder">
              <NavDropdown.Item>SDL2 Path Finder</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/projects/tetris">
              <NavDropdown.Item>Tetris</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/projects/snake-plus-plus">
              <NavDropdown.Item>Snake++</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/projects/flappy-bird">
              <NavDropdown.Item>FlapPy Bird</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/projects/chip-8-emulator">
              <NavDropdown.Item>CHIP-8 Emulator</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/projects/shermie-invaders">
              <NavDropdown.Item>Shermie Invaders</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <ThemeButton />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HoswooNavbar;
