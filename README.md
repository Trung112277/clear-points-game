# 🎯 Clear Points Game

An exciting React game where players must click points in numerical order before they disappear!

![Game Demo](public/video/Clear%20points%20game%20test.mp4)

## 🎮 **Core Features**

### **Core Gameplay**
- **Sequential Clicking**: Must click points in ascending numerical order (1 → 2 → 3 → ...)
- **Countdown System**: Each point has a 3-second countdown before disappearing
- **Validation**: Wrong order = Game Over immediately
- **Win Condition**: Click all points correctly = Victory!

### **Game Modes**
- **Manual Play**: Play manually with mouse
- **Auto Play**: AI automatically plays with correct sequence
- **Game Over State**: When wrong, game completely "freezes"

### **UI/UX Features**
- **Responsive Design**: Compatible with all screen sizes
- **Real-time Timer**: Track completion time
- **Dynamic Styling**: Colors change based on game state
- **Hover Effects**: Smooth interaction effects

## 🛠️ **Technologies Used**

### **Frontend Framework**
- **React 19** with TypeScript
- **Vite** - Fast and modern build tool
- **Tailwind CSS** - Utility-first CSS framework

### **State Management**
- **React Context API** - Global state management
- **Custom Hooks** - Reusable and optimized logic
- **TypeScript** - Type safety and IntelliSense

### **Performance & Animation**
- **useCallback & useMemo** - Optimize re-renders
- **useRef** - Prevent stale closures
- **RequestAnimationFrame** - Smooth animations
- **Compensated Timers** - Handle tab switching

## 📁 **Project Structure**

```
src/
├── components/
│   ├── feature/           # Game components
│   │   ├── button/        # Play, Auto-play, Restart
│   │   ├── game-container/ # Main game area
│   │   ├── game-controls/  # Control panel
│   │   ├── heading/       # Game title/status
│   │   ├── next-count/    # Next number indicator
│   │   ├── points/        # Point components
│   │   └── time/          # Timer display
│   └── ui/                # Reusable UI components
├── contexts/               # Game state management
├── hooks/                  # Custom logic hooks
├── types/                  # TypeScript definitions
├── utils/                  # Utility functions
└── constants/              # Game configuration
```

## 🎯 **Game Rules**

### **1. Game Initialization**
- Enter number of points to play (5-2000)
- Click "Play" to start
- Points appear randomly on screen

### **2. How to Play**
- **Click in correct order**: 1 → 2 → 3 → 4 → ...
- **Each point has 3s countdown**: Must click before disappearing
- **Wrong order**: Game Over immediately
- **Correct click**: Point disappears, continue with next number

### **3. Game States**
- **Playing**: Currently playing
- **Game Over**: Wrong sequence clicked
- **All Cleared**: All points completed
- **Auto-playing**: AI is playing

### **4. Win/Lose Conditions**
- **Win**: Click all points correctly in sequence
- **Lose**: Click wrong order at any time

## 🚀 **Installation & Setup**

### **System Requirements**
- Node.js 18+ 
- npm or yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

### **Step 1: Clone Repository**
```bash
git clone https://github.com/Trung112277/clear-points-game.git
cd clear-points-game
```

### **Step 2: Install Dependencies**
```bash
npm install
# or
yarn install
```

### **Step 3: Run Development Server**
```bash
npm run dev
# or
yarn dev
```

### **Step 4: Build for Production**
```bash
npm run build
# or
yarn build
```

## 🔧 **Game Configuration**

### **Game Constants** (`src/constants/game.ts`)
```typescript
export const GAME_CONSTANTS = {
  CONTAINER_SIZE: 600,        // Game area size
  POINT_SIZE: 50,             // Individual point size
  MIN_POINTS: 5,              // Minimum points to start
  MAX_POINTS: 2000,           // Maximum points allowed
  POINT_COUNTDOWN: 3,         // Countdown time (seconds)
  FADE_OUT_DURATION: 0.5,     // Fade out duration
  COUNTDOWN_INTERVAL: 100,    // Countdown update interval (ms)
  COUNTDOWN_DECREMENT: 0.1,   // Countdown decrease per update (seconds)
}
```

### **Environment Variables**
```env
# Development mode
VITE_DEV_MODE=true

# Logging level
VITE_LOG_LEVEL=debug
```

## 🎨 **Custom Hooks Architecture**

### **useGame** - Core Game State
```typescript
const { isPlaying, time, points, gamePoints } = useGame();
```
- Manages main game state
- Timer and scoring
- Game initialization and reset

### **usePointStates** - Point Management
```typescript
const { pointStates, handlePointClick } = usePointStates(gamePoints, setGameOver);
```
- Manages individual point states
- Handles click validation
- Countdown and visibility logic

### **useGameLogic** - Game Flow Control
```typescript
const gameLogic = useGameLogic({
  isPlaying, gamePoints, pointStates, isAllCleared, gameOver,
  setIsAllCleared, stopTimer, resetPoints, initializePoints, updateCountdown
});
```
- Controls game flow
- Timer management
- State transitions

### **useAutoPlay** - AI Auto-play
```typescript
const { isAutoPlaying, canAutoPlay } = useAutoPlay({
  pointStates, handlePointClick
});
```
- Automatically plays game
- Clicks in correct sequence
- Performance optimization with useRef

## 🎬 **Video Demo**

Watch the full demo video at: [`public/video/Clear points game test.mp4`](public/video/Clear%20points%20game%20test.mp4)

This video demonstrates:
- Basic gameplay
- Auto-play functionality
- Game over when clicking wrong
- Responsive design
- Smooth performance

## 🚀 **Advanced Features**

### **Performance Optimization**
- **useCallback**: Prevent unnecessary re-renders
- **useMemo**: Cache expensive calculations
- **useRef**: Prevent stale closures in timers
- **Compensated Timers**: Handle tab switching

### **Responsive Design**
- **Flexible Container**: max-w: 800px, min-w: 300px
- **Mobile First**: Compatible with all devices
- **Dynamic Sizing**: Automatically adjusts to screen

### **Error Handling**
- **Game Over State**: Handle wrong clicks
- **Input Validation**: Validate point numbers
- **State Recovery**: Safe game reset

## 🧪 **Development Guidelines**

### **Code Quality Standards**
- **TypeScript**: Strict mode enabled
- **ESLint**: Modern React + TypeScript rules
- **Prettier**: Consistent code formatting
- **Performance**: Optimized re-renders and hooks

### **Best Practices**
1. **Custom Hooks**: Extract reusable logic
2. **Type Safety**: Define interfaces for all data structures
3. **Performance**: Use useCallback, useMemo, useRef appropriately
4. **Error Handling**: Implement proper error boundaries
5. **Logging**: Structured logging with console.log

### **Adding New Features**
1. **Types First**: Define TypeScript interfaces
2. **Hook Logic**: Create custom hooks for business logic
3. **Component**: Build UI components
4. **Integration**: Connect to existing game state
5. **Testing**: Ensure proper error handling

## 🐛 **Troubleshooting**

### **Common Issues**

#### **1. Countdown Timer Stops When Switching Tabs**
- **Cause**: Browser throttling timers in background tabs
- **Solution**: Use compensated timers with accumulatedTime logic

#### **2. Auto-play Only Clicks Once**
- **Cause**: Stale closures in setInterval
- **Solution**: Use useRef to store current values

#### **3. Game Over Not Displaying Correctly**
- **Cause**: State not updating in correct order
- **Solution**: Check dependency arrays in useEffect

### **Debug Mode**
Enable debug logging in development:
```typescript
// Console logs with emojis for easy debugging
console.log('🎮 Game state:', { isPlaying, gameOver, isAllCleared });
console.log('⏰ Timer:', { time, countdown });
console.log('🎯 Points:', { clicked: clickedPoints, remaining: remainingPoints });
```

## 📊 **Performance Monitoring**

### **Render Performance**
```typescript
import { usePerformance } from '@/hooks';

function MyComponent() {
  const { logRender, measurePerformance } = usePerformance();
  
  useEffect(() => {
    logRender('MyComponent');
  });
  
  const handleClick = () => {
    measurePerformance('clickHandler', () => {
      // Expensive operation
    });
  };
}
```

### **Memory Management**
- **Cleanup Timers**: Proper cleanup in useEffect
- **Event Listeners**: Remove listeners when component unmounts
- **State Cleanup**: Reset state when game restarts

## 🤝 **Contributing**

### **Development Workflow**
1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Follow coding standards
4. Add tests if applicable
5. Submit pull request

### **Code Review Checklist**
- [ ] TypeScript types defined
- [ ] Performance optimized
- [ ] Error handling implemented
- [ ] Responsive design tested
- [ ] Console logs cleaned up

## 📄 **License**

This project is licensed under the MIT License.

## 🙏 **Acknowledgments**

- **React Team** - Amazing framework
- **Vite** - Fast build tooling
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety and developer experience

## 📞 **Contact & Support**

For issues or suggestions, please:
- Create an issue on [GitHub](https://github.com/Trung112277/clear-points-game)
- Contact directly via email: nqnhattrung2001@gmail.com
- Join discussions in the repository

---

**🎮 Happy Gaming! 🎯**

*Clear Points Game - Challenge your mind with sequential clicking!*
