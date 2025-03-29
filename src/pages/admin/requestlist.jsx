import React, { useState } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TaskReassignList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "John Doe",
      mentalStatus: "Stressed",
      recommendation: "Reduce workload",
      date: "2025-03-28",
    },
    {
      id: 2,
      name: "Jane Smith",
      mentalStatus: "Neutral",
      recommendation: "No change required",
      date: "2025-03-27",
    },
    {
      id: 3,
      name: "Alice Brown",
      mentalStatus: "Overwhelmed",
      recommendation: "Reassign some tasks",
      date: "2025-03-26",
    },
  ]);

  // Handle search filter
  const filteredRequests = requests
    .filter((request) =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (latest first)

  // Handle delete request
  const handleDelete = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Reassign Task Requests
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary">Add New</Button>
      </Stack>
      <Paper sx={{ borderRadius: 2, boxShadow: 3, maxHeight: "60vh", overflowY: "auto" }}>
        <List>
          {filteredRequests.map((request) => (
            <ListItem
              key={request.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
              }}
            >
              <ListItemText
                primary={request.name}
                secondary={`${request.mentalStatus} - ${request.recommendation}`}
              />
              <Box>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(request.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default TaskReassignList;
