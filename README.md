# Portfolio System

A modern, high-performance portfolio website built with **React**, **Vite**, and **Tailwind CSS**. Designed for detailed project showcases, system thinking documentation, and technical writing.

## Features

- **Project Showcases**: Detailed case studies with deep dives into architecture and decision-making (`/projects`).
- **Arena**: A space for threads and public discourse (`/arena`).
- **Systems**: Documentation of tools and engineering philosophy (`/systems`).
- **Vault**: Atomic knowledge entries and mental models (`/vault`).
- **Writings**: Long-form technical articles (`/writings`).
- **Responsive Design**: Mobile-first architecture using Tailwind CSS.
- **Micro-interactions**: Subtle animations and transitions for a premium feel.

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **UI Components**: Custom components built with [Radix UI](https://www.radix-ui.com/) primitives.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Developer-Sahil/portfolio-system.git
    cd portfolio-system
    ```

2.  Navigate to the frontend directory:
    ```bash
    cd app/frontend
    ```

3.  Install dependencies:
    ```bash
    npm install
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Project Structure

```
c:/dev/portfolio-system/
├── app/
│   └── frontend/          # React Frontend application
│       ├── public/
│       ├── src/
│       │   ├── components/# Reusable UI components
│       │   ├── data/      # Mock data for pages
│       │   ├── lib/       # Utilities (cn, etc.)
│       │   ├── pages/     # Page components (Routes)
│       │   ├── App.jsx    # Main application component & Routing
│       │   └── main.jsx   # Entry point
│       └── ...config files (vite, tailwind, etc.)
├── .gitignore
└── README.md
```

## Contributing

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License.
