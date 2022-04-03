import { createRef, FunctionalComponent, h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/yonce.css'
import 'codemirror/mode/javascript/javascript';
import './editor.css'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectExampleInputText, selectInputText, selectOutputText, updateInputText } from '../../reducers/editorSlice';

interface EditorProps {
  isInput: boolean
}

const Editor: FunctionalComponent<EditorProps> = ({ isInput }) => {

  const ref = useRef<HTMLTextAreaElement>(null);
  const [editor, setEditor] = useState<CodeMirror.EditorFromTextArea>();
  const text = useAppSelector(isInput ? selectInputText : selectOutputText);
  const exampleText = useAppSelector(selectExampleInputText);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (ref && ref.current) {
      const editorElement = ref.current;
      const createdEditor = CodeMirror.fromTextArea(editorElement, {
        theme: 'yonce',
        mode: 'javascript',
        lineWrapping: true,
        lineNumbers: true,
        tabSize: 2,
        readOnly: !isInput,
        cursorHeight: isInput ? undefined : 0
      });

      // For some reason, applying value as parameter doesn't update the editor
      // Therefore, it needs to be manually set it.
      createdEditor.setValue(text);

      if (isInput) {
        createdEditor.on('change', (instance) => {
          dispatch(updateInputText(instance.getValue()))
        })
      }

      setEditor(createdEditor);
    }
  }, [ref]);

  if (!isInput) {
    useEffect(() => {
      if (editor) editor.setValue(text)
    }, [text])
  }

  if (isInput) {
    useEffect(() => {
      if (editor) editor.setValue(exampleText);
    }, [exampleText])
  }

  return (
    <div class="h-full flex flex-col basis-1/2 justify-stretch shrink-0">
      <div class="h-full w-full">
        <textarea ref={ref} />
      </div>
    </div>
  )
}

export default Editor;