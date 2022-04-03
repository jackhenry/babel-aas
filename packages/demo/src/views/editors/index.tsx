import { FunctionalComponent, h } from 'preact'
import Editor from '../../components/editor';
import FloatingControlsView from '../floating';
import ParametersView from '../parameters';
import './editors.css'

const EditorsView: FunctionalComponent = () => {
  // Since this a view, I'm going to add reducer logic here because it applies to UI



  return (
    <div id="ui-container" class='h-full flex md:overflow-hidden'>
      <ParametersView />
      <div id="editors-controls-wrapper" class="w-full flex relative">
        <Editor isInput={true} />
        <Editor isInput={false} />
        <FloatingControlsView />
      </div>
    </div>
  )
}

export default EditorsView;