import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  Button,
  Box,
} from "@mui/material";

const ListThreads = () => {
  const [threads, setThreads] = useState([]);

  const getThreads = async () => {
    try {
      const response = await fetch("http://localhost:5000/threads");
      const jsonData = await response.json();
      setThreads(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getThreads();
  }, [threads]);

  return (
    <>
      <Box m={10} pt={3}>
        <Container maxWidth="xl">
          <Table
            aria-label="Threads Table"
            sx={{ width: 1000, margin: "auto" }}
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "yellow",
                  borderBottom: "2px solid black",
                  "& th": {
                    fontSize: "1.25rem",
                    color: "rgba(96, 96, 96)",
                  },
                }}
              >
                <TableCell>
                  <strong>Game Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Link</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {threads.map((thread) => (
                <TableRow
                  key={thread.thread_id}
                  sx={{
                    backgroundColor: "pink",
                    borderBottom: "2px solid black",
                    "& th": {
                      fontSize: "1.25rem",
                      color: "rgba(96, 96, 96)",
                    },
                  }}
                >
                  <TableCell>{thread.game_name}</TableCell>
                  <TableCell>{thread.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      href={"/Comments/" + thread.thread_id}
                    >
                      Open Thread
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      </Box>
    </>
  );
};

// eslint-disable-next-line
export default ListThreads;
