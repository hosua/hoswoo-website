const Video = ({ src, type = "video/mp4" }) => {
  return (
    <div className="video-container">
      <video className="video-content" controls>
        <source src={src} type={type} />
      </video>
    </div>
  );
};

export default Video;
