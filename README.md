# Stock Portfolio Manager

A modern, feature-rich stock portfolio management application built with React, TypeScript, and Zustand.

## 🚀 Features

-  Real-time portfolio value tracking
-  Interactive charts (Line & Bar) for stock visualization
-  Add, edit, and delete stocks
-  Search and filter functionality
-  Sort by ticker, gain/loss, or value
-  LocalStorage persistence
-  Responsive design
-  Form validation
-  Comprehensive test coverage

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **State Management**: Zustand
- **Charts**: Recharts
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Build Tool**: Vite

## 📦 Installation
```bash
# Clone the repository
git clone 
cd stock-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🧪 Running Tests
```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```


# Usage

### Adding a Stock
1. Click the "Add Stock" button
2. Fill in the required fields:
   - Ticker Symbol (1-5 uppercase letters)
   - Company Name
   - Quantity (positive number)
   - Purchase Price
   - Date of Purchase
3. Click "Add Stock" to save

### Editing a Stock
1. Click the edit icon next to any stock
2. Update the desired fields
3. Click "Update Stock" to save changes

### Deleting a Stock
1. Click the delete icon next to any stock
2. Confirm the deletion in the popup dialog

### Filtering & Sorting
- Use the search bar to filter by ticker or company name
- Select sort criteria from the dropdown (Ticker, Gain/Loss, Value)
- Toggle sort order (ascending/descending) with the arrow button

##  Features in Detail

### Portfolio Summary
- **Portfolio Value**: Total current value of all stocks
- **Total Gain/Loss**: Difference between current and purchase values
- **Total Stocks**: Number of stocks in portfolio

### Charts
- **Line Chart**: Shows stock price trends over time
- **Bar Chart**: Displays trading volume

### Data Persistence
- Portfolio data is automatically saved to browser's localStorage
- Data persists across browser sessions

## Test Coverage

Tests include:
- Zustand store operations (add, update, delete)
- Component rendering
- User interactions
- Form validation
- Calculations (gain/loss)

##  Deployment
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT License

## Author

Baburam Bista

---

Made with love using React + TypeScript