# Subscription Tracker App - Frontend

## Overview

Subscription Tracker is a comprehensive web application that helps users track, manage, and receive reminders for all their subscription services (Netflix, Spotify, Amazon Prime, etc.). The application prevents unwanted charges by notifying users before renewal dates and provides insightful analytics on subscription spending. With the new AI-powered assistant, users can now get personalized help and subscription recommendations directly within the app.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: shadcn/ui components
- **State Management**: Redux Toolkit
- **Authentication**: JWT + Firebase (Google Authentication)
- **Data Visualization**: Chart.js
- **Payment Processing**: Stripe
- **AI Assistant**: Gemini AI

## Features

### 🤖 AI Website Assistant
- Integrated Gemini AI assistant for personalized help and FAQs

### 🔐 User Authentication
- Secure sign-up and login functionality using JWT
- Google authentication integration through Firebase
- Protected routes for authenticated users

### 📊 Subscription Dashboard
- Grid/card view of all subscriptions
- At-a-glance information about subscription details
- Sorting and filtering capabilities

### ➕ Subscription Management
- Add unlimited subscriptions with details:
  - Service name
  - Billing amount
  - Billing cycle (monthly, yearly, custom)
  - Renewal date
  - Category
  - Payment method
- Edit and delete subscription details

### 📈 Expense Analytics
- Visual representations of spending trends
- Charts include:
  - Monthly spending
  - Yearly spending 
  - Category-wise breakup (Monthly Plan)
  - Top 5 subscriptions by cost (Monthly Plan)

### 🔔 Reminder System
- Frontend integration with backend notification service
- UI for setting reminder preferences

### 💰 Premium Subscription Plans
- Monthly plan (₹499/month) with basic analytics
- Yearly plan (₹4999/year) with advanced features:
  - Complete analytics suite
  - CSV export functionality
  - Enhanced AI assistant capabilities

### 👤 User Profile
- Update personal information
- Manage notification preferences
- Change password functionality

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running (refer to backend README)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/harshpatel-22/subsight-frontend.git
   cd subscription-fronted/
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Firebase Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

    # Stripe Configuration
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

    # API Configuration
    NEXT_PUBLIC_MODE='development'
    NEXT_PUBLIC_BACKEND_DEV_URL=http://localhost:4000/api
    NEXT_PUBLIC_BACKEND_PROD_URL=https://subsight-backend.onrender.com/api
   
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
📁 src                                     // Main source directory of the frontend
 ├── 📁 app                                // Next.js 15 app directory with route-based structure
 │   ├── 📁 (auth)                          // Authentication-related pages
 │   │   ├── 📁 forgot-password             // Forgot password page
 │   │   ├── 📁 login                      // Login page
 │   │   ├── 📁 reset-password             // Reset password page
 │   │   └── 📁 signup                     // Signup page
 │   ├── 📁 (payment)                       // Stripe payment pages
 │   │   ├── 📁 cancel                     // Payment cancellation page
 │   │   ├── layout.tsx                   // Layout for payment pages
 │   │   └── 📁 success                   // Payment success page
 │   ├── 📁 (protected)                    // Protected pages (only accessible by logged-in users)
 │   │   ├── 📁 dashboard                 // User dashboard
 │   │   ├── 📁 export-data               // Data export page
 │   │   ├── layout.tsx                   // Layout for protected pages
 │   │   ├── 📁 profile                   // User profile pages
 │   │   │   ├── 📁 change-email          // Change email page
 │   │   │   ├── 📁 change-password       // Change password page
 │   │   │   ├── 📁 edit                  // Edit profile page
 │   │   │   └── page.tsx                // View profile page
 │   │   ├── 📁 subscriptions            // Subscription management pages
 │   │   │   ├── 📁 [id]                  // Subscription detail by ID
 │   │   │   ├── 📁 add                   // Add subscription page
 │   │   │   ├── 📁 edit                  // Edit subscription by ID
 │   │   │   └── page.tsx                // All subscriptions list page
 │   │   └── 📁 upgrade                  // Upgrade to premium page
 │   ├── 📁 about                          // About page
 │   ├── client-layout.tsx               // Client-only layout component
 │   ├── 📁 features                       // Features overview page
 │   ├── globals.css                      // Global styles
 │   ├── layout.tsx                       // Root layout for the app
 │   ├── not-found.tsx                    // Custom 404 page
 │   └── page.tsx                         // Landing (home) page
 │   └── 📁 pricing                        // Pricing page
 ├── 📁 components                         // Reusable UI and feature-specific components
 │   ├── 📁 analysis                       // Charts for analysis section
 │   ├── CardLoader.tsx                  // Skeleton loader for cards
 │   ├── 📁 chatwidget                     // Chatbot widget components
 │   ├── ChatWidget.tsx                  // ChatWidget entry component
 │   ├── CustomDialog.tsx                // Custom modal/dialog component
 │   ├── 📁 dashboard                      // Dashboard-specific UI components
 │   ├── 📁 export-data                    // Components for export data page
 │   ├── GoogleSignInButton.tsx          // Google sign-in button
 │   ├── GradientBackgroundBottom.tsx    // Decorative background component (bottom)
 │   ├── GradientBackgroundTop.tsx       // Decorative background component (top)
 │   ├── 📁 layout                         // Layout components like header, sidebar, content
 │   ├── Loader.tsx                      // General-purpose loader
 │   ├── Navbar.tsx                      // Top navigation bar
 │   ├── Overlay.tsx                     // Overlay component
 │   ├── 📁 profile                        // Profile information components
 │   ├── ProtectedRoute.tsx              // Wrapper for protected routes
 │   ├── 📁 providers                      // App-wide providers (e.g., Redux)
 │   ├── RedirectIfAuthenticated.tsx     // Redirect logic for logged-in users
 │   ├── ResetPasswordForm.tsx           // Reset password form component
 │   ├── 📁 skeletons                      // Skeleton loaders
 │   ├── StatCard.tsx                    // Statistic card component
 │   ├── 📁 subscription-detail            // Subscription detail view components
 │   ├── 📁 subscriptions                  // Subscription-related UI components
 │   ├── 📁 ui                             // ShadCN + custom UI components
 │   ├── UpgradePromptCard.tsx           // Prompt for non-premium users to upgrade
 │   └── UserMenu.tsx                    // Dropdown menu for user settings/actions
 ├── 📁 config                             // Config files (e.g., Firebase)
 ├── 📁 hooks                              // Custom React hooks
 ├── 📁 images                             // Static image assets
 ├── 📁 lib                                // Helper utilities and general-purpose functions
 ├── 📁 redux                              // Redux setup and state management
 │   ├── 📁 slices                         // Redux slices (auth, subscription, etc.)
 │   └── 📁 thunks                         // Redux async logic (thunks)
 ├── 📁 types                              // Global TypeScript types
 └── 📁 utils                              // Utility functions and constants

```

## AI Assistant Integration

The new AI assistant feature powered by Gemini AI provides:

- **Contextual Help**: Answers questions about app features and FAQs

## State Management

The application uses Redux Toolkit for state management:

- **authSlice**: Manages user authentication state
- **subscriptionSlice**: Handles subscription data and operations

## API Integration

The frontend communicates with the backend API for:

- User authentication and profile management
- CRUD operations for subscriptions
- Fetching analytics data
- Processing payments via Stripe
- AI assistant queries and responses

## Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Environment Variables for Production

Ensure these environment variables are set in your production environment:

```bash
#Firebase Configuration:
  NEXT_PUBLIC_FIREBASE_API_KEY
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  NEXT_PUBLIC_FIREBASE_PROJECT_ID
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  NEXT_PUBLIC_FIREBASE_APP_ID
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

#Stripe Configuration:
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

#API Configuration:
  NEXT_PUBLIC_MODE='production'
  NEXT_PUBLIC_BACKEND_DEV_URL
  NEXT_PUBLIC_BACKEND_PROD_URL

```
## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Chart.js](https://www.chartjs.org/)
- [Stripe](https://stripe.com/)
- [Gemini AI](https://ai.google.dev/gemini-api)
