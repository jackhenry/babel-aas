import { FunctionalComponent, Fragment, h } from 'preact';
import Checkbox from './checkbox';

interface CheckboxGroupProps {
  choices: string[],
  onCheck: (key: string) => void,
  onUncheck: (key: string) => void
}

const CheckboxGroup: FunctionalComponent<CheckboxGroupProps> = ({ choices, onCheck, onUncheck }) => {

  return (
    <div class="flex flex-wrap justify-center gap-2">
      {choices.map((choice, index) => (
        <Checkbox label={choice} onCheck={onCheck} onUncheck={onUncheck} key={index} />
      ))}
    </div>
  )
}

export default CheckboxGroup;