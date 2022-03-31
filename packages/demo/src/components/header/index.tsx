import { FunctionalComponent, h } from "preact";
import GithubIcon from "../common/github";
import SunIcon from "../common/sun";

const Header: FunctionalComponent = () => {

  return (
    <div class="flex px-2 py-1.5 bg-override-bg">
      <div class="flex grow justify-between">
        <div class="flex align-center">
          <SunIcon classes="!fill-override-blue animate-spin-slow" />
          <span class="ml-2 text-override-blue font-bold place-self-start">baas demo</span>
        </div>
        <a href="https://www.jackhenry.io#projects">
          <GithubIcon classes="!fill-override-fg/75 hover:!fill-override-blue w-auto h-6" />
        </a>
      </div>
    </div>
  )
}

export default Header;