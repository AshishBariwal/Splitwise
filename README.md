# Splitwise - Expense Sharing Website

A modern, responsive expense sharing website built with HTML, CSS, and JavaScript, inspired by Splitwise. This website allows users to track shared expenses, split bills between multiple people, and calculate settlements efficiently.

## Features

### 🎯 Core Features
- **Add Friends**: Invite and manage friends in your expense group
- **Track Expenses**: Add expenses with descriptions, amounts, and categories
- **Smart Splitting**: Split expenses equally between selected people
- **Balance Tracking**: Real-time calculation of who owes what to whom
- **Settlement Suggestions**: Automatic calculation of optimal settlements to minimize transactions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🎨 User Interface
- **Modern Design**: Clean, intuitive interface with smooth animations
- **Real-time Updates**: Instant balance and settlement calculations
- **Visual Feedback**: Color-coded balances (green for positive, red for negative)
- **Interactive Elements**: Hover effects and smooth transitions
- **Floating Action Button**: Quick access to add new expenses

### 📊 Dashboard Overview
- **Summary Cards**: Quick view of friends count, total expenses, and pending settlements
- **Balance Display**: Individual balance for each friend with visual indicators
- **Recent Expenses**: Latest expense history with details
- **Settlement Suggestions**: Optimized payment recommendations

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with Flexbox and Grid
- **Icons**: Font Awesome 6.0
- **Fonts**: Google Fonts (Roboto)
- **Currency**: Indian Rupees (₹) with proper formatting

## Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required!

### Installation

1. **Download the files**
   ```bash
   # Clone or download the repository
   # You'll need these files:
   # - index.html
   # - styles.css
   # - script.js
   ```

2. **Open the website**
   - Simply double-click `index.html` to open in your browser
   - Or drag and drop `index.html` into your browser window
   - Or use a local server if you prefer

3. **Start using the app**
   - The website works immediately without any setup
   - All data is stored locally in the browser

## How to Use

### Adding Friends
1. Click the "Add Friend" button on the Friends card
2. Enter the friend's name and email
3. Click "Add Friend" to save

### Adding Expenses
1. Click the floating "+" button (bottom right)
2. Fill in the expense details:
   - Description (e.g., "Dinner at Restaurant")
   - Amount in Rupees (e.g., 1200.00)
   - Category (e.g., "Food")
   - Who paid for it
   - Who should split the expense (select multiple people)
3. Click "Add Expense" to save

### Understanding Balances
- **Green balance**: This person is owed money
- **Red balance**: This person owes money
- **Zero balance**: All settled up

### Settlement Suggestions
The website automatically calculates the most efficient way to settle debts:
- Minimizes the number of transactions needed
- Shows who should pay whom and how much
- Updates in real-time as expenses are added

## Project Structure

```
splitwise-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## Key Algorithms

### Balance Calculation
The website calculates balances by:
1. Adding what each person paid
2. Subtracting their share of expenses they're involved in
3. Displaying the net balance for each person

### Settlement Optimization
The settlement algorithm:
1. Sorts people by balance (positive to negative)
2. Matches people who owe money with those who are owed money
3. Calculates the minimum amount needed to settle
4. Suggests optimal payment paths

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Data Storage

- **Local Storage**: All data is stored locally in your browser
- **No Server Required**: Works completely offline
- **Privacy**: Your data never leaves your device
- **Persistence**: Data persists between browser sessions

## Future Enhancements

- [ ] Export to PDF/CSV
- [ ] Multiple groups/rooms
- [ ] Expense categories with icons
- [ ] Receipt image upload
- [ ] Dark mode theme
- [ ] Multi-currency support
- [ ] Recurring expenses
- [ ] Data backup/restore
- [ ] Share expenses via link

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Splitwise
- Icons from Font Awesome
- Fonts from Google Fonts
- Built with vanilla web technologies for maximum compatibility
# Splitwise
