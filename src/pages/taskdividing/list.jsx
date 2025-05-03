import React, { useEffect, useState } from 'react';
import { getFetcher, enpoints } from '../../utils/axios';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const TaskdiTable = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getFetcher(enpoints.task.viewAll); // Make sure this matches your actual endpoint key
        setTasks(data);
        console.log("sevii", data); // Debugging line to check fetched data
        
      } catch (error) {
        console.error("Error fetching Taskdi tasks:", error);
      }
    };

    fetchTasks();
  }, []);

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
        <Table sx={{ minWidth: 650 }} aria-label="Taskdi Table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title || 'Untitled'}</TableCell>
                <TableCell>
                  {task.description?.length > 50
                    ? `${task.description.substring(0, 50)}...`
                    : task.description || 'No description'}
                </TableCell>
                <TableCell>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell>{task.priority || 'Standard'}</TableCell>
                <TableCell>{task.status || 'todo'}</TableCell>
              </TableRow>
            ))}
            {tasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ThemeProvider>
  );
};

export default TaskdiTable;
