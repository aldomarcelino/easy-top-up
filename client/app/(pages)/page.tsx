"use client";
import React, { useState } from "react";
import useSWR from "swr";
import {
  Box,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Skeleton,
} from "@mui/material";
import { Colors } from "styles/theme/color";
import { Pagination } from "components/elements";
import EventModal from "components/layout/modal/event-creation-modal";
import TimeFormatter from "utils/time-formatter";
import VerificationModal from "components/layout/modal/verify-action-modal";
import { EllipsisVertical } from "lucide-react";
import CheckSession from "services/check-session";

interface ListHead {
  id: number;
  title: string;
  align: "left" | "right" | "center" | "inherit" | "justify";
}

interface dataType {
  _id: string;
  createdAt: Date;
  amount: number;
  note: string;
  method: string;
}

const Dashboard: React.FC = () => {
  const { role } = CheckSession();
  // Initialize State
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [currentId, setCurrentId] = useState("");

  const listHead: ListHead[] = [
    {
      id: 1,
      title: "Transaction Date",
      align: "left",
    },
    {
      id: 2,
      title: "Amount",
      align: "left",
    },
    {
      id: 3,
      title: "Note",
      align: "left",
    },
    {
      id: 4,
      title: "Method",
      align: "left",
    },
    {
      id: 5,
      title: "",
      align: "center",
    },
    {
      id: 6,
      title: "",
      align: "right",
    },
  ];

  // Fetch Data
  const { data, mutate } = useSWR(() => "/api/history");

  // Handle show button
  const handleShowButton = (type: string, id: string) => {
    let bgColor = Colors.gery100;
    const value = type.toLocaleLowerCase();
    switch (value) {
      case "reject":
        bgColor = Colors.red100;
        break;

      case "approve":
        bgColor = Colors.green100;
        break;

      default:
        bgColor = Colors.gery100;
        break;
    }

    return (
      <Box
        display="flex"
        padding="8px"
        justifyContent="center"
        borderRadius="9px"
        width="100%"
        sx={{
          backgroundColor: bgColor,
          color: Colors.white,
          cursor: "pointer",
          "&:hover": {
            opacity: 0.9,
          },
        }}
        onClick={() => {
          setShowVerifyModal(true);
          setActionType(type);
          setCurrentId(id);
        }}
      >
        {type}
      </Box>
    );
  };

  const handleShowStatus = (status: string) => {
    let color = Colors.green100;
    if (status === "Rejected") color = Colors.red100;
    return (
      <Typography variant="body2" color={color} textAlign="center">
        {status}
      </Typography>
    );
  };

  return (
    <>
      <Box marginTop="24px">
        <Table sx={{ borderCollapse: "separate", borderSpacing: "0 21px" }}>
          <TableHead sx={{ position: "relative" }}>
            <TableRow>
              {listHead.map((item) => (
                <TableCell
                  align={item.align}
                  key={`${item.id}-heading`}
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: 600,
                    fontSize: 16,
                    color: Colors.darkGrey,
                  }}
                >
                  {item.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!data ? (
              <>
                {[...Array(5)].map((_, id) => (
                  <TableRow
                    key={`${id}-TableRow`}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: "white",
                      transition: "0.5s all ease",
                      "&:hover": {
                        boxShadow: Colors.shadow,
                      },
                      "& td, & th": {
                        border: 0,
                        overflow: "hidden",
                      },
                    }}
                  >
                    {[...Array(6)].map((_, idx) => (
                      <TableCell key={`${idx}-TableCell`}>
                        <Skeleton
                          data-testid="skeleton"
                          height="21px"
                          variant="rectangular"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : data?.history.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography margin="100px 0px" textAlign="center">
                    No data
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {data?.history.map((row: dataType, idx: number) => (
                  <TableRow
                    key={`${idx}-histo`}
                    sx={{
                      backgroundColor: "white",
                      transition: "0.5s all ease",
                      "&:hover": {
                        boxShadow: Colors.shadow,
                      },
                      "& td, & th": {
                        border: 0,
                        overflow: "hidden",
                      },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        borderTopLeftRadius: "9px",
                        borderBottomLeftRadius: "9px",
                      }}
                    >
                      {TimeFormatter(row.createdAt)}
                    </TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                    <TableCell align="left">{row.note}</TableCell>
                    <TableCell align="left">{row.method}</TableCell>
                    <TableCell align="left">{row.method}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        borderTopRightRadius: "9px",
                        borderBottomRightRadius: "9px",
                      }}
                    >
                      <EllipsisVertical />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>

        {/* START - Pagination */}
        {data?.history.length && (
          <Box display="flex" justifyContent="end" margin="32px 0px 48px">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageLimit={Math.ceil(data.count / 10)}
            />
          </Box>
        )}
        {/* END - Pagination */}
      </Box>

      {/* START - Event Modal Creation */}
      <EventModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        refetch={mutate}
      />
      {/* END - Event Modal Creation */}

      {/* START - Verification Modal */}
      <VerificationModal
        open={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        currentId={currentId}
        actionType={actionType}
        refetch={mutate}
      />
      {/* END -Verification Modal */}
    </>
  );
};

export default Dashboard;
