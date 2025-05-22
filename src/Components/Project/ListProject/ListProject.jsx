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

// Datos de ejemplo
function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

// Fila con expansión
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
          {row.name}
        </TableCell>
        <TableCell align="center">{row.calories}</TableCell>
        <TableCell align="center">{row.fat}</TableCell>
        <TableCell align="center">{row.carbs}</TableCell>
        <TableCell align="center">{row.protein}</TableCell>
        <TableCell>
          <div className="actions-container">
            <button className="edit-button">
              <EditIcon className="edit-icon" />
            </button>
            <button className="delete-button">
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
                Historial
              </Typography>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell align="right">Avance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell>{historyRow.date}</TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Componente de barra de progreso */}
              <Box sx={{ mt: 2 }}>
                <div className="header-info">
                  <Typography variant="subtitle1" gutterBottom>
                    Progreso del Proyecto
                  </Typography>
                  <button className="button-info">Más información</button>
                </div>
                <LinearWithValueLabel />
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Datos de ejemplo
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),

];

// Componente principal
export default function ListProject() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const rowsPerPage = 5;

  // Lógica básica: filtrar solo por coincidencia directa
  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calcular el índice inicial y final para la paginación
  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
            {currentRows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'right', mt: 3, mb: 2 }}>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredRows.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </Box>
    </Box>
  );
}
