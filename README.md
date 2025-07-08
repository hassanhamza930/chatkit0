# ChatKit0
![image](https://github.com/user-attachments/assets/2f0e8547-82fa-4be1-89df-6b4db3951f1f)
![image](https://github.com/user-attachments/assets/f0a5c460-0b78-4185-9468-b34256b15269)
ChatKit0 is a sleek, modern chat application that serves as an abstraction layer over the OpenRouter.ai API. It provides a clean and intuitive interface for interacting with a variety of large language models (LLMs) available through OpenRouter.

## About The Project

This project is designed to be a starting point for building powerful and customizable chat applications. By leveraging OpenRouter, it allows you to easily switch between different LLMs from various providers without changing the core application logic. Your API keys are stored securely in your browser's local storage and are never transmitted anywhere else.

### Features

- **Multi-Model Support**: Access any LLM supported by OpenRouter.ai.
- **BYOK (Bring Your Own Key)**: Provide your own OpenRouter API key to use premium models. If no key is provided, the application can fall back to a default key for free models. Your key is stored securely in the browser's local storage.
- **Real-time Streaming**: Responses from the LLMs are streamed in real-time, providing a smooth and responsive user experience.
- **Clean UI**: A modern and responsive user interface built with Next.js, TypeScript, and Tailwind CSS.
- **Chat History**: Your conversations are saved locally, allowing you to switch between them.
- **Markdown Rendering**: Messages are rendered with markdown support, including code blocks with syntax highlighting.
- **Local Storage**: API keys and chat history are stored in your browser's local storage.
- **Responsive Design**: The application is designed to work on both desktop and mobile devices.
- **Clean Codebase**: The project follows a clean and organized structure, separating UI components from business logic (custom hooks), making it easy to understand, maintain, and extend.

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

Make sure you have Node.js and npm (or yarn/pnpm) installed on your machine.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/hassanhamza930/chatkit0
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Set up environment variables. Create a file named `.env` in the root of your project and add the following:
    ```sh
    NEXT_PUBLIC_OPENROUTER_KEY="your_openrouter_api_key"
    ```
    This key will be used as a fallback if no key is provided in the application's UI. You can get an API key from [OpenRouter.ai](https://openrouter.ai/).

### Running the Application

To run the app in development mode, use the following command. This will start the development server on `http://localhost:3000`.

```sh
npm run dev
```

## Usage

1.  Once the application is running, open it in your browser at `http://localhost:3000`.
2.  Click on the "API Key" button in the header to add your OpenRouter API key. You can get an API key from [OpenRouter.ai](https://openrouter.ai/).
3.  Once you've added your key, you can start a new chat and select any of the available models.
4.  Your chats will be saved in the sidebar, and you can switch between them at any time.
