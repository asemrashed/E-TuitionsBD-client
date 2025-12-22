# E-TuitionsBD Client

## Overview

E-TuitionsBD is a comprehensive platform connecting students with tutors in Bangladesh. This repository contains the frontend client application built with React and Vite.

## Features

- **User Roles**: Separate dashboards for Students, Tutors, and Admins.
- **Tuition Management**: Students can post tuitions, and Tutors can apply to them.
- **Search & Filter**: Find tutors by subject, location, and more.
- **Payment Integration**: Secure payment processing for platform fees.
- **Real-time Dashboard**: Statistics and activity tracking.
- **Responsive Design**: Fully responsive UI using Tailwind CSS.

## Technologies Used

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS, DaisyUI
- **State Management**: TanStack Query
- **Routing**: React Router DOM
- **Authentication**: Firebase Auth
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Animations**: Framer Motion

## Setup & Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd E-TuitionsBD-client
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env.local` file in the root directory and add your Firebase and Backend API keys:

    ```env
    VITE_apiKey=YOUR_FIREBASE_API_KEY
    VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
    VITE_projectId=YOUR_PROJECT_ID
    VITE_storageBucket=YOUR_STORAGE_BUCKET
    VITE_messagingSenderId=YOUR_MESSAGING_SENDER_ID
    VITE_appId=YOUR_APP_ID
    VITE_server_url=http://localhost:5000
    VITE_imgbb_key=YOUR_IMGBB_API_KEY
    VITE_payment_pk=YOUR_STRIPE_PUBLIC_KEY
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

## Project Structure

- `src/components`: Reusable UI components.
- `src/layouts`: Main layouts (Root, Dashboard, Auth).
- `src/pages`: Application pages.
- `src/hooks`: Custom React hooks (useAuth, useRole, etc.).
- `src/routes`: Route definitions.
- `src/utils`: Utility functions and constants.

## Contributing

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
