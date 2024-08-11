import { useEffect } from "react";
import { useSelector } from "react-redux";
import HoswooNavbar from "@components/HoswooNavbar";
import HoswooRoutes from "./HoswooRoutes";

import "./App.css";

function App() {
  const { darkMode } = useSelector((state) => state);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <>
      <HoswooNavbar />
      <div style={{ margin: "15px" }}>
        <HoswooRoutes />
      </div>
    </>
  );
}

export default App;
