

const Advertising = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden mt-5 border-none">
        <video
          src="https://video.wixstatic.com/video/5dd8a0_e473158d364b4d049953dbbfc598d647/1080p/mp4/file.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full  object-cover"
        />
    </div>
  );
};

export default Advertising;
