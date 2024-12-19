**A LFG website for College Students. Made in React.**

Uses React as the frontend and SQL as the backend. Allows for students across campuses to find and join groups who like playing similar games

## How to run

### Frontend
1. Clone this repo

**To see frontend without installing backend, run this command first `git switch testFrontend`, and then use the next steps**

2. Make sure [npm](https://nodejs.org/en/download/package-manager) is installed on your device
3. Run `npm i`
4. After dependencies are installed, run `npm run dev`

### Backend (tested on macOS)
This is a bit time-intensive. Takes roughly 30-45 minutes if you follow the vidoes. If you only want to see the UI run `git switch testFrontend` and follow the steps above.

1. Install SQL & MySQLWorkbench (We used [This video for macOS](https://www.youtube.com/watch?v=3BFxALltQaM))
2. go into the connection from the home page in MySQLWorkbench (you can skip steps 2-4 if you [follow this video](https://www.youtube.com/watch?v=wALCw0F8e9M))
3. Create a new database by running:
```sql
CREATE DATABASE gaming_db;
USE gaming_db;
```
4. Add the two sql files as schemas and execute it by pressing the lightning bolt icon
5. After you're done setting up the database, go to your local campus-lfg directory and cd into backend
6. Run `npm start`
7. Refresh the frontend, it should be connected now
