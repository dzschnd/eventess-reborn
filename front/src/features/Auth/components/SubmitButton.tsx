import type { FC } from "react";
import Button from "../../../components/Button";

interface SubmitButtonProps {
  message: string;
  disabled?: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({ message, disabled }) => {
  return (
    <Button
      type="submit"
      borderRadius={30}
      message={message}
      disabled={disabled}
      className={`h-9 w-full uppercase`}
      inverted
    />
  );
};

export default SubmitButton;
