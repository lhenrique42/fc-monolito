# Full Cycle Modular Monolith (fc-monolito)

A modular monolith application designed to demonstrate **Domain-Driven Design (DDD)**, **Clean Architecture**, and **Clean Code** principles using TypeScript. Developed as part of the Full Cycle (FC) architecture program.

---

## 📦 Directory Structure & Module Design

Each module under `src/modules` follows clean architecture boundaries:

```text
src/modules/<module-name>/
├── domain/       # Core business entities, value objects, and domain logic
├── facade/       # Exposes clean APIs/facades to other modules
├── factory/      # Instantiates use cases, repositories, and facades with injected dependencies
├── gateway/      # Domain interface (ports) for data access or external APIs
├── repository/   # Infrastructure adapters (Sequelize models & repositories)
└── usecase/      # Application services orchestrating business logic and DTOs
```

### Core Modules

1. **`product-adm`**: Product administration, allowing creation of products and real-time stock checks.
2. **`client-adm`**: Management and lookup of client accounts.
3. **`store-catalog`**: Read-only store view exposing products and pricing for the customer catalog.
4. **`payment`**: Orchestrates transaction processing and payment status changes.
5. **`invoice`**: Manages billing, generates customer invoices, and allows looking up existing invoices.
6. **`@shared`**: Hosts shared kernel abstractions (domain identifiers, address value objects, and base entity logic).

---

## 🛠️ Tech Stack

- **Runtime & Language**: Node.js & TypeScript
- **Database / ORM**: Sequelize with SQLite (in-memory for isolated integration tests)
- **Compiler**: SWC (Speedy Web Compiler) for ultra-fast TypeScript compilation and testing execution
- **Testing Framework**: Jest

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Running Tests

This project includes unit and integration tests for all module repositories, use cases, and facades. To run the tests:

```bash
npm test
```

Tests run in two phases:

1. TypeScript compilation check using `tsc --noEmit`.
2. Test runner execution using Jest with `@swc/jest` for speed.
