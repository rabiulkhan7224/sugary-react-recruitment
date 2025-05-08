


# Sugary React Recruitment Project

A React application built with Next.js for the Sugary recruitment process. It features secure authentication, API integration, and a responsive, modern UI with infinite scrolling.

🔗 **Live Demo**: [https://sugary-react-recruitment-ten.vercel.app](https://sugary-react-recruitment-ten.vercel.app)

![Sugary Dashboard](https://res.cloudinary.com/dbzzdvrmu/image/upload/v1746725900/Screenshot_2025-05-08_233042_pfs1so.png)

---

## 📑 Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [API Integration](#api-integration)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Key Components](#key-components)
- [Implementation Details](#implementation-details)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## 🚀 Features

- JWT-based authentication with refresh tokens
- Responsive dashboard UI
- Infinite scrolling material catalog
- Mobile-first design
- Robust error handling

---

## 🛠️ Technologies

- **Next.js 15**
- **React + TypeScript**
- **Tailwind CSS**
- **Shadcn/UI**
- **React Hook Form**
- **Zod**
- **React Intersection Observer**

---



---

## 🔐 Authentication

A hybrid token strategy:

- **Access Token**: Stored in `localStorage`
- **Refresh Token**: Stored in an HTTP-only cookie
- **User Info**: Stored in a cookie for SSR access

---

## 🔄 API Integration

**Base URL**: `https://sugarytestapi.azurewebsites.net`

| Endpoint                 | Purpose                       |
|--------------------------|-------------------------------|
| `/AdminAccount/Login`    | User authentication           |
| `/Account/RefreshToken`  | Refreshes access token        |
| `/Materials/GetAll`      | Fetch paginated materials     |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+

### Installation

```bash
git clone https://github.com/yourusername/sugary-react.git
cd sugary-react
npm install
npm run dev
````

Visit: [http://localhost:3000](http://localhost:3000)
Or try the
## live demo: [https://sugary-react-recruitment-ten.vercel.app](https://sugary-react-recruitment-ten.vercel.app)

### Test Credentials

* **Email**: [react@test.com](mailto:react@test.com)
* **Password**: `playful009`

---

## 📱 Usage

1. Log in using test credentials
2. Access the dashboard
3. Scroll to load additional materials
4. Use the logout option to end session

---

## 🧩 Key Components

* `lib/auth.ts`: Auth logic and token management
* `lib/api.ts`: API client with error handling
* `components/materials-list.tsx`: Infinite scrolling logic
* `components/material-card.tsx`: Material UI card

---

## 🔍 Implementation Details

### Token Storage

* Access token: `localStorage`
* Refresh token: `HttpOnly` cookie
* User object: cookie (SSR-friendly)

### Error Handling

Handles:

* API failures
* Token expiration
* Parsing errors
* Network issues

### Responsive Design

* Mobile-first layout
* Adaptive grid and typography
* Touch-friendly components

---

## 📝 License

This project was developed for the Sugary recruitment process and is not intended for production use.

---

## 🙏 Acknowledgements

* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Shadcn/UI](https://ui.shadcn.com/)
* [React Hook Form](https://react-hook-form.com/)

```

Would you like to include **deployment instructions for Vercel** or a **Contributing** section next?
```
