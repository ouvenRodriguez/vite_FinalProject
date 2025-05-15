import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ListaDocentes from '../../Components/ListaDocentes/ListaDocentes';
import CreateProject from '../../Components/Project/CreateProject/CreateProject';
import ListProject from '../../Components/Project/ListProject/ListProject';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import './Home.css';


const drawerWidth = 260;

const sidebarSections = [
  {
    title: 'Usuarios',
    items: [
      {
        label: 'Docentes',
        id: 'docentes',
        icon: <HomeRepairServiceIcon />,
        children: [
          { label: 'Agregar', id: 'docentes / agregar', icon: <CreateNewFolderIcon /> },
          { label: 'Todos', id: 'docentes / todos', icon: <ListAltIcon /> }
        ]
      },
      {
        label: 'Estudiantes',
        id: 'estudiantes',
        icon: <PeopleIcon />,
        children: [
          { label: 'Agregar', id: 'estudiantes / agregar', icon: <CreateNewFolderIcon /> },
          { label: 'Todos', id: 'estudiantes / todos', icon: <ListAltIcon /> }
        ]
      }
    ]
  },
  {
    title: 'Proyectos',
    items: [
      {
        label: 'Proyectos',
        id: 'proyectos',
        icon: <BarChartIcon />,
        children: [
          { label: 'Crear', id: 'proyectos / crear', icon: <CreateNewFolderIcon /> },
          { label: 'Todos', id: 'proyectos / todos', icon: <ListAltIcon /> }
        ]
      },
    ],
  },
];

export default function Home() {
  const [selectedSection, setSelectedSection] = useState('Usuarios');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [value, setValue] = React.useState([null, null]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleItemExpand = (itemLabel) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemLabel]: !prev[itemLabel]
    }));
  };

  const drawer = (
    <Box sx={{ overflow: 'auto', height: '100%' }}>
      {sidebarSections.map((section) => (
        <React.Fragment key={section.title}>
          <Typography variant="caption" sx={{ pl: 2, pt: 2, color: '#888', fontWeight: 700 }}>
            {section.title}
          </Typography>
          <List>
            {section.items.map((item) => (
              item.children ? (
                <React.Fragment key={item.label}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedSection === item.id}
                      onClick={() => handleItemExpand(item.label)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                      {expandedItems[item.label] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                  </ListItem>
                  {expandedItems[item.label] && (
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <ListItem disablePadding key={child.label} sx={{ pl: 4 }}>
                          <ListItemButton
                            selected={selectedSection === child.id}
                            onClick={() => {
                              setSelectedSection(child.id);
                              setMobileOpen(false);
                            }}
                          >
                            <ListItemIcon>{child.icon}</ListItemIcon>
                            <ListItemText primary={child.label} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </React.Fragment>
              ) : (
                <ListItem disablePadding key={item.label}>
                  <ListItemButton
                    selected={selectedSection === item.id}
                    onClick={() => {
                      setSelectedSection(item.id);
                      setMobileOpen(false);
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              )
            ))}
          </List>
        </React.Fragment>
      ))}
    </Box>
  );

  return (
    <div id="home-background">
      <Box sx={{ display: 'flex', minHeight: '100vh', background: 'transparent' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            height: '64px',
            minHeight: '64px',
            maxHeight: '64px',
            justifyContent: 'center'
          }}
        >
          <Toolbar sx={{ minHeight: '64px', height: '64px', px: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <img src="https://mui.com/static/logo.png" alt="Toolpad" style={{ height: 32, marginRight: 12 }} />
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
              Toolpad
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                top: '64px',
                height: 'calc(100% - 64px)'
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                top: '64px',
                height: 'calc(100% - 64px)'
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            background: 'transparent',
            minHeight: '100vh',
            width: { sm: `calc(100% - ${drawerWidth}px)` },

          }}
        >
          <div id="home-content">
            <div className="header-form">
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Panel de Administración
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#666', mt: '4px' }}>
                Sección actual: {selectedSection}
              </Typography>
            </div>

            <Box sx={{ mt: 2 }}>
              {selectedSection === 'docentes / todos' && <ListaDocentes />}
              {selectedSection === 'proyectos / crear' && <CreateProject />}
              {selectedSection === 'proyectos / todos' && <ListProject />}
            </Box>


          </div>

        </Box>
      </Box>
    </div>
  );
}
