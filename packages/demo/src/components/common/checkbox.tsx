import { FunctionalComponent, h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface CheckboxProps {
  label: string,
  onCheck: (key: string) => void,
  onUncheck: (key: string) => void
}

const Checkbox: FunctionalComponent<CheckboxProps> = ({ label, onCheck, onUncheck }) => {

  // This isn't super ideal, however, keeping the previous state prevents unnecessary dispatches
  const [previousState, setPreviousState] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChecked === previousState) return;
    if (isChecked) {
      onCheck(label);
      ref.current?.classList.add("!bg-override-blue/50");
    }

    if (!isChecked) {
      onUncheck(label);
      ref.current?.classList.remove("!bg-override-blue/50")
    }
  }, [isChecked])

  const handleClick = () => {
    setPreviousState(isChecked);
    setIsChecked(!isChecked);
  }

  return (
    <div onClick={handleClick}
      class="cursor-pointer flex justify-center rounded shadow-[0_0_2pt_1px] p-1 shadow-override-bg/30 px-2 bg-override-neutral-500/50"
      ref={ref}
    >
      <span class="self-center select-none text-sm">{label}</span>
    </div>
  )
}

export default Checkbox;