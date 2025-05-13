# Subscription Tracker App - Frontend

## Overview

Subscription Tracker is a comprehensive web application that helps users track, manage, and receive reminders for all their subscription services (Netflix, Spotify, Amazon Prime, etc.). The application prevents unwanted charges by notifying users before renewal dates and provides insightful analytics on subscription spending.


## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: shadcn/ui components
- **State Management**: Redux Toolkit
- **Authentication**: JWT + Firebase (Google Authentication)
- **Data Visualization**: Chart.js
- **Payment Processing**: Stripe

## Features

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
└── 📁src
    └── 📁app
        └── 📁(auth)                     # Authentication routes group
            └── 📁forgot-password        # Password recovery
            └── 📁login                  # Login page
            └── 📁reset-password         # Password reset
            └── 📁signup                 # Signup page
        └── 📁(payment)                  # Payment process routes
            └── 📁cancel                 # Payment cancellation page
            └── 📁success                # Payment success page
        └── 📁(protected)                # Protected routes requiring authentication
            └── 📁dashboard              # Main dashboard
            └── 📁export-data            # Data export functionality
            └── layout.tsx               # Protected area layout
            └── 📁profile                # User profile section
                └── 📁change-email       # Email change page
                └── 📁change-password    # Password change page
                └── 📁edit               # Profile editing
                └── page.tsx             # Profile main page
            └── 📁subscriptions          # Subscription management
                └── 📁[id]               # Individual subscription view
                └── 📁add                # Add subscription page
                └── 📁edit               # Edit subscription pages
                    └── 📁[id]           # Edit specific subscription
                └── page.tsx             # Subscriptions listing page
            └── 📁upgrade                # Premium plan upgrade page
        └── 📁about                      # About page
        └── client-layout.tsx            # Client-side layout wrapper
        └── 📁features                   # Features showcase page
        └── globals.css                  # Global CSS styles
        └── layout.tsx                   # Root layout
        └── not-found.tsx                # 404 page
        └── page.tsx                     # Homepage
        └── 📁pricing                    # Pricing information page
    └── 📁components                     # Reusable components
        └── 📁analysis                   # Analytics chart components
            └── CategoryWiseSpendingChart.tsx
            └── MonthlySpendingChart.tsx
            └── TopSubscriptionsChart.tsx
            └── YearlySpendingChart.tsx
        └── CardLoader.tsx               # Loading component for cards
        └── CustomDialog.tsx             # Custom dialog component
        └── GoogleSignInButton.tsx       # Google authentication button
        └── GradientBackgroundBottom.tsx # UI gradient components
        └── GradientBackgroundTop.tsx
        └── Loader.tsx                   # General loading component
        └── Navbar.tsx                   # Navigation component
        └── Overlay.tsx                  # Overlay component
        └── ProtectedRoute.tsx           # Route protection component
        └── 📁providers                  # App providers
            └── ReduxProvider.tsx        # Redux provider setup
        └── RedirectIfAuthenticated.tsx  # Authentication redirect component
        └── ResetPasswordForm.tsx        # Password reset form
        └── 📁skeletons                  # Loading skeleton components
            └── DashboardSkeleton.tsx
            └── SubscriptionsSkeleton.tsx
        └── StatCard.tsx                 # Statistics card component
        └── 📁subscriptions              # Subscription-related components
            └── EmptyState.tsx           # Empty state display
            └── SubscriptionCard.tsx     # Subscription card component
            └── SubscriptionErrorCard.tsx # Error state component
            └── SubscriptionList.tsx     # List component for subscriptions
        └── 📁ui                         # shadcn UI components
            └── alert-dialog.tsx
            └── avatar.tsx
            └── badge.tsx
            └── button.tsx
            └── calendar.tsx
            └── card.tsx
            └── dialog.tsx
            └── dropdown-menu.tsx
            └── input.tsx
            └── label.tsx
            └── popover.tsx
            └── progress.tsx
            └── radio-group.tsx
            └── select.tsx
            └── separator.tsx
            └── sheet.tsx
            └── skeleton.tsx
            └── sonner.tsx
            └── textarea.tsx
        └── UpgradePromptCard.tsx        # Premium upgrade prompt
        └── UserMenu.tsx                 # User menu component
    └── 📁config                         # Configuration files
        └── firebase.ts                  # Firebase configuration
    └── 📁lib                            # Utility libraries
        └── utils.ts                     # General utilities
    └── 📁redux                          # Redux state management
        └── 📁slices                     # Redux slices
            └── authSlice.ts             # Authentication state
            └── subscriptionSlice.ts     # Subscription state
        └── store.ts                     # Redux store configuration
        └── 📁thunks                     # Async thunks
            └── authThunks.ts            # Authentication thunks
            └── subscriptionThunks.ts    # Subscription thunks
    └── 📁types                          # TypeScript type definitions
        └── types.ts                     # Shared types
    └── 📁utils                          # Utility functions
        └── axiosInstance.ts             # Axios API client
        └── constants.ts                 # Application constants
        └── motion.ts                    # Animation utilities
        └── subscriptionUtils.ts         # Subscription-specific utilities
```

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
