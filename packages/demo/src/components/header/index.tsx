import { FunctionalComponent, h } from "preact";
import Backend from "../../helpers/backend";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectShowDrawer, toggle } from "../../reducers/uiSlice";
import GithubIcon from "../common/github";
import SunIcon from "../common/sun";

const Header: FunctionalComponent = () => {
  
  const isDrawerShown = useAppSelector(selectShowDrawer);
  const dispatch = useAppDispatch();

  const handleDrawerToggle = () => {
    dispatch(toggle(!isDrawerShown));
  }

  const handleSend = () => {
    // The code works. The types need to be fixed though so tsc stops complaining.
    dispatch(Backend.compileRequest);
  }

  return (
    <div class="flex px-2 py-1.5 bg-override-bg">
      <div class="flex grow justify-between">
        <div class="flex align-center">
          <SunIcon classes="!fill-override-blue animate-spin-slow" />
          <span class="ml-2 text-override-blue font-bold place-self-start">baas demo</span>
        </div>
        <div class="flex justify-center items-center gap-x-4">
          <button class="flex grow justify-center" onClick={handleSend}>
            <span class="material-icons text-xl text-override-green hover:text-override-green/50">
              send
            </span>
          </button>
          <button class="flex grow justify-center" onClick={handleDrawerToggle}>
            <span class="material-icons text-xl text-override-yellow hover:text-override-yellow/50">
              settings
            </span>
          </button>
          <a href="https://www.jackhenry.io#projects">
            <GithubIcon classes="!fill-override-fg/75 hover:!fill-override-blue w-auto h-6" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header;