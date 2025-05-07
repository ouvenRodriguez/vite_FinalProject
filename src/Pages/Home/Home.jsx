import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ListaDocentes from '../../Components/ListaDocentes/ListaDocentes';
import './Home.css';


const drawerWidth = 260;

const sidebarSections = [
  {
    title: 'Usuarios',
    items: [
      { label: 'Docentes', icon: <HomeRepairServiceIcon /> },
      { label: 'Estudiantes', icon: <SchoolIcon /> },
    ],
  },
  {
    title: 'Proyectos',
    items: [
      { label: 'Mis proyectos', icon: <BarChartIcon /> },
      { label: 'Integrations', icon: <IntegrationInstructionsIcon /> },
    ],
  },
];

export default function Home() {
  const [selectedSection, setSelectedSection] = useState('Usuarios');
  return (
    <div id="home-background">
      <Box sx={{ display: 'flex', minHeight: '100vh', background: 'transparent' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
          <Toolbar>
            <img src="https://mui.com/static/logo.png" alt="Toolpad" style={{ height: 32, marginRight: 12 }} />
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
              Toolpad
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', height: '100%' }}>
            {sidebarSections.map((section) => (
              <React.Fragment key={section.title}>
                <Typography variant="caption" sx={{ pl: 2, pt: 2, color: '#888', fontWeight: 700 }}>
                  {section.title}
                </Typography>
                <List>
                  {section.items.map((item) => (
                    <ListItem disablePadding key={item.label}>
                      <ListItemButton
                        selected={selectedSection === item.label}
                        onClick={() => setSelectedSection(item.label)}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </React.Fragment>
            ))}
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, background: 'transparent', minHeight: '100vh' }}>
          <Toolbar />
          <div id="home-content">
            <Typography variant="subtitle2" sx={{ color: '#e0e0e0', fontWeight: 500 }}>
              {selectedSection}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 3 }}>
              {selectedSection}
            </Typography>

            {selectedSection === 'Docentes' && (
              <ListaDocentes />
            )}
            {/* Placeholders estilo skeleton */}
            <Box sx={{ mb: 2, height: 20, background: '#f0f0f0', borderRadius: 2, width: '80%', opacity: 0.18 }} />
            <Box sx={{ mb: 2, height: 20, background: '#f0f0f0', borderRadius: 2, width: '60%', opacity: 0.18 }} />
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Box sx={{ flex: 1, height: 100, background: '#f0f0f0', borderRadius: 2, opacity: 0.18 }} />
              <Box sx={{ flex: 1, height: 100, background: '#f0f0f0', borderRadius: 2, opacity: 0.18 }} />
            </Box>
            <Box sx={{ height: 180, background: '#f0f0f0', borderRadius: 2, mb: 2, opacity: 0.18 }} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1, height: 100, background: '#f0f0f0', borderRadius: 2, opacity: 0.18 }} />
              <Box sx={{ flex: 1, height: 100, background: '#f0f0f0', borderRadius: 2, opacity: 0.18 }} />
              <Box sx={{ flex: 1, height: 100, background: '#f0f0f0', borderRadius: 2, opacity: 0.18 }} />
            </Box>
          </div>
        </Box>
      </Box>
    </div>
  );
}
