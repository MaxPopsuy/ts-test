import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Button.module.css';

interface ButtonProps {
  style?: string;
  text: string;
  type: string;
  onClickFn?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ style, text, type, onClickFn }) => {
  return (
    <button
      onClick={onClickFn}
      className={classNames(styles.button, style)}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
