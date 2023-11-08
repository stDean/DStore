export const ImgText = ({ text, imgPath, gap, Icon, active = false }) => {
  return (
    <div className={`flex items-center mb-2 ${gap ? "gap-2" : "gap-3"}`}>
      {imgPath && <img src={`images/${imgPath}`} alt="" width={45} />}
      {Icon && <Icon />}
      <p className={`text-xs ${active && "font-semibold"}`}>{text}</p>
    </div>
  );
};
