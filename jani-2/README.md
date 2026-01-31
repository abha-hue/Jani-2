# 🌿 JANI - Community Pollution Reporting Platform

JANI is a modern, community-driven web application that empowers citizens to identify, report, and track pollution in their neighborhoods. Built with React and powered by real-time data, JANI bridges the gap between environmental awareness and actionable change.

![JANI Banner](https://img.shields.io/badge/JANI-Pollution%20Tracker-85A947?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

- **📸 Quick Reporting** - Snap a photo, add location, and submit pollution reports instantly
- **🗺️ Live Map Visualization** - View all community reports on an interactive map
- **🔐 Secure Authentication** - Firebase-powered user authentication
- **💾 Real-time Database** - Supabase backend for instant data synchronization
- **📱 Responsive Design** - Beautiful UI that works on all devices
- **🎨 Modern Animations** - Smooth, polished interactions using Framer Motion
- **🌍 Geolocation** - Automatic location tracking for reports
- **📊 Community Insights** - Track pollution trends in your area

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Framer Motion** - Advanced animations
- **React Router** - Client-side routing
- **Leaflet** - Interactive maps

### Backend & Services
- **Supabase** - Database and storage
- **Firebase** - Authentication and analytics
- **Geolocation API** - Location services

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Advanced animations and glassmorphism effects

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **Docker** (optional, for containerized deployment)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/jani.git
cd jani/jani-2
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables Setup
Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_firebase_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id_here
```

📚 For detailed environment setup instructions, see [ENV_SETUP.md](./ENV_SETUP.md)

### 4. Run the Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🐳 Docker Deployment

### Build the Docker Image
```bash
docker build -t jani .
```

### Run the Container
```bash
docker run -p 5173:5173 --env-file .env jani
```

Or with environment variables:
```bash
docker run -p 5173:5173 \
  -e VITE_SUPABASE_URL=your_url \
  -e VITE_SUPABASE_ANON_KEY=your_key \
  -e VITE_FIREBASE_API_KEY=your_key \
  jani
```

### Using Docker Compose (Recommended)
```bash
docker-compose up -d
```

## 📁 Project Structure

```
jani-2/
├── src/
│   ├── pages/
│   │   ├── Home.jsx           # Landing page
│   │   ├── About.jsx          # About JANI
│   │   ├── Report.jsx         # Pollution reporting form
│   │   ├── Map.jsx            # Interactive map view
│   │   ├── Community.jsx      # Community features
│   │   ├── Login.jsx          # User login
│   │   ├── Register.jsx       # User registration
│   │   └── Navigation.jsx     # Navigation bar
│   ├── Firebase/
│   │   └── firebase.js        # Firebase configuration
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles & design system
├── public/                    # Static assets
├── .env                       # Environment variables (gitignored)
├── .env.example               # Environment template
├── Dockerfile                 # Docker configuration
├── docker-compose.yml         # Docker Compose config
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies
```

## 🎨 Design System

JANI features a comprehensive design system with:
- **Custom CSS Variables** - Consistent color palette and spacing
- **Glassmorphism Effects** - Modern, translucent UI elements
- **Smooth Animations** - Powered by Framer Motion and custom CSS
- **Responsive Layout** - Mobile-first design approach
- **Accessibility** - WCAG compliant focus states and interactions

### Color Palette
- **Background Dark**: `#123524`
- **Accent Dark**: `#3E7B27`
- **Accent Light**: `#85A947`
- **Text Light**: `#EFE3C2`

## 🚦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📱 Features Breakdown

### 🏠 Home Page
- Hero section with call-to-action
- Feature showcase
- FAQ accordion
- Community statistics

### 📍 Report Page
- Image upload with preview
- Pollution type selection
- Location auto-detection
- Real-time form validation
- Success animations

### 🗺️ Map Page
- Interactive Leaflet map
- Pollution marker clustering
- Report details popup
- Image preview
- Filter by pollution type

### 👤 Authentication
- Email/password login
- User registration
- Firebase authentication
- Protected routes

## 🔒 Security

- **Environment Variables** - All sensitive keys stored in `.env` (gitignored)
- **Firebase Rules** - Database security rules configured
- **Input Validation** - Client-side and server-side validation
- **File Upload Limits** - Max 3MB image size
- **HTTPS Only** - Secure data transmission

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is occupied:
```bash
# Vite will automatically try the next available port
npm run dev
```

### Environment Variables Not Loading
Make sure to restart the dev server after changing `.env`:
```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

### Docker Container Issues
Ensure you're passing environment variables correctly:
```bash
docker run -p 5173:5173 --env-file .env jani
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Leaflet** - For amazing map functionality
- **Supabase** - For backend infrastructure
- **Firebase** - For authentication services
- **Framer Motion** - For beautiful animations
- **Our Community** - For making environmental awareness possible

## 📞 Contact & Support

- **Website**: [jani-app.com](https://jani-app.com)
- **Email**: support@jani-app.com
- **Twitter**: [@JANIapp](https://twitter.com/JANIapp)

## 🌟 Star Us!

If you find JANI useful, please consider giving us a star ⭐ on GitHub!

---

**Built with ❤️ for a cleaner environment**

*Let's make our communities pollution-free, one report at a time! 🌍*
