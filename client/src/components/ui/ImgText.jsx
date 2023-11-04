export const ImgText = ({ text, imgPath, active = false }) => {
  return (
    <div className="flex items-center mb-2 gap-3">
      <img src={`images/${imgPath}`} alt="" width={45} />
      <p className={`text-xs ${active && "font-semibold"}`}>{text}</p>
    </div>
  );
};
