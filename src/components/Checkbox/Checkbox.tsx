import { Square } from './Checkbox.styles';
import Check from './Check';

interface CheckboxProps {
  checked: boolean;
}

const Checkbox = ({ checked }: CheckboxProps) => (
  <Square>{checked && <Check />}</Square>
);

export default Checkbox;
