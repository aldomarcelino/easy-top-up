import React, { useState, MouseEvent } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import styled from "@emotion/styled";
import { Colors } from "styles/theme/color";
import { LogOut } from "lucide-react";

interface StyledMenuProps {
  minwidth: string;
  width: string;
}

const StyledMenu = React.memo(
  styled(Menu)<StyledMenuProps>(
    ({ minwidth, width }) => `
      & .MuiPaper-root {
        box-shadow: ${Colors.shadowLight};
        background-color: ${Colors.white};
        border-radius: 13px;
        min-width: ${minwidth};
        width: ${width};
      }

      & .MuiMenu-list {
        padding: 0;
      }

      & .MuiMenuItem-root {
        padding: 16px 24px;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        display: flex;
      }

      & ::-webkit-scrollbar {
        width: 6px;
      }
      & ::-webkit-scrollbar-thumb {
        background-color: #3E95CC;
        border-radius: 20px;
      }
    `
  )
);

interface MenuItem {
  id: number;
  label: string;
  handleClick: () => void;
}

interface CustomMenuProps {
  buttonBase: React.ReactNode;
  menuItems: MenuItem[];
  width?: string;
}

const CustomMenu: React.FC<CustomMenuProps> = ({
  buttonBase,
  menuItems,
  width = "160px",
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box onClick={handleClick}>{buttonBase}</Box>

      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        minwidth={width}
        width={width}
        elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={`${index}-item`}
            onClick={() => {
              setAnchorEl(null);
              item.handleClick();
            }}
            sx={{
              color: item.label === "Logout" ? Colors.red100 : Colors.darkGrey,
              "&:hover": {
                color:
                  item.label === "Logout" ? Colors.red100 : Colors.darkBlue,
              },
            }}
          >
            {item.label === "Logout" && (
              <LogOut style={{ marginRight: "5px" }} color={Colors.red100} />
            )}
            {item.label}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default CustomMenu;
