# Password Generator With Options 🔐

> **Live demo:** [Open PassGen in your browser](https://9gkc.github.io/PassGen/)

<div align="center">
  <img src="https://img.shields.io/github/last-commit/9gkc/PassGen?style=for-the-badge&label=Last%20Update&color=58A6FF" alt="Last Update">
  <img src="https://img.shields.io/github/stars/9gkc/PassGen?style=for-the-badge&color=58A6FF" alt="GitHub Stars">
  <img src="https://img.shields.io/github/forks/9gkc/PassGen?style=for-the-badge&color=58A6FF" alt="GitHub Forks">
</div>


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Overview ✨

This is a browser-based **Password Generator with Options** built using vanilla HTML, CSS, and JavaScript. It creates passwords locally with the Web Crypto API, supports configurable character groups, and keeps password history disabled by default to reduce exposure of sensitive values.

## Features 🌟

*   **Customizable Length**: Generate passwords from 8 to 64 characters long.
*   **Secure Randomness**: Uses `crypto.getRandomValues()` rather than `Math.random()`.
*   **Include Numbers**: Option to include numeric characters (0-9).
*   **Include Special Characters**: Option to include special symbols.
*   **One-click Copy**: Copy a generated password through the Clipboard API when permitted.
*   **Privacy-first History**: Local history is opt-in, limited to 10 values, and cleared when disabled.
*   **Responsive Design**: A clean and intuitive user interface that works well on various screen sizes.

## How to Run Locally 💻

Follow these simple steps to get the Password Generator up and running on your local machine:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/9gkc/PassGen.git
    cd PassGen
    ```
2.  **Serve `index.html` over HTTPS or localhost** so the Web Crypto and Clipboard APIs can work reliably. No build process is required.
3.  **Keep history disabled** unless you explicitly accept the risk of storing generated passwords in this browser. Never reuse a generated password across important accounts.

Generate strong passwords locally and handle them as sensitive data.
