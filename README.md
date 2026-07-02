<a name="readme-top"></a>

# 📄 Summariser

A full-stack **AI-powered multi-tenant document analysis platform** built using **Next.js, TypeScript, Prisma, PostgreSQL, Clerk Authentication, and Google Gemini**. The application enables organizations to securely upload, version, analyze, and interact with documents using AI-powered summarization, sentiment analysis, and contextual Q&A.

🌐 **Live Demo:** https://summariser-production-0069.up.railway.app

# Table of Contents

<!--ts-->

* [Implementation](#implementation)

  * [Authentication](#authentication)
  * [Dashboard](#dashboard)
  * [Document Upload](#document-upload)
  * [AI Document Analysis](#ai-document-analysis)
* [Features](#features)
* [Technologies & Frameworks](#technologies--frameworks)
* [Project Structure](#project-structure)
* [Environment Variables](#environment-variables)
* [Installation](#installation)
* [Database Setup](#database-setup)
* [Deployment](#deployment)

<!--te-->

# Implementation

### 1. Authentication

Secure authentication powered by **Clerk**, supporting organization-based workspaces and role-based access control.

<img width="1897" height="1017" alt="image" src="https://github.com/user-attachments/assets/600f5565-1f63-4f51-a968-1b5c909263af" />

### 2. Dashboard

Manage uploaded documents inside organization-specific workspaces with secure access isolation.

<img width="1896" height="1090" alt="image" src="https://github.com/user-attachments/assets/0fa4c6e9-2d83-4c81-94cd-0b6ee3e61c46" />

### 3. Document Upload

Upload and manage documents in multiple formats including:

* PDF
* DOCX
* TXT
* Markdown

Uploaded files are securely stored using **Vercel Blob Storage**.

<img width="1917" height="1087" alt="image" src="https://github.com/user-attachments/assets/5e4a0c3f-a5d7-4382-aca8-e5ed6c442609" />

### 4. AI Document Analysis

Generate AI-powered insights using **Google Gemini**, including:

* 📄 Document Summaries
* 😊 Sentiment Analysis
* 💬 Interactive Question Answering

Text is extracted server-side before being processed by Gemini.

<img width="1917" height="1088" alt="image" src="https://github.com/user-attachments/assets/2c039137-8fca-4305-8f33-88dc81393390" />

# Features

* 🔐 Multi-tenant organization support
* 👥 Role-based access control
* 📄 Document upload and secure cloud storage
* 📝 Multi-version document history
* 🤖 AI-powered document summarization
* 😊 Sentiment analysis
* 💬 Interactive document Q&A
* ⚡ Server-side text extraction
* ☁️ Cloud storage with Vercel Blob
* 🚀 Built with Next.js App Router

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Technologies & Frameworks

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=nextdotjs\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge\&logo=shadcnui\&logoColor=white)

### Backend

![Next.js](https://img.shields.io/badge/Next.js_Route_Handlers-000000?style=for-the-badge\&logo=nextdotjs\&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge\&logo=prisma\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge\&logo=postgresql\&logoColor=white)

### Authentication

![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge)

### AI & Storage

![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge\&logo=google\&logoColor=white)
![Vercel Blob](https://img.shields.io/badge/Vercel_Blob-000000?style=for-the-badge\&logo=vercel\&logoColor=white)

### Deployment

![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge\&logo=railway\&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Overall Project Structure

```text
summariser/
│
├── app/
├── components/
├── lib/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── types/
├── .env
├── proxy.ts
└── README.md
```

# Environment Variables

Create a `.env` file in the project root.

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Gemini
GEMINI_API_KEY=

# PostgreSQL
DATABASE_URL=

# Vercel Blob
BLOB_READ_WRITE_TOKEN=

# Application
NEXT_PUBLIC_APP_URL=
```

# Installation

Clone the repository

```bash
git clone https://github.com/Jasz-rgb/summariser.git
cd summariser
```

Install dependencies

```bash
npm install
```

# Database Setup

Generate the Prisma Client

```bash
npx prisma generate
```

Run database migrations

```bash
npx prisma migrate dev --name init
```

# Run Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Deployment

The application is deployed on **Railway**.

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

> **Note:** Configure all required environment variables before deploying to Railway.

# Future Improvements

* OCR support for scanned documents
* Semantic document search
* AI-powered document comparison
* Collaborative document editing
* Audit logs and activity tracking

# Author

* [Jasmine](https://github.com/Jasz-rgb)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
