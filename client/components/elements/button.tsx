import React from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { Colors } from "styles/theme/color";

interface CustomButtonProps {
  id?: string;
  buttonType?: "primary" | "secondary" | "text";
  submit?: boolean;
  label: string;
  height?: string;
  width?: string;
  fontSize?: string;
  margin?: string;
  padding?: string;
  borderRadius?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const StyledButton = styled(Button)<CustomButtonProps>(
  ({ height, width, margin, padding, borderRadius, fontSize, buttonType }) => `
    transition-duration: 0s;
    text-transform: none;
    height: ${height};
    width: ${width};
    margin: ${margin};
    padding: ${padding};
    border: ${
      buttonType === "secondary" ? `1px solid ${Colors.darkBlue}` : "none"
    };
    border-radius: ${borderRadius || "20px"};
    font-weight: 700;
    font-size: ${fontSize};
    line-height: 130%;

    background: ${buttonType === "primary" ? Colors.darkBlue : Colors.white};
    color: ${buttonType === "primary" ? Colors.white : Colors.darkBlue};

    &:hover {
      background: ${
        buttonType === "primary" ? Colors.darkBlue80 : Colors.white
      };
    }

    &:active {
      background: ${
        buttonType === "primary" ? Colors.darkBlue : Colors.darkBlue40
      };
    }

    &:disabled {
      background: ${buttonType === "text" ? "transparent" : Colors.darkBlue20};
      border: none;
      opacity: 0.8;
      color: ${buttonType === "primary" ? Colors.white : Colors.darkBlue};
    }
  `
);

const CustomButton: React.FC<CustomButtonProps> = ({
  id,
  buttonType = "primary",
  submit,
  label,
  height,
  width,
  fontSize = "18px",
  margin,
  padding,
  borderRadius,
  onClick,
  disabled,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <StyledButton
      label="custom-button"
      id={id}
      type={submit ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      height={height}
      width={width}
      margin={margin}
      padding={padding}
      borderRadius={borderRadius}
      fontSize={fontSize}
      buttonType={buttonType}
      {...props}
    >
      {label}
    </StyledButton>
  );
};

export default CustomButton;
