
# 🧪 Playwright Test Automation Project

This repository contains Playwright end-to-end tests built with the Page Object Model (POM) pattern to ensure maintainability, scalability, and clean test structure.

---

## 🚀 **Prerequisites**

Before you begin, ensure you have:

* **Node.js** (LTS recommended)
* **npm** (comes with Node)

Check versions:

```bash
node -v
npm -v
```

---

## 📥 **1. Clone the Repository**

```bash
git clone https://github.com/tjl352/SDET.git
cd SDET
```

---

## 📦 **2. Install Dependencies**

```bash
npm install
```

---

## ▶️ **3. Run Tests**

```bash
npx playwright test
```

---

# 🔧 Optional Commands

### **Run all tests**

```bash
npx playwright test
```

### **UI Mode (visual test runner)**

```bash
npx playwright test --ui
```

### **Run tests on a specific browser (Chromium example)**

```bash
npx playwright test --project=chromium
```

### **Run a specific test file**

```bash
npx playwright test example
```

### **Debug mode**

```bash
npx playwright test --debug
```

### **Launch Codegen (auto-generate tests)**

```bash
npx playwright codegen
```

---

## 📂 **Project Structure (Recommended)**

If you want this section included, here’s a standard layout:

```
├── tests/
│   ├── login.spec.ts
│   ├── example.spec.ts
│
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## ✨ **Features**

* Page Object Model (POM)
* TypeScript for type-safety and scalability
* Playwright test runner
* Easy to extend and maintain

---

## 🤝 Contributing

PRs are welcome.
Open an issue if you'd like to request a feature or report a bug.

---

## 📄 License

MIT 