# Time Management Dashboard

A personal productivity tool built with React to help you manage your time effectively, overcome procrastination, and achieve your goals.

![alt text](https://github.com/honkeygenius/rtmd/tree/main/images/RTMD%20Screenshot%202025-05-12%20225244.jpg "React Time Management Dashboard")

## Features

### 🕒 Pomodoro Timer
- 25-minute focused work sessions
- Simple start/reset controls
- Helps combat procrastination through time-blocking

### ✅ Task Management System
- Add, organize, and complete tasks in one place
- Prioritize tasks with color-coded priority levels (high, medium, low)
- Filter tasks by status (all, active, completed)
- Visual completion tracking

### 📋 Time Management Tips
- Built-in productivity advice
- Strategies for breaking down overwhelming tasks
- Best practices for effective time management

## Why Use This Dashboard?

This dashboard helps you:
- **Overcome procrastination** through the Pomodoro technique
- **Reduce feeling overwhelmed** by organizing and prioritizing tasks
- **Increase productivity** with focused work sessions
- **Achieve goals** by tracking progress and completion
- **Reduce stress** through better time management

## Getting Started

### Prerequisites
- Node.js and npm installed on your computer
- GitHub account (for deployment)

### Local Development
1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deployment
This dashboard is set up for easy deployment to GitHub Pages. To deploy:
1. Update the `homepage` field in `package.json` with your GitHub username
2. Run:
   ```
   npm run deploy
   ```

## How to Use

### Pomodoro Timer
1. Click "Start" to begin a 25-minute focus session
2. Work on your task until the timer ends
3. Take a 5-minute break when the timer completes
4. Click "Reset" to start another session

### Task Management
1. Enter task details in the input field
2. Click "Add Task" to add it to your list
3. Set priority levels for each task
4. Check tasks off as you complete them
5. Use filters to focus on active or completed tasks

## Customization

### Changing Timer Duration
You can customize the Pomodoro session length by modifying the `pomodoroTimer` state in the code:

```javascript
const [pomodoroTimer, setPomodoroTimer] = useState(25 * 60); // Change 25 to your desired minutes
```

### Adding Features
Some features you might want to add:
- Task categories or tags
- Data persistence with localStorage
- Break timers
- Daily/weekly goals
- Progress statistics

## Technologies Used

- React
- Tailwind CSS
- Lucide Icons

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The Pomodoro Technique was developed by Francesco Cirillo
- Built with React and Tailwind CSS
- Icons by Lucide