# Log Manager Frontend

React + TypeScript + Vite dashboard for managing applications and viewing logs.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- Backend API running on `http://localhost:5000` (or configured via .env)

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env if your backend is on a different URL
# Then start the development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 📚 Available Scripts

- `npm run dev` - Start Vite development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/                 # Page components
│   │   ├── Login.tsx         # Login page
│   │   ├── Register.tsx      # Registration page
│   │   ├── Dashboard.tsx     # Main dashboard
│   │   └── AppDetails.tsx    # Application details with logs
│   ├── components/           # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── APIKeyDisplay.tsx
│   │   ├── LogsTable.tsx
│   │   ├── PieChart.tsx
│   │   └── LineChart.tsx
│   ├── services/            # API client
│   │   └── api.ts
│   ├── types/               # TypeScript interfaces
│   │   └── index.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   ├── App.css
│   ├── index.css
│   └── assets/
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── .env.example
└── README.md
```

## 🎨 Features

### Authentication

- User registration with validation
- Secure login with JWT token storage
- Logout functionality
- Protected routes (redirect to login if not authenticated)

### Dashboard

- View all user applications
- Create new applications (with validation for unique names without spaces)
- Delete applications
- Display and copy user's API key
- Link to application details page

### Application Details

- View all logs for an application
- **Pagination**: 10 logs per page (configurable)
- **Sorting**:
  - Most Recent (default) - sorted by createdAt descending
  - Most Occurred - sorted by count descending
- **Filtering**:
  - By log level (INFO, WARN, ERROR)
  - By message (search with case-insensitive regex)
- **Charts** (Bonus):
  - Pie chart showing log level distribution
  - Line chart showing daily log trends (last 7 days)
- Tab switching between table and charts view
- Clear filters button

### UI/UX

- Responsive design (mobile, tablet, desktop)
- Tailwind CSS styling
- Loading states
- Error handling with alerts
- Color-coded log levels (green for INFO, yellow for WARN, red for ERROR)
- Smooth transitions and hover effects

## 🔌 API Integration

The frontend communicates with the backend via Axios with automatic JWT token injection in request headers.

### API Endpoints Used

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user
- `GET /api/users/me/api-key` - Get user's API key
- `GET /api/applications` - Get all user's applications
- `POST /api/applications` - Create new application
- `DELETE /api/applications/:name` - Delete application
- `GET /api/applications/:name/logs` - Get application logs with filters/sorting/pagination

## 📦 Dependencies

- **react** - UI library
- **react-dom** - DOM rendering
- **react-router-dom** - Client-side routing
- **axios** - HTTP client
- **recharts** - Chart library
- **tailwindcss** - CSS framework
- **typescript** - Type safety

## 🔐 Security Features

- JWT tokens stored in localStorage
- Automatic token injection in API requests
- Protected routes require authentication
- Session validation on page load
- Logout clears local storage

## 🎯 Environment Configuration

Create `.env` file (copy from `.env.example`):

```env
VITE_API_URL=http://localhost:5000/api
```

Customize the backend URL if needed:

- Local development: `http://localhost:5000/api`
- Remote server: `https://api.yourdomain.com/api`

## 🧩 Component Details

### Pages

**Login.tsx**

- Email and password input
- Error handling
- Link to register page
- Stores token and user data on successful login

**Register.tsx**

- Username, email, password input
- Validation feedback
- Link to login page
- Auto-login after successful registration

**Dashboard.tsx**

- Displays API key with copy button
- Lists all user applications
- Create new application modal
- Delete application with confirmation
- Navigation to app details

**AppDetails.tsx**

- Tabbed interface (Table/Charts)
- Filter controls (search, level, sort)
- Paginated logs table
- Pie chart for log distribution
- Line chart for daily trends
- Pagination controls

### Components

**Navbar.tsx**

- Displays app name and current app (if in details page)
- Shows logged-in username
- Logout button

**LogsTable.tsx**

- Table with columns: Message, Level, Count, First Occurrence, Last Occurrence
- Color-coded log levels
- Empty state message

**PieChart.tsx**

- Interactive pie chart using Recharts
- Shows distribution of INFO/WARN/ERROR logs
- Displays percentages

**LineChart.tsx**

- Line chart showing daily log trends
- Three lines for each log level
- Last 7 days of data

**APIKeyDisplay.tsx**

- Shows API key with copy button
- Helper text for SDK usage

## 🚨 Error Handling

- API errors display alert messages
- Network errors are caught and logged
- Invalid credentials show clear feedback
- Protected routes redirect to login on auth failure

## 📊 Data Visualization

### Pie Chart

- Aggregates current logs by level
- Shows percentage breakdown
- Color-coded by level

### Line Chart

- Groups logs by date (last 7 days)
- Shows count for each level per day
- Helps identify trends and patterns

## 🔄 State Management

Uses React hooks:

- `useState` for local component state
- `useEffect` for data fetching
- `useNavigate` for routing
- `useParams` for route parameters

## 🎯 Key Features Implemented

✅ User authentication (login/register/logout)
✅ API key display and copy
✅ View all applications
✅ Create applications (with validation)
✅ Delete applications
✅ View application details
✅ Paginated logs table (10 per page)
✅ Sorting (recent/most occurred)
✅ Filtering (by level, by message)
✅ Pie chart (log distribution)
✅ Line chart (daily trends)
✅ Tab switching (table/charts)
✅ Responsive design
✅ Error handling
✅ Protected routes

---

**Related:** Check out the [Backend README](../backend/README.md) or [Client Library README](../client-library/README.md)!

// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
