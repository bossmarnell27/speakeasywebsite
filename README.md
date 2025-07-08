# SpeakEasy - Speech Practice Platform

A modern React TypeScript application for managing speech assignments and student progress tracking.

## Features

### Student View

- **Dashboard**: Overview of assignments, progress tracking, and performance metrics
- **Assignment Management**: View and track assignment status (Not Started, In Progress, Submitted, Graded)
- **Progress Tracking**: Real-time progress indicators and due date management
- **Performance Analytics**: Average scores and improvement tracking

### Teacher View

- **Class Management**: View all students in the class with their performance data
- **Assignment Creation**: Create new assignments with customizable parameters
- **Student Monitoring**: Track individual student progress and performance
- **Assignment Overview**: View all class assignments with submission status

### Role Switching

- **Seamless Role Switching**: Switch between Student and Teacher views at any time
- **Visual Role Indicators**: Clear indication of current role in the header
- **Role-Specific Navigation**: Automatic navigation to appropriate dashboards
- **Notification System**: Visual feedback when switching between roles

## How to Use Role Switching

1. **Initial Login**: Choose your role (Student or Teacher) on the welcome screen
2. **Switch Roles**: Use the role switcher buttons in the header to change views
3. **Visual Feedback**:
   - Current role is highlighted in the header
   - Notification appears when switching roles
   - Automatic navigation to the appropriate dashboard

## Technical Improvements

### Code Organization

- **Type Safety**: Comprehensive TypeScript interfaces for all data structures
- **Modular Architecture**: Separated concerns with dedicated components and utilities
- **Reusable Components**: Shared components for common UI patterns
- **Utility Functions**: Centralized helper functions for common operations

### Key Components

#### Types (`src/types/index.ts`)

- `User`, `Student`, `Assignment`, `Report` interfaces
- `UserRole`, `AssignmentStatus`, `AssignmentDifficulty` type definitions
- API response and pagination types

#### Data Layer (`src/data/mockData.ts`)

- Mock data for development and testing
- Helper functions for data retrieval
- Realistic sample data for all entities

#### Utilities (`src/utils/helpers.ts`)

- Date formatting and calculation functions
- Color and styling utilities
- Text processing helpers

#### Components

- **StudentDashboard**: Student overview and progress tracking
- **TeacherDashboard**: Class management and assignment creation
- **AssignmentList**: Reusable assignment display component
- **CreateAssignmentModal**: Assignment creation form
- **RoleSwitchNotification**: Visual feedback for role changes

## Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   ├── Login/
│   ├── Shared/
│   ├── Student/
│   └── Teacher/
├── context/
├── data/
├── pages/
├── types/
├── utils/
└── App.tsx
```

## Scalability Features

- **Type-Safe Development**: Full TypeScript coverage for better maintainability
- **Component Reusability**: Shared components reduce code duplication
- **Utility Functions**: Centralized helpers for consistent behavior
- **Modular Architecture**: Easy to extend with new features
- **Mock Data Layer**: Ready for API integration
- **Role-Based Access**: Flexible role switching system

## Future Enhancements

- Real-time notifications
- Advanced analytics and reporting
- File upload for recordings
- Student-teacher messaging
- Calendar integration
- Mobile responsiveness improvements
- Role-based permissions and access control
