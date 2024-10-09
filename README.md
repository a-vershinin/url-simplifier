# URL Simplifier App

A URL Simplifier application built using the MENN stack (MongoDB, Express.js, Next.js, and Node.js) and styled with Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Production](#production)
- [License](#license)

## Features

- Shorten URLs and store them in a MongoDB database
- Redirect shortened URLs to the original URLs
- Responsive and modern UI using Tailwind CSS
- Copy shortened URLs to the clipboard


## Installation

Clone the repository:

```
git clone https://github.com/a-vershinin/url-simplifier
```

### Server

1. Install the server dependencies:

```
cd url-simplifier/server
npm install
```

2. Create a `.env` file from `.env.example` in the `./server` directory

3. Start the server in development mode:

```
npm run dev
```

### Client

1. Install the client dependencies:

```
cd url-simplifier/client
npm install
```

2. Create a `.env` file from `.env.example` in the `./client` directory

3. Start the client server development mode:

```
npm run dev
```

The client will run on `http://localhost:4000` and the server will run on `http://localhost:3000`.

## Usage

1. Open your browser and go to `http://localhost:4000`.
2. Enter a URL in the input field and click the "Simplify" button.
3. The app will display a new shorten url. Click the shortened URL to be redirected to the original URL.
4. Use the "Copy" button to copy the short URL to your clipboard.
5. View the full list of URLs already added.

## Production

To build and deploy the application for production:

1. **Build and Start the Client**
```
npm run build
npm run start
```

2. **Build and Start the Server**
```
npm run build
npm run start
```

3. **Deploy the Application**

Deploy your application using your preferred cloud provider or hosting service. For example, you can use [Vercel](https://vercel.com/) for client and [Render](https://render.com/) for server

Preview: [URL Simplifier App](https://url-simplifier-client.vercel.app/)
