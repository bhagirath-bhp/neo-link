import { sendColorPallete } from "@/supabase/supabase";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
interface Colors {
  [key: string]: string;
}

const ThemeColorProvider = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useUser();
  const [colors, setColors] = useState<Colors>({
    "primary-color-1": "#ffffff",
    "primary-color-2": "#ffffff",
    "primary-color-3": "#000000",
    // "primary-color-4": "#ff0000",
  });
  const handleColorChange = (colorName: string, newColor: string) => {
    setColors({
      ...colors,
      [colorName]: newColor,
    });
    document.documentElement.style.setProperty(`--${colorName}`, newColor);
  };

  const onSubmit = async (e: any) => { 
    e.preventDefault(); 
    setLoading(true);
    const response = (user.isLoaded && user.user) && await sendColorPallete(user?.user?.id, colors);
    if(response){
      setLoading(false);
      setTimeout(() => {
        setIsActive(false);
      }, 100);
    }
  } 

  return (
    <div className="container relative cursor-pointer">
      <div className="flex justify-center items-center gap-[0.5rem]" onClick={() => {setIsActive(!isActive)}}>
        <div className="border-[1px] border-[#A1A1A1] h-[2rem] w-[2rem] rounded-full bg-gradient-to-r from-primary-color-1 to-primary-color-2">
        </div>
        Theme
      </div>
      <div
        // className={`bg-white absolute right-[1rem]  p-[1rem] rounded-lg z-[99] border-[1px] border-[#A1A1A1] overflow-hidden transition-height duration-300  ${ isActive ? "max-h-[300px] opacity-100" : "max-h-[0px] opacity-0" }`}
        className={`bg-white absolute right-[1rem] flex flex-col gap-[1rem] top-[2.5rem] p-[1rem] rounded-lg z-[99] border-[1px] border-[#A1A1A1] overflow-hidden transition-dropdown duration-300 max-h-[300px] origin-top  ${
          isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        <form action="" onSubmit={onSubmit}>
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
                <span className="text-black">{color}</span>
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
          <Button size="sm" type="submit" loading={loading}>Save</Button>
        </form>
      </div>
    </div>
  );
};

export default ThemeColorProvider;
