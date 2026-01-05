# Tech Interview Flashcards

A React-based interactive flashcard application designed to help developers practice for technical interviews using active recall. Organized by main concepts (HTML, CSS, JavaScript, etc.) with detailed sub-categories and interactive code examples.

## 🚀 Live Demo
Check out the live version here: [https://sjmcode.github.io/Tech-Interview-Flashcards/](https://sjmcode.github.io/Tech-Interview-Flashcards/)

## ✨ Features

-   **Hierarchical Navigation**: Detailed sidebar with expandable categories (HTML, CSS, JavaScript, Browser, React).
-   **Interactive Code Snippets**: Reveal relevant code examples with a "Show Code" toggle.
-   **Comprehensive Content**: Over 40+ sub-topics covering everything from Semantic HTML to CSS Preprocessors.
-   **Active Recall Tracking**: Mark cards as "Got It" or "Need Practice" to track progress per topic.
-   **Glassmorphism Branding**: A sleek, modern UI built with Tailwind CSS.

## 🛠️ Installation & Local Development

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/SJMcode/Tech-Interview-Flashcards.git
    cd Tech-Interview-Flashcards
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the app**:
    The app will be available at `http://localhost:5173/Tech-Interview-Flashcards/` (or similar).

## 🚢 Deployment

This project is configured for GitHub Pages.

1.  **Build the project**:
    ```bash
    npm run build
    ```

2.  **Deploy to GitHub Pages**:
    ```bash
    npm run deploy
    ```

> [!TIP]
> **SSH Agent Troubleshooting**: If your SSH key has a passphrase and deployment fails, run these commands first:
> ```bash
> eval $(ssh-agent -s)
> ssh-add ~/.ssh/your_private_key
> ```

## 🧰 Tech Stack

-   **React 19**
-   **Vite**
-   **Tailwind CSS**
-   **Lucide React** (Icons)
-   **gh-pages** (Deployment)
