**A LFG website for College Students. Made in React.**

Uses React as the frontend and SQL as the backend. Allows for students across campuses to find and join groups who like playing similar games

## How to run

### Frontend (without backend)
1. Clone this repo
2. run this command in your terminal
```bash
git switch testFrontend
```
4. Make sure [npm](https://nodejs.org/en/download/package-manager) is installed on your device
5. Run `npm i` in your terminal to install dependencies
6. After dependencies are installed, run `npm run dev` in your terminal


### Frontend (With backend)
This is a bit time-intensive. Takes roughly 30-45 minutes if you follow the videos for the backend. If you only want to see the UI follow the steps above.
1. Make sure [npm](https://nodejs.org/en/download/package-manager) is installed on your device
2. Run `npm i` in your terminal to install dependencies
3. After dependencies are installed, run `npm run dev` in your terminal and go to backend section

#### Backend (tested on macOS)
1. Install SQL & MySQLWorkbench (We used [This video for macOS](https://www.youtube.com/watch?v=3BFxALltQaM))
2. go into the connection from the home page in MySQLWorkbench (you can skip steps 2-4 if you [follow this video](https://youtu.be/wgRwITQHszU?si=jVjhFsbzbrpLGmU4&t=398))
3. Create a new database
4. Add the two sql files as schemas and execute it by pressing the lightning bolt icon
5. After you're done setting up the database, go to your local campus-lfg directory and cd into backend
6. Run `npm start`
7. Refresh the frontend, it should be connected now
