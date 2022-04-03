import { FunctionalComponent, h } from 'preact'
import Editor from '../../components/editor';
import ParametersView from '../parameters';
import './editors.css'

const EditorsView: FunctionalComponent = () => {
  return (
    <div id="ui-container" class='h-full flex md:overflow-hidden'>
      <ParametersView />
      <div id="editors-controls-wrapper" class="w-full flex relative">
        <Editor isInput={true} />
        <Editor isInput={false} />
      </div>
    </div>
  )
}

export default EditorsView;