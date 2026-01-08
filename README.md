# 🛒 Cypress E2E Automation Framework - Ecommerce Playground

> **🚧 PROJECT STATUS: ACTIVE DEVELOPMENT (IN PROGRESS) 🚧**
>
> *This project is currently being actively developed and refined. New scenarios, optimizations, and features are being added regularly.*

## 📋 Overview
This repository contains an automated testing framework built with **Cypress** and **Cucumber (BDD)** for an E-commerce Sandbox website. The framework is designed to demonstrate modern E2E testing practices, focusing on maintainability, scalability, and robust error handling utilizing the **Page Object Model (POM)** pattern.

## 🛠️ Tech Stack
* **Framework:** Cypress (E2E Testing)
* **Language:** JavaScript (Node.js v20)
* **Design Pattern:** Page Object Model (POM)
* **BDD:** Cucumber (Gherkin Syntax)
* **Reporting:** Allure Report & GitHub Pages (Automated)
* **CI/CD:** GitHub Actions

## 📊 Automated Reporting & CI/CD
This project is integrated with **GitHub Actions** to provide a fully automated testing pipeline.

* **Live Test Report:** [![Allure Report](https://img.shields.io/badge/Allure-Report-green?style=for-the-badge&logo=allure)](https://dwiagusr.github.io/cypress-ecommerce-automation/)
  > 🔗 **[Click here to view the latest Live Allure Dashboard](https://dwiagusr.github.io/cypress-ecommerce-automation/)**

* **CI/CD Pipeline:**
  * **Automated Trigger:** Tests run automatically on every `push` to any branch or `pull_request` to `main`.
  * **Manual Trigger:** Ability to run tests manually via `workflow_dispatch` in GitHub Actions.
  * **Continuous Deployment:** Allure reports are automatically generated and deployed to GitHub Pages after every run, ensuring stakeholders always see the latest test results.

## 📂 Project Structure
The project follows a modular structure to ensure maintainability:

```text
CYPRESS\
+---downloads
+---e2e
|   +---common-steps           # Step Definitions (Logic layer)
|   |   +---Authentication
|   |   +---Dashboard
|   |   +---ShopCategory
|   |   \---Transaction
|   |
|   \---feature                # Gherkin Feature Files (Scenarios)
|       +---Authentication
|       +---Dashboard
|       +---ShopCategory
|       \---Transaction
|
+---fixtures                   # Test Data (JSON/Excel)
|       dataCheckout.json
|       dataCheckout.xlsx
|
+---pages                      # Page Objects (Selectors & Actions)
|   +---Authentication
|   +---Dashboard
|   +---ShopCategory
|   \---Transaction
|
+---screenshots                # Evidence of failures/runs
\---support                    # Custom commands & config
```

## ✨ Key Features Implemented

### 1. Page Object Model (POM)
Complete separation of test logic (Step Definitions) from UI interaction logic (Pages) for better reusability.
* **Authentication:** Login & Register pages.
* **Dashboard:** Homepage navigation, global search, and dynamic side-filters.
* **Transaction:** Product details, cart management, and checkout billing forms.

### 2. Data-Driven Testing (DDT)
* **JSON Integration:** Utilizes `fixtures/dataCheckout.json` to execute checkout loops with multiple data sets (iterative testing).
* **Dynamic Form Filling:** Automates input entry based on external data sources efficiently.

### 3. Robust Handling Strategies (Advanced)
* **🔄 Fallback Strategy (Self-Healing):** Implemented smart logic to handle **"Out of Stock"** items. If the automated test encounters an out-of-stock product, it dynamically retries with the next available product instead of failing.
* **👁️ Dynamic Selectors:** Usage of robust jQuery-style filtering (e.g., `.filter(':visible')`) to correctly interact with responsive elements, resolving conflicts between Mobile and Desktop DOM elements.
* **⏳ Smart Waiting:** Optimized `cy.intercept` strategies to wait for network API responses, eliminating flaky tests caused by hard-coded sleeps.

## 🧪 Test Scenarios Covered
* **Authentication:**
    * Valid & Invalid Login flows.
    * User Registration.
* **Shopping & Browsing:**
    * Browsing Categories (e.g., Mobiles).
    * Product Search functionality.
    * Sidebar Filtering (Price range, Stock status).
* **Checkout Transaction:**
    * Standard Checkout flow (End-to-End).
    * **DDT:** Checkout loop using multiple user profiles.
    * **Negative Testing:** Validation of mandatory fields and error handling.

## ⚙️ Prerequisites
Before running the tests, ensure you have the following installed:
* **Node.js** (v14 or higher)
* **npm** (Node Package Manager)

## 🚀 How to Run

1. **Install Dependencies:**
    ```bash
    npm install
    ```

2. **Open Cypress Test Runner (GUI):**
    ```bash
    npx cypress open
    ```

3. **Run All Tests with Allure Report:**
    ```bash
    npm run test:allure
    ```
4. **Generate & Open Report Locally:**
    ```bash
    npm run allure:report && npm run allure:open
    ```

---
Maintained by **Dwi Agus Rianto - QA Engineer**