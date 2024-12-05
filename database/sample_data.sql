-- Insert sample employers
INSERT INTO employers (company_name, email, industry) VALUES
('Tech Innovators Inc.', 'careers@techinnovators.com', 'Technology'),
('Global Solutions Ltd.', 'hr@globalsolutions.com', 'Consulting'),
('DataDrive Analytics', 'jobs@datadrive.com', 'Data Science'),
('WebFront Systems', 'talent@webfront.com', 'Web Development'),
('AI Future Corp', 'recruiting@aifuture.com', 'Artificial Intelligence');

-- Insert sample jobs
INSERT INTO jobs (employer_id, title, description, required_skills, created_at) VALUES
(1, 'Senior Full Stack Developer', 
'We are looking for an experienced Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using React and Node.js.

Key Responsibilities:
- Develop scalable web applications
- Collaborate with cross-functional teams
- Implement best practices and coding standards
- Mentor junior developers

Requirements:
- 5+ years of experience
- Strong knowledge of JavaScript ecosystem
- Experience with cloud platforms (AWS/Azure)',
'React, Node.js, TypeScript, AWS, MongoDB', 
CURRENT_TIMESTAMP),

(1, 'DevOps Engineer', 
'Seeking a DevOps Engineer to streamline our deployment processes and maintain cloud infrastructure.

Responsibilities:
- Manage CI/CD pipelines
- Optimize cloud resources
- Implement security best practices
- Automate deployment processes',
'Docker, Kubernetes, AWS, Jenkins, Terraform',
CURRENT_TIMESTAMP),

(2, 'Project Manager', 
'Looking for an experienced Project Manager to lead complex software development projects.

Key Areas:
- Agile project management
- Resource allocation
- Risk management
- Stakeholder communication',
'Agile, Scrum, JIRA, MS Project, Communication',
CURRENT_TIMESTAMP),

(3, 'Data Scientist', 
'Join our data science team to build predictive models and analyze complex datasets.

Role Overview:
- Develop machine learning models
- Perform statistical analysis
- Create data visualizations
- Present findings to stakeholders',
'Python, R, Machine Learning, SQL, Tableau',
CURRENT_TIMESTAMP),

(4, 'UX/UI Designer', 
'Creative UX/UI Designer needed to design intuitive and beautiful user interfaces.

What You''ll Do:
- Create user-centered designs
- Develop wireframes and prototypes
- Conduct user research
- Collaborate with development team',
'Figma, Adobe XD, HTML/CSS, User Research',
CURRENT_TIMESTAMP),

(5, 'AI Engineer', 
'We''re seeking an AI Engineer to develop cutting-edge machine learning solutions.

Project Focus:
- Natural Language Processing
- Computer Vision
- Deep Learning Models
- Model Deployment and Scaling',
'Python, TensorFlow, PyTorch, NLP, Computer Vision',
CURRENT_TIMESTAMP),

(3, 'Business Intelligence Analyst', 
'BI Analyst needed to transform data into actionable insights.

Responsibilities:
- Create dashboards and reports
- Analyze business metrics
- Optimize data collection
- Support decision-making',
'SQL, Power BI, Excel, Data Visualization',
CURRENT_TIMESTAMP),

(2, 'Cloud Solutions Architect', 
'Experienced Cloud Architect needed to design and implement cloud-native solutions.

Key Responsibilities:
- Architecture design
- Cloud migration
- Security implementation
- Performance optimization',
'AWS, Azure, Cloud Architecture, Microservices',
CURRENT_TIMESTAMP),

(4, 'Frontend Developer', 
'Looking for a Frontend Developer to create responsive and interactive web applications.

What You''ll Work On:
- User interface development
- Performance optimization
- Component libraries
- Cross-browser compatibility',
'React, JavaScript, HTML5, CSS3, Redux',
CURRENT_TIMESTAMP),

(5, 'Machine Learning Engineer', 
'ML Engineer needed to develop and deploy machine learning models.

Role Details:
- Model development
- Feature engineering
- Model optimization
- Production deployment',
'Python, Scikit-learn, Deep Learning, MLOps',
CURRENT_TIMESTAMP);

-- Insert sample job seekers
INSERT INTO job_seekers (name, email, skills, experience) VALUES
('Sarah Johnson', 'sarah.j@email.com', 'React, Node.js, TypeScript', '4 years of full-stack development experience'),
('Michael Chen', 'michael.c@email.com', 'Python, Machine Learning, SQL', '3 years in data science and analytics'),
('Emily Brown', 'emily.b@email.com', 'Project Management, Agile, Scrum', '6 years of IT project management');

-- Insert sample applications
INSERT INTO applications (job_id, job_seeker_id, status) VALUES
(1, 1, 'pending'),
(3, 3, 'pending'),
(4, 2, 'pending'); 