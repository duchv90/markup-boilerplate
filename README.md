
# Project Name

Markup boilerplate using Gulp as a task runner, Pug for HTML templating, SCSS for styling, and JavaScript for interactivity.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/duchv90/markup-boilerplate.git
   cd your-project
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

---

## Features

- Automated build process with Gulp.
- HTML templating using Pug.
- SCSS compilation and minification.
- JavaScript bundling and transpilation.
- Live browser reload with Gulp.

---

## Technologies

- **Task Runner:** Gulp
- **HTML Templating:** Pug
- **CSS Preprocessor:** SCSS
- **JavaScript:** ES6+
- **Live Reload:** BrowserSync

---

## Folder Structure

```plaintext
project/
├── src/
│   ├── pug/
│   │   ├── index.pug
│   │   └── components/
│   ├── scss/
│   │   ├── main.scss
│   │   └── partials/
│   ├── js/
│   │   └── global.js
│   └──assets/
│       ├── images/
│       └── fonts/
├── dist/
│   └── (Generated files)
├── gulpfile.js
├── package.json
└── README.md
```

---

## Usage

### Run Development Server

To start a development server with live reload:

```bash
gulp start
```

OR

```bash
gulp dev
```

### Build for Production

To build the project for production:

```bash
gulp build
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- [Gulp.js Documentation](https://gulpjs.com/docs/en/getting-started/quick-start)
- [Pug Documentation](https://pugjs.org/api/getting-started.html)
- [SCSS Documentation](https://sass-lang.com/documentation)
