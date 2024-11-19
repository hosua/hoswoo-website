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

export default ShermieInvaders;
