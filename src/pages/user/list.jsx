import axios from "axios"; 
import React, { useEffect, useState } from "react";
import { getFetcher, enpoints } from "../../utils/axios"; // Assuming axios functions are in a file named axios.js

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getFastAPIParamFetcher, fastApi } from "../../utils/pythonAPi";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState([]);
  const [test, setTest] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [message, setMessage] = useState("");
  // Light theme configuration for MUI
  const theme = createTheme({
    palette: {
      mode: "light", // Set light theme
    },
  });

  // Fetching data from the API using the getFetcher function
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getFetcher(enpoints.user.viewAll); // Use API
        setUsers(data); // Update state with fetched users
        console.log("gtr", data); // Log actual data, not setUsers function
        console.log("supra");
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // useEffect(() => {
  //   const source = new EventSource("http://localhost:8000/stream_status");
  
  //   source.onmessage = (event) => {
  //     const newStatus = event.data; // Remove parseInt — it's a string like "Happy"
  //     console.log("🔥 New Emotion Status:", newStatus);
  //     setStatus(newStatus);
  //   };
  
  //   source.onerror = (err) => {
  //     console.error("❌ SSE connection error:", err);
  //     source.close();
  //   };
  
  //   return () => {
  //     source.close(); // Clean up on unmount
  //   };
  // }, []);
  

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await axios.get("http://localhost:8000/test");
        setMessage(res.data.test);
        console.log("✅ API Response:", res.data);
      } catch (err) {
        console.error("❌ Error fetching /test API:", err);
      }
    };

    fetchTest();
  }, []);

  // Fetching data from the API using the getFetcher function
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const data = await getFastAPIParamFetcher(fastApi.test); // Use API
        setTest(data); // Update state with fetched users
        console.log("suppppppppppp", data); // Log actual data, not setUsers function
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchTest();
  }, []);

  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              {/* <TableCell>First Name</TableCell> */}
              <TableCell>Country</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Development</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {user.firstName} {user.secondName}
                  </TableCell>
                  {/* <TableCell>{user.firstName}</TableCell> */}
                  <TableCell>{user.country}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.devType}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

<h2>Detected Emotion Code: {status}</h2>
<div style={{ padding: 20 }}>
      <h2>🔥 FastAPI /test API says:</h2>
      <p>{message}</p>
    </div>
    </ThemeProvider>
  );
};

export default UserTable;
