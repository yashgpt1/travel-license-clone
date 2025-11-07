# International Driving Permit (IDP) Generator

A modern web application for generating International Driving Permits based on the Convention of International Road Traffic of 19 September 1949 (United Nations).

## 🌟 Features

- **Multi-step Form Process**: Intuitive step-by-step interface for collecting user information
- **Dynamic PDF Generation**: Automatically generates a 16-page IDP document with user details
- **Photo & Signature Upload**: Support for selfie, license photos, and digital signatures
- **License Class Selection**: Choose from A, B, C, D, E license classes with visual stamps
- **Plan Selection**: Choose validity period (1, 2, or 3 years)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 📋 What Gets Generated

The application generates a complete 16-page PDF document including:

- **Page 1**: Cover page with dynamic "Valid Until" date
- **Pages 2-14**: Static template pages with IDP information
- **Page 15**: Personalized page with:
  - Surname and given name
  - Country/place of birth
  - Date of birth
  - Permanent residence
  - User photo
  - Digital signature
  - License class stamps (A, B, C, D, E)
- **Page 16**: Back cover

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yashgpt1/travel-license-clone.git

# Navigate to the project directory
cd travel-license-clone

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080` (or the next available port).

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **PDF Generation**: pdf-lib
- **Form Handling**: React hooks
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Project Structure

```
travel-license-clone/
├── src/
│   ├── components/
│   │   └── idp/
│   │       └── steps/
│   │           ├── LicenseCheck.tsx      # Initial license verification
│   │           ├── CountrySelection.tsx  # Country selection
│   │           ├── DriverDetails.tsx     # Personal information form
│   │           ├── PhotoUpload.tsx       # Photo and signature upload
│   │           ├── PlanSelection.tsx     # Validity period selection
│   │           └── IDPGenerated.tsx      # PDF generation logic
│   ├── assets/
│   │   └── idp-template/                 # PDF template images (pages 1-16)
│   ├── pages/
│   │   └── Index.tsx                     # Main application page
│   └── App.tsx                           # Application root
├── netlify.toml                          # Netlify deployment config
└── package.json
```

## 🎨 Key Features Explained

### PDF Generation
The application uses `pdf-lib` to dynamically generate PDFs with:
- Embedded template images (PNG format)
- Dynamic text overlay for user details
- Image embedding for photos and signatures
- Custom stamps for license classes

### Form Flow
1. **License Check**: Verify if user has a valid driver's license
2. **Country Selection**: Choose issuing country
3. **Driver Details**: Enter personal information and license classes
4. **Photo Upload**: Upload selfie, license photos, and signature
5. **Plan Selection**: Choose validity period (1-3 years)
6. **PDF Generation**: Download the completed IDP

### Photo Upload Options
- **Selfie/Passport Photo**: Direct upload or drag & drop
- **License Photos**: Front and back side (optional)
- **E-Signature**: Three options:
  - Draw with mouse/touch
  - Type your name (converted to cursive)
  - Upload signature image

## 🚢 Deployment

### Netlify (Recommended)

The project is configured for easy Netlify deployment:

```bash
# Build the project
npm run build

# Deploy to Netlify
# Option 1: Drag & drop the 'dist' folder to https://app.netlify.com/drop
# Option 2: Use Netlify CLI
netlify deploy --prod
```

The `netlify.toml` file is already configured with:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA routing support

### Other Platforms

The project can be deployed to any static hosting service:
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 🔧 Development

### Available Scripts

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

### Environment Setup

No environment variables are required for basic functionality.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Yash Gupta**
- GitHub: [@yashgpt1](https://github.com/yashgpt1)

## 🙏 Acknowledgments

- UI components from [shadcn/ui](https://ui.shadcn.com)
- PDF generation powered by [pdf-lib](https://pdf-lib.js.org)

---

**Note**: This is a demonstration project. For official International Driving Permits, please contact your local automobile association or authorized issuing authority.
