import { FunctionalComponent, h } from 'preact';
import { useAppSelector } from '../../hooks';
import './parameters.css';
import Presets from '../../components/parameters/presets';
import Plugins from '../../components/parameters/plugins';
import { selectShowDrawer } from '../../reducers/uiSlice';
import { useEffect, useRef } from 'preact/hooks';
import AboutView from './about';

const ParametersView: FunctionalComponent = () => {
  const isShown = useAppSelector(selectShowDrawer);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isShown) {
      ref.current?.classList.add('hidden');
      ref.current?.classList.add('hidden-vertical');
    }
    if (isShown) {
      ref.current?.classList.remove('hidden');
      ref.current?.classList.remove('hidden-vertical')
    }
  }, [isShown]);

  return (
    <div id="parameters-container" class="md:h-full !h-full max-w-[18rem] flex basis-auto font-mono bg-override-bg" ref={ref}>
      <div class="w-full flex flex-col gap-y-4 px-1">
        <AboutView />
        <Presets />
        <Plugins />
      </div>
    </div>
  )
}

export default ParametersView;