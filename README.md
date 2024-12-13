# SkillMatch AI Platform 🚀

## Overview
SkillMatch AI is a modern recruitment and career development platform powered by artificial intelligence. It connects job seekers with employers while providing AI-driven interview preparation and skill assessment.




## 🌟 Key Features
- AI-powered interview preparation with real-time feedback
- Intelligent skill assessment and market demand analysis
- Smart job matching system
- Employer profile and job posting management
- Comprehensive job seeker profiles
- Real-time AI interview feedback using Claude

## 🛠️ Tech Stack
- **Frontend:** React.js, Material-UI, Framer Motion
- **Backend:** Node.js, Express
- **Database:** MySQL
- **AI Integration:** Claude
- **Authentication:** JWT (optional)

## 📋 Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- OpenAI API key

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/skillmatch-ai.git
cd skillmatch-ai
```

### 2. Database Setup
```bash
mysql -u root -p < database/schema.sql
```

### 3. Server Setup
```bash
cd server
npm install
```

### 4. Environment Configuration
Create `.env` in the server directory:
```plaintext
OPENAI_API_KEY=your_openai_api_key_here
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=skillmatch_ai
```

### 5. Client Setup
```bash
cd ../client
npm install
```

## 🎯 Running the Application

### Start the Server
```bash
cd server
node server.js
```

### Start the Client
```bash
cd client
npm start
```

Access the application at `http://localhost:3000`

## 🧪 Testing

### API Endpoints Testing

#### 1. Job Seeker Profile Creation
```bash
curl -X POST http://localhost:5000/api/jobseekers \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john@example.com",
  "skills": "JavaScript, React, Node.js",
  "experience": "3 years of web development"
}'
```

#### 2. AI Interview Feedback
```bash
curl -X POST http://localhost:5000/api/interview-feedback \
-H "Content-Type: application/json" \
-d '{
  "question": "Tell me about yourself",
  "answer": "I am a software developer with 3 years of experience..."
}'
```

## 📚 API Documentation

### Job Seekers
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/jobseekers` | POST | Create profile |
| `/api/jobseekers/:id` | GET | Get profile |

### Employers
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/employers` | POST | Create profile |
| `/api/employers/:id` | GET | Get profile |

### Jobs
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/jobs` | POST | Create job posting |
| `/api/jobs` | GET | List all jobs |
| `/api/jobs/:id` | GET | Get specific job |

## 🔧 Common Issues & Solutions

### OpenAI API Issues
**Problem:** OpenAI API key not working
**Solution:** Verify your API key in the `.env` file and check API quota

### Database Connection
**Problem:** Cannot connect to MySQL
**Solution:** Check MySQL service status and credentials in `.env`

## 🤝 Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- Claude API
- Material-UI team
- All contributors

## 📞 Contact & Support
- GitHub Issues: [Project Issues](https://github.com/yourusername/skillmatch-ai/issues)
- Email: tz2769@nyu.edu

---

Made with ❤️ by Tinghao Zhang (Gavin)






## 📸 Screenshots

<div align="center">
  <img src="./client/public/screenshot 5.png" alt="Welcome Page" width="800"/>
  <p><em>Welcome Dashboard - Platform features and getting started guide</em></p>
  
  <img src="./client/public/screenshot 0.png" alt="Available Jobs" width="800"/>
  <p><em>Available Jobs - Browse and apply to matching job opportunities</em></p>
  
  <img src="./client/public/screenshot 1.png" alt="Job Seeker Profile" width="800"/>
  <p><em>Job Seeker Profile Creation - Easy profile setup for job seekers</em></p>
  
  <img src="./client/public/screenshot 2.png" alt="Interview Practice" width="800"/>
  <p><em>AI-Powered Interview Practice - Get real-time feedback on your responses</em></p>
  
  <img src="./client/public/screenshot 3.png" alt="Platform Overview" width="800"/>
  <p><em>Platform Overview - Tech stack and architecture decisions</em></p>
  
  <img src="./client/public/screenshot 4.png" alt="Employer Profile" width="800"/>
  <p><em>Employer Profile Creation - Streamlined company profile setup</em></p>

</div>
