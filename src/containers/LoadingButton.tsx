import React from "react";
import Button from "react-bootstrap/Button";
import { BsArrowRepeat } from "react-icons/bs";

type LoadingButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  isLoading: boolean;
  className: string;
  disabled: boolean;
  children?: React.ReactNode | null;
};

export const LoadingButton: React.FC<LoadingButtonProps> = (props) => {
  const {
    type = "button",
    isLoading,
    className = "",
    disabled = false,
    ...rest
  } = props;

  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      className={`LoaderButton ${className}`}
    >
      {isLoading && <BsArrowRepeat className="spinning" />}
      {rest?.children}
    </Button>
  );
};

export default LoadingButton;