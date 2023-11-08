import { Color } from "./Color";

export default function SpacedText({ title, subTitle, color, size }) {
  return (
    <div
      className={`flex justify-between items-center border-b py-4 last:border-none`}
    >
      <p className="text-sm font-semibold">{title}:</p>
      {subTitle && <p className="text-sm text-gray-500">{subTitle}</p>}

      {color && (
        <div className="flex gap-1">
          {color.map(i => (
            <Color color={i} key={i} width />
          ))}
        </div>
      )}

      {size && (
        <div className="flex gap-1">
          {size.map(i => (
            <p
              className="text-xs bg-white shadow-sm rounded-full w-6 h-6 flex justify-center items-center"
              key={i}
            >
              {i}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
