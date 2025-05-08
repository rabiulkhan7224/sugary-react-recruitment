

```markdown
# Sugary React Recruitment Project

A React application built with Next.js for the Sugary recruitment process. This project demonstrates secure authentication, efficient data fetching, responsive UI design, and infinite scrolling features using modern web technologies.

🔗 **Live Demo**: [https://sugary-react-recruitment-ten.vercel.app](https://sugary-react-recruitment-ten.vercel.app)

![Sugary Dashboard](https://via.placeholder.com/800x400?text=Sugary+Dashboard)

---

## 📑 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Authentication Flow](#-authentication-flow)
- [API Integration](#-api-integration)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Key Components](#-key-components)
- [Implementation Details](#-implementation-details)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## 🚀 Features

- 🔐 **Authentication System**: JWT-based login, token refresh, secure storage
- 📊 **Dashboard Interface**: Clean and user-friendly layout
- 🔄 **Materials Catalog**: Infinite scroll for seamless data loading
- 📱 **Responsive Design**: Optimized for all screen sizes
- ⚠️ **Error Handling**: Graceful handling of API and network errors

---

## 🛠️ Technologies Used

- **Next.js 15** — App Router support
- **React** — Component-based UI
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **Shadcn/UI** — Accessible and styled components
- **React Hook Form** — Form management
- **Zod** — Schema validation
- **React Intersection Observer** — Infinite scroll logic

---

## 📁 Project Structure

```

sugary-react/
├── app/
│   ├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── login-form.tsx
│   ├── dashboard-header.tsx
│   ├── materials-list.tsx
│   └── material-card.tsx
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   └── utils.ts
├── types/
│   ├── auth.ts
│   └── materials.ts
├── hooks/
│   ├── use-toast.ts
│   └── use-mobile.tsx
├── middleware.ts
└── public/

```

---

## 🔐 Authentication Flow

The application uses a hybrid token-based approach:

- **Access Token**: Stored in `localStorage`
- **Refresh Token**: Stored in `HttpOnly` cookie
- **User Data**: Stored in cookie for SSR access

This ensures secure server-side rendering while enabling smooth client-side interactions.

---

## 🔄 API Integration

### Base URL

```

[https://sugarytestapi.azurewebsites.net](https://sugarytestapi.azurewebsites.net)

````

### Endpoints

| Endpoint                 | Description                    |
|--------------------------|--------------------------------|
| `/AdminAccount/Login`    | Authenticates user credentials |
| `/Account/RefreshToken`  | Issues a new access token      |
| `/Materials/GetAll`      | Fetches paginated materials    |

---

## 🚦 Getting Started

### Prerequisites

- Node.js `v18+`
- npm

### Installation

```bash
git clone https://github.com/yourusername/sugary-react.git
cd sugary-react
npm install
npm run dev
````

Then visit: [http://localhost:3000](http://localhost:3000)
Or try the **Live Demo**: [https://sugary-react-recruitment-ten.vercel.app](https://sugary-react-recruitment-ten.vercel.app)

### Login Credentials

* **Email**: [react@test.com](mailto:react@test.com)
* **Password**: `playful009`

---

## 📱 Usage

1. **Login** using provided credentials
2. Navigate to **Dashboard**
3. Scroll down for **infinite material loading**
4. Click **Logout** to end session

---

## 🧩 Key Components

* **`lib/auth.ts`**: Handles login, token management, session handling
* **`lib/api.ts`**: API client with built-in error handling
* **`components/materials-list.tsx`**: Infinite scroll logic
* **`components/material-card.tsx`**: Material display card UI

---

## 🔍 Implementation Details

### Token Storage Strategy

* `localStorage` for **access token**
* `HttpOnly cookie` for **refresh token**
* `cookie` for **user object** (SSR-friendly)

### Error Handling Includes

* API failures and timeouts
* JWT expiration handling
* JSON parsing issues
* Network disconnections

### Responsive Design Techniques

* Mobile-first Tailwind layout
* Adaptive grids and typography
* Touch accessibility

---

## 📝 License

This project is a demonstration for the Sugary recruitment process and is not intended for production use.

---

## 🙏 Acknowledgements

* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Shadcn/UI](https://ui.shadcn.com/)
* [React Hook Form](https://react-hook-form.com/)

---

## ➕ Recommended Additions

* [ ] **Add screenshots** of the UI in various states
* [ ] **Create API documentation** for internal endpoints
* [ ] **Include deployment instructions** (e.g., Vercel)
* [ ] **Write contributing guidelines**

```

Would you like me to add **deployment instructions for Vercel** next?
```
