# 🛍️ E-Commerce Automation Framework

![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Cucumber](https://img.shields.io/badge/Cucumber-232F3E?style=for-the-badge&logo=cucumber&logoColor=43B02A)

This repository contains an **End-to-End (E2E) Test Automation Framework** built for testing an E-Commerce platform (LambdaTest Playground).

The project is designed using **Cypress** integrated with **Cucumber (BDD)** and follows the **Page Object Model (POM)** design pattern to ensure scalability, maintainability, and readability.

## 🚀 Key Features

* **Behavior-Driven Development (BDD):** Test scenarios are written in Gherkin (`.feature` files), making them readable for non-technical stakeholders.
* **Page Object Model (POM):** UI elements and actions are separated from the test logic, making the code reusable and easy to maintain.
* **Modular Structure:** Features, steps, and pages are organized by modules (`Authentication`, `Dashboard`, `Transaction`).
* **Dynamic Data:** Includes logic for random email generation and dynamic selectors for menu navigation.
* **Cloud Reporting:** Integrated with **Cypress Cloud** for video recording, screenshots, and analytics.
* **Cross-Browser Support:** Capable of running on Chrome, Electron, and Edge.

## 🛠️ Tech Stack

* **Language:** JavaScript (Node.js)
* **Framework:** Cypress (v13+)
* **Preprocessor:** @badeball/cypress-cucumber-preprocessor
* **Bundler:** Esbuild
* **CI/CD & Reporting:** Cypress Cloud

## 📂 Project Structure

```text
cypress/
├── e2e/
│   ├── common-steps/       # Step Definitions (Logic)
│   │   ├── Authentication/
│   │   ├── Dashboard/
│   │   └── Transaction/
│   └── feature/            # Gherkin Scenarios
│       ├── Authentication/
│       ├── ShopCategory/
│       └── Transaction/
├── pages/                  # Page Objects (Selectors & Actions)
│   ├── Authentication/
│   ├── Dashboard/
│   ├── Transaction/
│   └── HomePage.js
├── support/                # Custom commands & E2E config
└── videos/                 # Test Execution Recording