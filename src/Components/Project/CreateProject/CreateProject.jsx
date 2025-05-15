import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Calendar from "../../Calendar/Calendar";
import dayjs from "dayjs";
import "./CreateProject.css";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    area: "",
    objectives: "",
    schedule: {
      startDate: null,
      endDate: null
    },
    budget: "",
    institution: "",
    observations: "",
  });

  const [memberForm, setMemberForm] = useState({
    name: "",
    lastName: "",
    id: "",
    grade: "",
  });

  const [teamMembers, setTeamMembers] = useState([]);

  const [students, setStudents] = useState([
    { name: "Ana Torres", id: "1001", grade: "10°", avatar: "/static/images/avatar/1.jpg" },
    { name: "Luis Gómez", id: "1002", grade: "11°", avatar: "/static/images/avatar/2.jpg" },
    { name: "María López", id: "1003", grade: "9°", avatar: "/static/images/avatar/3.jpg" },
  ]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (type, date) => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [type]: date
      }
    }));
  };

  const handleMemberChange = (e) => {
    const { name, value } = e.target;
    setMemberForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addMemberToList = () => {
    if (
      memberForm.name &&
      memberForm.lastName &&
      memberForm.id &&
      memberForm.grade
    ) {
      setTeamMembers([...teamMembers, memberForm]);
      setMemberForm({ name: "", lastName: "", id: "", grade: "" });
    }
  };

  const removeMember = (index) => {
    const memberToReturn = teamMembers[index];
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
    setStudents([...students, memberToReturn]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      teamMembers,
    };
    console.log(finalData);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4" gutterBottom>
        Formulario
      </Typography>

      {/* Datos generales */}

      <div className="row-two">
        <TextField
          label="Título del Proyecto"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <FormControl required sx={{ flex: 1 }}>
          <InputLabel id="area-label">Área</InputLabel>
          <Select
            labelId="area-label"
            id="area-select"
            name="area"
            value={formData.area}
            label="Área"
            onChange={handleChange}
          >
            <MenuItem value="Tecnología">Tecnología</MenuItem>
            <MenuItem value="Ciencias">Ciencias</MenuItem>
            <MenuItem value="Matemáticas">Matemáticas</MenuItem>
            <MenuItem value="Humanidades">Humanidades</MenuItem>
            <MenuItem value="Artes">Artes</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="row-full">
        <TextField
          label="Objetivos"
          name="objectives"
          value={formData.objectives}
          onChange={handleChange}
          multiline
          rows={3}
          required
        />
      </div>

      <div className="row-three">
        {/* Cronograma usando el componente Calendar */}
        <Calendar
          startDate={formData.schedule.startDate}
          endDate={formData.schedule.endDate}
          onDateChange={handleDateChange}
        />

        <FormControl required sx={{ flex: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Presupuesto</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Presupuesto"
            type="number"
          />
        </FormControl>

        <FormControl required sx={{ flex: 1 }}>
          <InputLabel id="institution-label">Institución</InputLabel>
          <Select
            labelId="institution-label"
            id="institution-select"
            name="institution"
            value={formData.institution}
            label="Institución"
            onChange={handleChange}
          >
            <MenuItem value="Universidad Nacional">Universidad Nacional</MenuItem>
            <MenuItem value="Universidad de Antioquia">Universidad de Antioquia</MenuItem>
            <MenuItem value="Universidad de Medellín">Universidad de Medellín</MenuItem>
            <MenuItem value="Universidad EAFIT">Universidad EAFIT</MenuItem>
            <MenuItem value="Universidad Pontificia Bolivariana">Universidad Pontificia Bolivariana</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Box display="flex" mt={4} gap={4}>
        {/* Formulario de integrante */}
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6">Estudiantes</Typography>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mt: 2 }}>
            {students.map((student, idx) => (
              <React.Fragment key={student.id}>
                <ListItem
                  alignItems="flex-start"
                  className={selectedStudent === idx ? "student-selected" : "student-item"}
                  onClick={() => setSelectedStudent(idx)}
                  sx={{ cursor: 'pointer' }}
                >
                  <ListItemAvatar>
                    <Avatar alt={student.name} src={student.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={student.name}
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        className="student-secondary"
                        sx={{ display: 'inline' }}
                      >
                        ID: {student.id} | Grado: {student.grade}
                      </Typography>
                    }
                  />
                </ListItem>
                {idx < students.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Botón central */}
        <Box display="flex" alignItems="center">
          <IconButton
            color="primary"
            onClick={() => {
              if (selectedStudent !== null) {
                setTeamMembers([...teamMembers, students[selectedStudent]]);
                setStudents(students.filter((_, idx) => idx !== selectedStudent));
                setSelectedStudent(null);
              }
            }}
            disabled={selectedStudent === null}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>

        {/* Lista de integrantes */}
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6">Integrantes del Equipo</Typography>
          <List>
            {teamMembers.map((member, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" onClick={() => removeMember(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${member.name} ${member.lastName}`}
                  secondary={`ID: ${member.id} | Grado: ${member.grade}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Observaciones Adicionales"
        name="observations"
        value={formData.observations}
        onChange={handleChange}
        sx={{ mt: 4 }}
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        Crear Proyecto
      </Button>
    </Container>
  );
};

export default CreateProject;
