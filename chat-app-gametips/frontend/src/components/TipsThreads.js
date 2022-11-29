import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableContainer,
  Paper,
  Button,
  TablePagination,
  Box,
} from "@mui/material";

const TipsThreads = () => {
  const [threads, setThreads] = useState([]);

  const getThreads = async () => {
    try {
      const response = await fetch("http://localhost:5000/tipthreads");
      const jsonData = await response.json();
      setThreads(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getThreads();
  }, [threads]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setrowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Box sx={{ paddingBottom: 25, paddingLeft: 30 }}>
        <TableContainer
          component={Paper}
          sx={{
            border: 2,
            borderRadius: 15,
            margin: "10px 10px",
            maxWidth: 950,
          }}
          maxWidth="xl"
        >
          <Table aria-label="Threads Table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "skyblue",
                    color: "black",
                    paddingRight: 20,
                    fontSize: 25,
                  }}
                >
                  <strong>Tip Name</strong>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "skyblue",
                    color: "black",
                    fontSize: 25,
                  }}
                >
                  <strong>Link</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {threads
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((thread) => (
                  <TableRow
                    key={thread.thread_id}
                    sx={{
                      backgroundColor: "#DCDCDC",
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "maroon",
                        paddingRight: 20,
                        borderBlockColor: "black",
                      }}
                    >
                      {thread.game_name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBlockColor: "black",
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{ backgroundColor: "#98FB98" }}
                        href={"/TipsComments/" + thread.thread_id}
                      >
                        Open Thread
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={threads.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TipsThreads;
