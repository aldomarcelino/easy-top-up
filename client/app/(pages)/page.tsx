"use client";
import React, { useEffect, useState } from "react";
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
import TimeFormatter from "utils/time-formatter";
import { EllipsisVertical } from "lucide-react";
import CheckSession from "services/check-session";
import { CurrencyFormatter } from "utils/crrency-formatter";
import { allBank } from "../../constants";
import { useSearchParams } from "next/navigation";

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
  CheckSession();
  // Initialize State
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const search = searchParams.get("runNum");

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
      align: "center",
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
  const { data, mutate } = useSWR(() => `/api/history?page=${currentPage}`);

  useEffect(() => {
    if (search) {
      mutate();
    }
  }, [search]);

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
                {[...Array(7)].map((_, id) => (
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
                        paddingY: "3px",
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
                    <TableCell align="left" sx={{ fontWeight: 600 }}>
                      {CurrencyFormatter(row.amount || 0)}
                    </TableCell>
                    <TableCell align="left">{row.note}</TableCell>
                    <TableCell align="left">
                      <Box
                        border={`1px solid ${Colors.blue}`}
                        textAlign="center"
                        paddingY="3px"
                        borderRadius="7px"
                        color={Colors.blue}
                      >
                        {allBank[row.method]?.name}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <img
                        alt={row.method}
                        src={allBank[row.method]?.icon || ""}
                        style={{
                          background: Colors.white,
                          height: "48px",
                          width: "48px",
                          objectFit: "contain",
                        }}
                      />
                    </TableCell>
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
        {data?.history.length ? (
          <Box display="flex" justifyContent="end" margin="32px 0px 48px">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageLimit={Math.ceil(data.count / 7)}
            />
          </Box>
        ) : (
          ""
        )}
        {/* END - Pagination */}
      </Box>
    </>
  );
};

export default Dashboard;
