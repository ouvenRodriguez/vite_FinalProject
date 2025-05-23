import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Calendar from '../../Calendar/Calendar';
import dayjs from 'dayjs';
import { getAllProjects, updateProject, deleteProject } from '../../../Api/Project';
import './ListProject.css';


// Componente de barra de progreso con etiqueta
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

// Componente principal de progreso animado
function LinearWithValueLabel() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}

// Edit Modal Component
function EditModal({ open, handleClose, project, onSave }) {
  const [formData, setFormData] = React.useState({
    title: '',
    area: '',
    objectives: '',
    schedule: {
      startDate: null,
      endDate: null
    },
    budget: '',
    institution: '',
    teamMembers: [],
    observations: ''
  });

  React.useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        area: project.area || '',
        objectives: project.objectives || '',
        schedule: {
          startDate: project.dateStart ? dayjs(project.dateStart) : null,
          endDate: project.dateEnd ? dayjs(project.dateEnd) : null
        },
        budget: project.budget || '',
        institution: project.institution || '',
        teamMembers: project.team || [],
        observations: project.comments || ''
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (type, date) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [type]: date
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!formData.title || !formData.area || !formData.objectives || 
        !formData.schedule.startDate || !formData.schedule.endDate || 
        !formData.budget || !formData.institution) {
      setSnackbar({
        open: true,
        message: 'Por favor, completa todos los campos requeridos',
        severity: 'error'
      });
      return;
    }

    // Preparar los datos para enviar
    const projectData = {
      ...formData,
      schedule: {
        startDate: formData.schedule.startDate.toISOString(),
        endDate: formData.schedule.endDate.toISOString()
      }
    };

    await onSave(projectData);
    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      className="edit-modal"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Editar Proyecto
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          {/* Título y Área */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Título del Proyecto"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />

            <FormControl required fullWidth>
              <InputLabel id="area-label">Área</InputLabel>
              <Select
                labelId="area-label"
                name="area"
                value={formData.area}
                label="Área"
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="Tecnología">Tecnología</MenuItem>
                <MenuItem value="Ciencias">Ciencias</MenuItem>
                <MenuItem value="Matemáticas">Matemáticas</MenuItem>
                <MenuItem value="Humanidades">Humanidades</MenuItem>
                <MenuItem value="Artes">Artes</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Objetivos */}
          <TextField
            label="Objetivos"
            name="objectives"
            value={formData.objectives}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            required
            variant="outlined"
            InputProps={{
              sx: { borderRadius: 2 }
            }}
          />

          {/* Fechas, Presupuesto e Institución */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Calendar
                startDate={formData.schedule.startDate}
                endDate={formData.schedule.endDate}
                onDateChange={handleDateChange}
              />
            </Box>

            <FormControl required fullWidth>
              <InputLabel htmlFor="budget">Presupuesto</InputLabel>
              <OutlinedInput
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Presupuesto"
                type="number"
                sx={{ borderRadius: 2 }}
              />
            </FormControl>

            <FormControl required fullWidth>
              <InputLabel id="institution-label">Institución</InputLabel>
              <Select
                labelId="institution-label"
                name="institution"
                value={formData.institution}
                label="Institución"
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="Universidad Nacional">Universidad Nacional</MenuItem>
                <MenuItem value="Universidad de Antioquia">Universidad de Antioquia</MenuItem>
                <MenuItem value="Universidad de Medellín">Universidad de Medellín</MenuItem>
                <MenuItem value="Universidad EAFIT">Universidad EAFIT</MenuItem>
                <MenuItem value="Universidad Pontificia Bolivariana">Universidad Pontificia Bolivariana</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Observaciones */}
          <TextField
            label="Observaciones Adicionales"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            InputProps={{
              sx: { borderRadius: 2 }
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClose}
          variant="outlined"
          sx={{ 
            mr: 1,
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)'
            }
          }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          sx={{
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Info Modal Component
function InfoModal({ open, handleClose, project }) {
  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      className="info-modal"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Información Detallada del Proyecto
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Información General */}
          <div className="data-section">
            <Typography className="data-header">Información General</Typography>
            <div className="data-row">
              <Typography className="data-label">Título:</Typography>
              <Typography className="data-value">{project.title}</Typography>
            </div>
            <div className="data-row">
              <Typography className="data-label">Área:</Typography>
              <Typography className="data-value">{project.area}</Typography>
            </div>
            <div className="data-row">
              <Typography className="data-label">Institución:</Typography>
              <Typography className="data-value">{project.institution}</Typography>
            </div>
            <div className="data-row">
              <Typography className="data-label">Estado:</Typography>
              <Typography className="data-value">{project.status}</Typography>
            </div>
          </div>

          {/* Cronograma y Presupuesto */}
          <div className="data-section">
            <Typography className="data-header">Cronograma y Presupuesto</Typography>
            <div className="data-row">
              <Typography className="data-label">Fecha de Inicio:</Typography>
              <Typography className="data-value">
                {new Date(project.dateStart).toLocaleDateString()}
              </Typography>
            </div>
            <div className="data-row">
              <Typography className="data-label">Fecha de Finalización:</Typography>
              <Typography className="data-value">
                {new Date(project.dateEnd).toLocaleDateString()}
              </Typography>
            </div>
            <div className="data-row">
              <Typography className="data-label">Presupuesto:</Typography>
              <Typography className="data-value">
                ${project.budget.toLocaleString()}
              </Typography>
            </div>
          </div>

          {/* Objetivos */}
          <div className="data-section">
            <Typography className="data-header">Objetivos</Typography>
            <div className="data-row">
              <Typography className="data-value long-text">
                {project.objectives}
              </Typography>
            </div>
          </div>

          {/* Equipo */}
          <div className="data-section">
            <Typography className="data-header">Equipo</Typography>
            <div className="data-row">
              <div className="team-list">
                {Array.isArray(project.team) ? project.team.map((member, index) => (
                  <span key={index} className="team-member">
                    {member.name}
                  </span>
                )) : (
                  <Typography className="data-value">No hay miembros asignados</Typography>
                )}
              </div>
            </div>
          </div>

          {/* Observaciones */}
          {project.comments && (
            <div className="data-section">
              <Typography className="data-header">Observaciones</Typography>
              <div className="data-row">
                <Typography className="data-value long-text">
                  {project.comments}
                </Typography>
              </div>
            </div>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClose}
          variant="contained"
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Fila con expansión
function Row(props) {
  const { row, onEdit, onDelete } = props;
  const [open, setOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [infoModalOpen, setInfoModalOpen] = React.useState(false);

  // Función para formatear los nombres del equipo
  const formatTeamNames = (team) => {
    if (!Array.isArray(team)) return '';
    return team.map(member => member.name).join(', ');
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      await onDelete(row._id);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="center">{row.area}</TableCell>
        <TableCell align="center">{row.institution}</TableCell>
        <TableCell align="center">{`${new Date(row.dateStart).toLocaleDateString()} - ${new Date(row.dateEnd).toLocaleDateString()}`}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell>
          <div className="actions-container">
            <button className="edit-button" onClick={handleEdit}>
              <EditIcon className="edit-icon" />
            </button>
            <button className="delete-button" onClick={handleDelete}>
              <DeleteForeverIcon className="delete-icon" />
            </button>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" component="div">
                Detalles del Proyecto
              </Typography>

              <Table size="small" aria-label="project details">
                <TableHead>
                  <TableRow>
                    <TableCell>Objetivos</TableCell>
                    <TableCell>Equipo</TableCell>
                    <TableCell align="right">Presupuesto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.objectives}</TableCell>
                    <TableCell>{formatTeamNames(row.team)}</TableCell>
                    <TableCell align="right">{row.budget}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Box sx={{ mt: 2 }}>
                <div className="header-info">
                  <Typography variant="subtitle1" gutterBottom>
                    Progreso del Proyecto
                  </Typography>
                  <button 
                    className="button-info"
                    onClick={() => setInfoModalOpen(true)}
                  >
                    Más información
                  </button>
                </div>
                <LinearProgressWithLabel value={20} />
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <EditModal
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        project={row}
        onSave={(formData) => onEdit(formData)}
      />
      <InfoModal
        open={infoModalOpen}
        handleClose={() => setInfoModalOpen(false)}
        project={row}
      />
    </React.Fragment>
  );
}

// Componente principal
export default function ListProject() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const rowsPerPage = 5;

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      if (response.success && response.body.data) {
        setProjects(response.body.data);
      } else {
        setProjects([]);
        setSnackbar({
          open: true,
          message: 'Error al cargar los proyectos',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
      setSnackbar({
        open: true,
        message: 'Error al cargar los proyectos',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = async (projectId, formData) => {
    try {
      setSnackbar({
        open: true,
        message: 'Guardando cambios...',
        severity: 'info'
      });

      const response = await updateProject(projectId, formData);
      if (response.success) {
        await fetchProjects();
        setSnackbar({
          open: true,
          message: 'Proyecto actualizado correctamente',
          severity: 'success'
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Error al actualizar el proyecto',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error updating project:', error);
      setSnackbar({
        open: true,
        message: 'Error al actualizar el proyecto',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (projectId) => {
    try {
      setSnackbar({
        open: true,
        message: 'Eliminando proyecto...',
        severity: 'info'
      });

      const response = await deleteProject(projectId);
      if (response.success) {
        await fetchProjects();
        setSnackbar({
          open: true,
          message: 'Proyecto eliminado correctamente',
          severity: 'success'
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Error al eliminar el proyecto',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setSnackbar({
        open: true,
        message: 'Error al eliminar el proyecto',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Lógica de filtrado
  const filteredProjects = Array.isArray(projects) ? projects.filter(project =>
    project.title?.toLowerCase().includes(search.toLowerCase())
  ) : [];

  // Calcular el índice inicial y final para la paginación
  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Typography>Cargando proyectos...</Typography>
    </Box>;
  }

  return (
    <Box>
      <div className="table-header-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4" component="h1" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          Lista de Proyectos
        </Typography>
        <div className="search-wrapper">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar proyecto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>TÍTULO</TableCell>
              <TableCell align="center">Área</TableCell>
              <TableCell align="center">Institución</TableCell>
              <TableCell align="center">Cronograma</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProjects.map((project) => (
              <Row 
                key={project._id} 
                row={project} 
                onEdit={(formData) => handleEdit(project._id, formData)}
                onDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'right', mt: 3, mb: 2 }}>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredProjects.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
