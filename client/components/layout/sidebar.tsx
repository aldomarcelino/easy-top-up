"use client";
import { Box, Skeleton, Typography } from "@mui/material";
import { Colors } from "styles/theme/color";
import { Image } from "components/elements";
import {
  CircleDollarSign,
  Cog,
  Power,
  ScanLine,
  SquareStack,
} from "lucide-react";
import styled from "@emotion/styled";
import useSWR from "swr";
import { useState } from "react";
import TopupModal from "./modal/event-creation-modal";
import { CurrencyFormatter, formatNumber } from "utils/crrency-formatter";

const SidebarItem = styled(Box)`
  margin-top: 9px;
  dispaly: flex;
  align-items: center;
  padding: 5px 19px;
  border-radius: 8px;
  margin-right: 24px;
  cursor: pointer;
  justify-content: space-between;
  color: ${Colors.darkGrey};
  &:hover {
    background-color: ${Colors.gery20};
  }
`;

const Sidebar = () => {
  // Initialize State
  const [showTopupModal, setShowTopupModal] = useState(false);

  // Fetch Data
  const { data, mutate } = useSWR(() => "/api/history/total-amount");

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          background: Colors.white,
          boxShadow: Colors.shadowLight,
          zIndex: 10,
          paddingTop: "41px",
          paddingLeft: "35px",
          width: "280px",
          borderTopRightRadius: "40px",
        }}
      >
        <Box display="flex" alignItems="center" gap="7px">
          <Image
            alt="profile"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width="67px"
            height="67px"
            border={`1px solid ${Colors.lightGrey}`}
            borderRadius="67px"
            objectFit="cover"
            overflow="hidden"
          />
          <Typography
            fontSize={18}
            fontWeight={700}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            Aldo Marcelino.
          </Typography>
        </Box>
        <Box
          display="flex"
          gap="3px"
          alignItems="center"
          color={Colors.darkGrey}
          marginTop="32px"
        >
          <CircleDollarSign size={17} />
          <Typography>Balance</Typography>
        </Box>
        {data ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontSize={29} fontWeight={600} color={Colors.darkBlue}>
              {data.totalAmount > 99000000
                ? formatNumber(data?.totalAmount)
                : CurrencyFormatter(data?.totalAmount)}
            </Typography>
            <ScanLine
              style={{ marginRight: "18px", cursor: "pointer" }}
              onClick={() => setShowTopupModal(true)}
            />
          </Box>
        ) : (
          <Skeleton
            variant="rectangular"
            height={38}
            sx={{ marginRight: "24px" }}
          />
        )}
        <Box
          sx={{
            marginTop: "67px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "19px",
            gap: "7px",
            color: Colors.blue,
            background: Colors.gery20,
            marginRight: "24px",
            paddingY: "7px",
            borderRadius: "7px",
            marginBottom: "370px",
          }}
        >
          <SquareStack />
          <Typography>History</Typography>
        </Box>
        <SidebarItem>
          <Box
            display="flex"
            alignItems="center"
            gap="9px"
            sx={{
              "&:hover": {
                color: Colors.darkBlue,
              },
            }}
          >
            <Cog />
            <Typography>Seting</Typography>
          </Box>
        </SidebarItem>
        <SidebarItem>
          <Box
            display="flex"
            alignItems="center"
            gap="9px"
            sx={{
              "&:hover": {
                color: Colors.red100,
              },
            }}
          >
            <Power />
            <Typography>Log Out</Typography>
          </Box>
        </SidebarItem>
      </Box>

      {/* Top Up Modal */}

      <TopupModal
        open={showTopupModal}
        refetch={mutate}
        onClose={() => setShowTopupModal(false)}
      />
    </>
  );
};

export default Sidebar;
