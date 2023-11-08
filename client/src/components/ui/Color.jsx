export const Color = ({ color, width = false, active = false }) => {
  return (
    <div
      className={`${
        active &&
        "p-1 border border-black rounded-full flex items-center justify-center"
      }`}
    >
      <div
        className={`rounded-full ${width ? "w-4" : "w-6"} ${
          width ? "h-4" : "h-6"
        }`}
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
};
