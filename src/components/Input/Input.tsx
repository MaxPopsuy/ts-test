import React from "react";
import classNames from "classnames";
import styles from "./Input.module.css";

interface InputProps {
  num?: boolean;
  hidden?: string;
  style?: string;
  placeholder?: string;
  maxLength?: number | undefined | string;
  minLength?: number | undefined;
  type: string;
  name: string;
  text: string;
  autocomplete?: string;
  value: string | number;
  setValue: (value: string) => void | null;

}

const Input: React.FC<InputProps> = ({num, hidden, style, placeholder, maxLength, minLength, type, name, text, autocomplete, value, setValue}): React.ReactElement => {
  return (
    <label className={classNames(style, styles.input)}>
      <span className={classNames(styles.input__heading, hidden)}>{text}</span>
      {num ? <input placeholder={placeholder} min={minLength} max={maxLength} onChange={(event) => setValue(event.target.value)} value={value} name={name} type={type} autoComplete={autocomplete} required /> : <input placeholder={placeholder} minLength={minLength} maxLength={maxLength} onChange={(event) => setValue(event.target.value)} value={value} name={name} type={type} autoComplete={autocomplete} required />}
    </label>
  );
};

Input.defaultProps = {
    autocomplete: 'off',
    minLength: undefined,
    maxLength: undefined,
    placeholder: '',
    style: '',
    hidden: '',
    num: false,
};

export default Input;