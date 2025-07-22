# 🔴⚡ Pokédex React App ⚡🟡

A modern, feature-rich Pokédex application built with React that allows users to explore, search, compare, and manage their favorite Pokémon. This app leverages the PokéAPI to provide comprehensive Pokémon data with a beautiful, responsive interface.

## ✨ Features

### 🔍 **Search & Discovery**
- Real-time search by Pokémon name or ID
- Advanced filtering by type, generation, and stats
- Sort by various criteria (ID, name, stats, etc.)
- Random Pokémon generator for discovery

### 📊 **Detailed Information**
- Complete Pokémon stats with visual charts
- Type advantages and weaknesses
- Evolution chains with visual representation
- Abilities, moves, and characteristics
- High-quality Pokémon sprites and artwork

### ⚔️ **Comparison System**
- Side-by-side Pokémon comparison
- Visual stat comparisons with charts
- Compare up to multiple Pokémon simultaneously
- Export comparison results

### ❤️ **Favorites Management**
- Add/remove Pokémon from favorites
- Persistent favorites using local storage
- Quick access to favorite Pokémon
- Organize and manage your collection

### 🌙 **Theme System**
- Light and dark mode support
- Persistent theme preference
- Smooth transitions between themes
- Accessible design with proper contrast

### 📱 **Responsive Design**
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Progressive Web App capabilities

### 🚀 **Performance Features**
- React Query for efficient data fetching and caching
- Skeleton loading states for smooth UX
- Image lazy loading and optimization
- Error boundaries for graceful error handling

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **State Management**: React Context API, React Query
- **Styling**: CSS3 with custom properties, CSS Grid/Flexbox
- **Data Fetching**: Axios, React Query
- **Development**: ESLint, Prettier, React DevTools
- **API**: [PokéAPI](https://pokeapi.co/) - RESTful Pokémon API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Pokedex-App.git
   cd Pokedex-App
   ```

2. **Navigate to the project directory**
   ```bash
   cd pokedex
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration if needed.

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser** and visit `http://localhost:3000`

## 🚀 Available Scripts

In the project directory, you can run:

- **`npm start`** - Runs the app in development mode
- **`npm test`** - Launches the test runner
- **`npm run build`** - Builds the app for production
- **`npm run lint`** - Runs ESLint to check code quality
- **`npm run lint:fix`** - Fixes ESLint errors automatically
- **`npm run format`** - Formats code using Prettier
- **`npm run format:check`** - Checks code formatting

## 🏗️ Project Structure

```
pokedex/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── CompareButton.js
│   │   ├── ComparisonPanel.js
│   │   ├── ErrorBoundary.js
│   │   ├── EvolutionChain.js
│   │   ├── FavoriteButton.js
│   │   ├── LoadingSpinner.js
│   │   ├── Pagination.js
│   │   ├── PokemonCardSkeleton.js
│   │   ├── PokemonComparison.js
│   │   ├── RandomPokemonGenerator.js
│   │   ├── SearchAndFilter.js
│   │   ├── StatsChart.js
│   │   └── ThemeToggle.js
│   ├── contexts/             # React Context providers
│   │   ├── ComparisonContext.js
│   │   ├── FavoritesContext.js
│   │   └── ThemeContext.js
│   ├── hooks/               # Custom React hooks
│   │   ├── usePagination.js
│   │   └── usePokemonData.js
│   ├── App.js               # Main application component
│   ├── Home.js              # Home page component
│   ├── PokemonDetail.js     # Pokémon detail page
│   ├── PokemonGrid.js       # Pokémon grid display
│   ├── SearchApp.js         # Search functionality
│   ├── SearchBar.js         # Search bar component
│   ├── elasticSearchConnector.js # Search connector
│   └── index.js             # Application entry point
├── .env.example             # Environment variables template
├── .prettierrc              # Prettier configuration
├── .prettierignore          # Prettier ignore rules
├── package.json             # Project dependencies
└── README.md               # Project documentation
```

## 🎮 Usage

### Basic Navigation
1. **Home Page**: Browse all Pokémon with search and filter options
2. **Pokémon Details**: Click any Pokémon card to view detailed information
3. **Search**: Use the search bar to find specific Pokémon
4. **Favorites**: Click the heart icon to add/remove from favorites

### Advanced Features
- **Comparison**: Use the compare button to add Pokémon to comparison panel
- **Theme Toggle**: Switch between light and dark modes using the theme toggle
- **Random Discovery**: Use the random Pokémon generator to discover new Pokémon
- **Filtering**: Filter by type, stats, or other criteria using the filter panel

## 🌟 Key Components

### PokemonGrid
Displays Pokémon in a responsive grid with pagination, search, and filter capabilities.

### PokemonDetail
Shows comprehensive Pokémon information including stats, evolution chain, and abilities.

### ComparisonPanel
Allows side-by-side comparison of multiple Pokémon with visual stat charts.

### ThemeProvider
Manages application theme state with light/dark mode support.

### FavoritesProvider
Handles favorite Pokémon management with local storage persistence.

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the `pokedex` directory with the following variables:

```env
REACT_APP_API_BASE_URL=https://pokeapi.co/api/v2
REACT_APP_APP_NAME=Pokédex
```

### Styling Customization
The app uses CSS custom properties for theming. You can customize colors and spacing in the CSS files:

```css
:root {
  --primary-blue: #3498db;
  --primary-blue-dark: #2980b9;
  --error-red: #e74c3c;
  /* ... more variables */
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

This project uses ESLint and Prettier for code formatting and quality:

- Run `npm run lint` to check for issues
- Run `npm run lint:fix` to automatically fix issues
- Run `npm run format` to format code with Prettier

## 🐛 Known Issues

- Some Pokémon sprites may take time to load on slower connections
- Evolution chain data might be incomplete for certain Pokémon
- Mobile performance may vary on older devices

## 🔮 Future Enhancements

- [ ] Team builder functionality
- [ ] Pokémon battle simulator
- [ ] Advanced search with more filters
- [ ] User accounts and cloud sync
- [ ] PWA offline capabilities
- [ ] Pokemon location and habitat information
- [ ] Move details and type effectiveness calculator

## 📚 API Reference

This application uses the [PokéAPI](https://pokeapi.co/), a free RESTful API providing comprehensive Pokémon data.

**Main Endpoints Used:**
- `GET /pokemon` - List of Pokémon
- `GET /pokemon/{id}` - Pokémon details
- `GET /pokemon-species/{id}` - Species information
- `GET /evolution-chain/{id}` - Evolution data
- `GET /type` - Pokémon types

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [PokéAPI](https://pokeapi.co/) for providing the comprehensive Pokémon database
- The Pokémon Company for creating the amazing world of Pokémon
- React community for the excellent libraries and tools
- All contributors and users of this project

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the [Issues](https://github.com/yourusername/Pokedex-App/issues) section
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue

---

**Built with ❤️ by Pokemon fans for Pokemon fans!**

*Gotta code 'em all!* 🔴⚪