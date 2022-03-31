import { FunctionalComponent, h } from "preact";
import Backend from "../../helpers/backend";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectShowDrawer, toggle } from "../../reducers/uiSlice";

const FloatingControlsView: FunctionalComponent = () => {

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
    <div class="absolute z-10 bottom-4 left-8 right-0 mx-auto py-1 flex justify-center w-36 bg-override-neutral-900">
      <div class="flex w-full">
        <button class="flex grow justify-center" onClick={handleDrawerToggle}>
          <span class="material-icons text-3xl text-override-yellow hover:text-override-yellow/50">
            settings
          </span>
        </button>
        <button class="flex grow justify-center" onClick={handleSend}>
          <span class="material-icons text-3xl text-override-green hover:text-override-green/50">
            send
          </span>
        </button>
      </div>
    </div>
  )
}

export default FloatingControlsView;