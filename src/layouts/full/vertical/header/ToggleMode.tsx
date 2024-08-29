import { AppState, useDispatch, useSelector } from "store/Store";
import { setDarkMode } from "store/customizer/CustomizerSlice";
import { IconMoon, IconSun } from "@tabler/icons-react";

const ToggleMode = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  return customizer.activeMode === "light" ? (
    <IconMoon
      color="#fff"
      onClick={() => dispatch(setDarkMode("dark"))}
      cursor="pointer"
      size={20}
    />
  ) : (
    <IconSun
      color="#fff"
      onClick={() => dispatch(setDarkMode("light"))}
      cursor="pointer"
      size={20}
    />
  );
};

export default ToggleMode;
