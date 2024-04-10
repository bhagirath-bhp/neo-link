import { useState } from "react";
interface Colors {
  [key: string]: string;
}

const ThemeColorProvider: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [colors, setColors] = useState<Colors>({
    "primary-color-1": "#ff0000",
    "primary-color-2": "#00ff00",
    "primary-color-3": "#0000ff",
    // "primary-color-4": "#ff0000",
  });
  const handleColorChange = (colorName: string, newColor: string) => {
    setColors({
      ...colors,
      [colorName]: newColor,
    });
    document.documentElement.style.setProperty(`--${colorName}`, newColor);
  };

  return (
    <div
      className="container relative cursor-pointer"
      onClick={() => {
        setIsActive(!isActive);
      }}
    >
      {/* <h1>Color Picker</h1> */}
      <div className="flex justify-center items-center gap-[0.5rem]">
        <div className="border-[1px] border-[#A1A1A1] h-[2rem] w-[2rem] rounded-full bg-gradient-to-r from-primary-color-1 to-primary-color-2">
        </div>
        Theme
      </div>
      <div
        // className={`bg-white absolute right-[1rem]  p-[1rem] rounded-lg z-[99] border-[1px] border-[#A1A1A1] overflow-hidden transition-height duration-300  ${ isActive ? "max-h-[300px] opacity-100" : "max-h-[0px] opacity-0" }`}
        className={`bg-white absolute right-[1rem] top-[2.5rem] p-[1rem] rounded-lg z-[99] border-[1px] border-[#A1A1A1] overflow-hidden transition-dropdown duration-300 max-h-[300px] origin-top  ${
          isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        <div className="color-pickers flex flex-col gap-[1rem]">
          {Object.entries(colors).map(([colorName, color], index) => (
            <div
              className="flex justify-center items-center gap-[0.5rem]"
              key={index}
            >
              <input
                key={colorName}
                type="color"
                value={color}
                className="rounded-sm px-[0.2rem]"
                onChange={(e) => handleColorChange(colorName, e.target.value)}
              />
              <span>{color}</span>
            </div>
          ))}
        </div>
        <div className="color-boxes">
          {Object.values(colors).map((color, index) => (
            <div
              key={index}
              className="box"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeColorProvider;
