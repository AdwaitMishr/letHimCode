# 🧪 Let Him Code — AI Web Scaffolding Platform

> Let Him Code with 99.1% purity while you go touch some grass.

An AI-powered platform that converts natural language prompts into fully scaffolded, sandboxed Next.js applications — complete with live preview and iterative refinement.

## ✨ Features

- **Natural Language → Code** — Describe your idea, get a complete Next.js project.
- **Sandboxed Preview** — Every generation runs in an isolated [e2b](https://e2b.dev) sandbox with a live URL.
- **Iterative Refinement** — Continue the conversation to tweak and improve your generated project.
- **Project History** — All your creations are saved and accessible from the dashboard.
- **Code Explorer** — Browse generated files with syntax highlighting and one-click copy.
- **Daily Rate Limit** — 2 free generations per day, no account tiers needed.

## 🛠 Tech Stack

| Layer        | Technology                                                |
| ------------ | --------------------------------------------------------- |
| Framework    | [Next.js 15](https://nextjs.org) (App Router)            |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com)                |
| Database     | PostgreSQL + [Prisma ORM](https://prisma.io)              |
| Auth         | [Clerk](https://clerk.com)                                |
| AI           | [Inngest Agent Kit](https://inngest.com) + Gemini 2.5 Flash |
| Sandbox      | [e2b](https://e2b.dev)                                    |
| UI Library   | [shadcn/ui](https://ui.shadcn.com)                        |

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0+)
- [Docker](https://docker.com) (for PostgreSQL) or a hosted Postgres instance
- API keys for Clerk, Gemini, and e2b

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/lethimcode.git
cd lethimcode
bun install
```

### 2. Environment Setup

Copy the example env file and fill in your secrets:

```bash
cp .example.env .env
```

| Variable                             | Description                        |
| ------------------------------------ | ---------------------------------- |
| `DATABASE_URL`                       | PostgreSQL connection string       |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`  | Clerk publishable key              |
| `CLERK_SECRET_KEY`                   | Clerk secret key                   |
| `GEMINI_API_KEY`                     | Google Gemini API key              |
| `E2B_API_KEY`                        | e2b sandbox API key                |

### 3. Database Setup

```bash
# Start PostgreSQL (if using Docker)
docker compose up -d

# Run Prisma migrations
bunx prisma migrate dev
```

### 4. Run Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** You also need to run the Inngest dev server for AI generation to work:
> ```bash
> bunx inngest-cli@latest dev
> ```

## 📁 Project Structure

```
├── app/              # Next.js App Router pages & API routes
├── components/       # Shared UI components (shadcn/ui)
├── modules/          # Feature modules (auth, home, messages, projects)
│   ├── auth/         #   Authentication actions
│   ├── home/         #   Landing page & project creation
│   ├── messages/     #   Chat interface & message handling
│   └── projects/     #   Project CRUD & code viewer
├── inngest/          # AI agent functions & tools
├── lib/              # DB client, utilities, rate limiting
├── prisma/           # Schema & migrations
├── sandbox-templates/# e2b sandbox configuration
└── public/           # Static assets
```

## 📄 License

MIT
