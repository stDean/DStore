const Hero = ({ imgPath, title, subtitle }) => {
  return (
    <div className="flex items-center gap-4">
      <img src={imgPath} alt="" />
      <div>
        <p className="font-semibold text-sm mb-1">{title}</p>
        <p className="text-xs">{subtitle}</p>
      </div>
    </div>
  );
};

export default Hero;
