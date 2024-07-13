"use client";
import React from "react";
import { Box, TextField } from "@mui/material";
import { Search } from "lucide-react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const StyledTextField = styled(TextField)`
  width: 100%;
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: transparent;
    }
    &:hover fieldset {
      border-color: transparent;
    }
    &.Mui-focused fieldset {
      border-color: transparent;
    }
  }
`;

const Header = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    const response = await axios.post(
      "/api/auth/logout",
      {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) router.push("/login");
  };

  const itemList = [
    { id: 1, label: "Profile", handleClick: () => {} },
    { id: 2, label: "Setting", handleClick: () => {} },
    {
      id: 3,
      label: "Logout",
      handleClick: handleLogOut,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 16px",
        borderRadius: "11px",
      }}
    >
      <Box display="flex" alignItems="center" width="40%">
        <Search size={24} />
        <StyledTextField name="search" placeholder="Search" />
      </Box>
      <Box
        position="relative"
        display="flex"
        justifyContent="end"
        height="48px"
        width="10%"
      >
        <Image
          layout="fill"
          src="/logo.png"
          alt="logo-wellness"
          objectFit="contain"
        />
      </Box>
    </Box>
  );
};

export default Header;
