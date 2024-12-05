import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Link,
  List,
  ListItem,
  ListItemText,
  Chip,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import GitHubIcon from '@mui/icons-material/GitHub';

function About() {
  const techStack = {
    Frontend: ['React.js', 'Material-UI', 'Framer Motion'],
    Backend: ['Node.js', 'Express'],
    Database: ['MySQL'],
    AI: ['OpenAI GPT-3.5'],
    Authentication: ['JWT'],
  };

  const designPrinciples = [
    {
      title: 'Modern UI/UX',
      description: 'Clean, intuitive interface with smooth animations and responsive design',
    },
    {
      title: 'Accessibility',
      description: 'WCAG compliant, keyboard navigation, screen reader support',
    },
    {
      title: 'Performance',
      description: 'Optimized loading, code splitting, and efficient state management',
    },
    {
      title: 'Scalability',
      description: 'Modular architecture, reusable components, and maintainable code structure',
    },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <GitHubIcon sx={{ mr: 2, fontSize: 30 }} />
          <Typography variant="h4" gutterBottom>
            SkillMatch AI Platform
          </Typography>
        </Box>
        
        <Link 
          href="https://github.com/gavinn212/AI-Hiring-Final-Project" 
          target="_blank"
          sx={{ display: 'inline-flex', alignItems: 'center', mb: 3 }}
        >
          View on GitHub <GitHubIcon sx={{ ml: 1 }} />
        </Link>

        <Typography variant="body1" paragraph>
          A modern recruitment and career development platform powered by artificial intelligence,
          connecting job seekers with employers while providing AI-driven interview preparation
          and skill assessment.
        </Typography>
      </Paper>

      {/* Tech Stack Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CodeIcon sx={{ mr: 2 }} />
          <Typography variant="h5">Tech Stack</Typography>
        </Box>
        <Grid container spacing={3}>
          {Object.entries(techStack).map(([category, technologies]) => (
            <Grid item xs={12} sm={6} md={4} key={category}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>{category}</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {technologies.map((tech) => (
                      <Chip 
                        key={tech} 
                        label={tech} 
                        variant="outlined" 
                        size="small"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Design Principles Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <BrushIcon sx={{ mr: 2 }} />
          <Typography variant="h5">Design Principles</Typography>
        </Box>
        <Grid container spacing={3}>
          {designPrinciples.map((principle) => (
            <Grid item xs={12} sm={6} key={principle.title}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {principle.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {principle.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Architecture Decisions Section */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ArchitectureIcon sx={{ mr: 2 }} />
          <Typography variant="h5">Key Architecture Decisions</Typography>
        </Box>
        <List>
          <ListItem>
            <ListItemText 
              primary="Material-UI" 
              secondary="Chosen for its comprehensive component library, customization options, and built-in responsiveness"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="React.js" 
              secondary="Selected for its component-based architecture, virtual DOM, and extensive ecosystem"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="MySQL" 
              secondary="Chosen for its reliability, ACID compliance, and robust relationship management"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="OpenAI Integration" 
              secondary="Implemented for advanced natural language processing and AI-driven features"
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}

export default About; 