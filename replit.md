# XPR Media Agency Platform

## Overview

XPR Media Agency is a full-stack web application that serves as a digital marketplace and service booking platform for creators, brands, and influencers. The platform offers both digital products (like reels bundles, thumbnails, templates) and professional services (video editing, copywriting, social media management). It features a modern e-commerce experience with shopping cart functionality, user authentication, payment processing via Razorpay, and a comprehensive dashboard for order management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context for authentication and cart state, TanStack Query for server state
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Animation**: Framer Motion for smooth transitions and animations
- **Layout**: Responsive design with mobile-first approach using Tailwind's grid system

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for consistent typing across the stack
- **API Design**: RESTful API with organized route handlers
- **Middleware**: Custom logging, error handling, and authentication middleware
- **Development**: Hot reloading with Vite integration for seamless full-stack development

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Well-defined tables for users, products, orders, and bookings with proper relationships
- **Local Storage**: Client-side cart persistence and authentication token storage
- **Memory Storage**: Fallback in-memory storage implementation for development/testing

### Authentication and Authorization
- **Strategy**: JWT-based authentication with bcrypt for password hashing
- **Token Storage**: Local storage for client-side token persistence
- **Protected Routes**: Middleware-based route protection on the server
- **User Roles**: Role-based access control with user/admin distinctions
- **Session Management**: Automatic token validation and refresh handling

### Payment Processing
- **Gateway**: Razorpay integration for secure payment processing
- **Flow**: Order creation → Payment initiation → Verification → Fulfillment
- **Security**: Server-side payment verification to prevent tampering
- **Order Management**: Complete order lifecycle tracking from creation to completion

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle Kit**: Database migrations and schema management

### Payment Gateway
- **Razorpay**: Indian payment gateway for processing transactions
- **Payment Methods**: Support for cards, UPI, net banking, and wallets

### UI and Styling
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Consistent icon library for UI elements
- **Google Fonts**: Montserrat and Playfair Display for typography

### Development Tools
- **Replit Integration**: Specialized plugins for Replit development environment
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Third-party Libraries
- **Axios**: HTTP client for API requests with interceptors
- **React Hook Form**: Form handling with validation
- **Zod**: Runtime type validation and schema definition
- **Date-fns**: Date manipulation and formatting utilities