
# 📧 Email Template Editor

A modern drag-and-drop email template editor built with **Next.js**, **GrapesJS**, and **NextUI**. This project allows users to create, manage, and preview multiple responsive email templates with synchronized centralized content (heading, image, description, etc.).

> ✨ Features:
> - Multiple pre-built templates
> - Centralized dynamic content sync
> - Drag-and-drop email editing via GrapesJS
> - Inline CSS generation for final output
> - Live preview and export to HTML
> - Clean, responsive UI with Tailwind CSS and NextUI

---

## 🚀 Live Preview

https://email-editor-2.vercel.app/

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **UI**: NextUI + TailwindCSS
- **Editor**: GrapesJS
- **Icons**: Lucide
- **Form Management**: React Hook Form + Zod
- **Animation**: Framer Motion
- **Styling Tools**: Tailwind Merge, TailwindCSS Animate

---

## 📁 Project Structure

```
.
├── app/                    # App directory (Next.js)
│   ├── layout.tsx         # Main layout
│   ├── page.tsx           # Main page (Editor UI)
│   └── globals.css        # Global styles
├── components/            # Shared and UI components
│   ├── email-editor.tsx   # GrapesJS editor wrapper
│   ├── template-preview.tsx
│   ├── custom-template-manager.tsx
│   └── ui/                # UI components (accordion, etc.)
├── public/                # Static assets (logo, images)
├── styles/                # Custom styles (if any)
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript config
└── package.json           # Project metadata
```

---

## 🧑‍💻 Getting Started

```bash
# Clone the repo
git clone https://github.com/titusharma12/email-editor-2.git

# Navigate to the project folder
cd email-template-editor

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build for Production

```bash
npm i
npm run dev
npm run start
```

---

## 💡 How It Works

- Uses GrapesJS for the drag-and-drop interface.
- Templates share centralized content state.
- Editing the content updates all templates in real-time.
- Export generates final HTML with **inline CSS**.
- Built-in preview with tabs for “Edit”, “Preview”, and “Code”.

---

## 📄 License

This project includes the [GrapesJS open-source license (BSD-3-Clause)](https://github.com/GrapesJS/grapesjs/blob/master/LICENSE).

---

## 🤝 Contribution

Feel free to fork the repo and submit a PR for improvements or new features.
