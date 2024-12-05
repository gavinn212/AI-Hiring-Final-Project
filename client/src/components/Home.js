import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import QuizIcon from '@mui/icons-material/Quiz';
import HelpIcon from '@mui/icons-material/Help';

function Home() {
  const features = [
    {
      title: "AI-Powered Interview Practice",
      icon: <SmartToyIcon fontSize="large" color="primary" />,
      description: "Get real-time feedback on your interview answers from our AI system",
      steps: [
        "Select 'Interview Prep' from the left menu",
        "Choose a common interview question",
        "Record your answer",
        "Receive instant AI feedback and suggestions"
      ]
    },
    {
      title: "Smart Job Matching",
      icon: <PersonSearchIcon fontSize="large" color="primary" />,
      description: "Find jobs that match your skills and experience",
      steps: [
        "Create your profile in 'For Job Seekers'",
        "Enter your skills and experience",
        "Browse AI-recommended jobs",
        "Apply with one click"
      ]
    },
    {
      title: "Skill Assessment",
      icon: <AssessmentIcon fontSize="large" color="primary" />,
      description: "Understand your market value and skill gaps",
      steps: [
        "Access the skill assessment tool",
        "Complete the evaluation",
        "View your market position",
        "Get personalized learning recommendations"
      ]
    }
  ];

  return (
    <Container maxWidth="lg">
      {/* Welcome Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <RocketLaunchIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" color="primary">
            Welcome to SkillMatch AI
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" paragraph>
          Your AI-powered career development platform
        </Typography>
        <Typography variant="body1" paragraph>
          SkillMatch AI combines artificial intelligence with career development to help you:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <SmartToyIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Practice interviews with AI feedback" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <WorkIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Find jobs matching your skills" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Assess your market value" />
          </ListItem>
        </List>
      </Paper>

      {/* Getting Started Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <EmojiObjectsIcon sx={{ fontSize: 30, mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" color="primary">
            Getting Started
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TouchAppIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Step 1</Typography>
                </Box>
                <Typography variant="body1">
                  Create your profile using the "For Job Seekers" option in the left menu.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <QuizIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Step 2</Typography>
                </Box>
                <Typography variant="body1">
                  Practice interviews or assess your skills using our AI tools.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Step 3</Typography>
                </Box>
                <Typography variant="body1">
                  Browse and apply to matched jobs based on your profile.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Features Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <StarIcon sx={{ fontSize: 30, mr: 1, color: 'primary.main' }} />
        <Typography variant="h5" color="primary">
          Key Features
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {feature.icon}
                  <Typography variant="h6" color="primary" sx={{ ml: 1 }}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  {feature.description}
                </Typography>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  How to use:
                </Typography>
                <List dense>
                  {feature.steps.map((step, stepIndex) => (
                    <ListItem key={stepIndex}>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={step}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Help Section */}
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <HelpIcon sx={{ fontSize: 30, mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" color="primary">
            Need Help?
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          Use the chat widget in the bottom right corner for:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <SupportAgentIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Technical support" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LightbulbIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Feature guidance" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <QuizIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="General questions" />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}

export default Home;