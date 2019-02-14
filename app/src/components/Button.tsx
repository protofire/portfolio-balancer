import styled, { css } from 'styled-components';

interface ButtonProps {
  inline?: boolean;
}

const Button = styled.button`
  color: #ffffff;
  display: block;
  height: var(--button-height);
  width: ${(props: ButtonProps) => (props.inline ? 'auto' : '100%')};
  padding: 0 calc(var(--spacing-normal) * 0.5);
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.12);
  background-color: #fac202;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;

  &:disabled {
    opacity: 0.25;
    pointer-events: none;
    user-focus: none;
    user-select: none;
  }

  &:focus {
    outline: 0;
  }
`;

export default Button;
