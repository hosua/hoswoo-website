const ShermieInvaders = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        src={`/shermie-invaders/index.html`}
        title="Shermie Invaders"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
};

/* // Why the fuck doesn't this work

import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const ShermieInvaders = () => {
  const gameContainerRef = useRef(null);

  useEffect(() => {
    const container = gameContainerRef.current;

    // Load the HTML content
    fetch("/hoswoo-website/shermie-invaders/index.html")
      .then((response) => response.text())
      .then((html) => {
        container.innerHTML = html;

        // Create and append the script tag for the Phaser game
        const script = document.createElement("script");
        script.src = "/hoswoo-website/shermie-invaders/bundle.min.js"; // Path to your Phaser build
        script.async = true;
        container.appendChild(script);
      });

    return () => {
      // Cleanup if necessary
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={gameContainerRef} />;
};
*/

export default ShermieInvaders;
