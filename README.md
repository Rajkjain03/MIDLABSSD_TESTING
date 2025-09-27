# Backend

## Step 1: Building backend

    Initialization: npm init -y
    Packages: npm install express mongoose cors dotenv

### Step 2: Design the Database Schema

    backend/src/models/questionModel.js (question text, author, status, and timestamp will be stored)

### Step 3: Create the API Controller

    backend/src/controllers/questionController.js to handle all the application logic, such as creating questions and updating their status

### Step 4: Define the API Routes

    Create backend/src/routes/questionRoutes.js to define the API endpoints.

### Step 5: Set up the Server and Database Connection

    backend/src/config/db.js (database connection)
    backend/server.js (Server logic)
    .env file in the backend to store MongoDB connection string.

# Frontend

### Step 1. Initialize Project and Install Dependencies

    npx create-react-app frontend
    cd frontend
    npm install axios(for API calls)

### Step 2. Create Components
    frontend/src/components/QuestionForm.js (for submitting new questions)

### Step 3: Create the Question Card Component
    frontend/src/components/QuestionCard.js to display each question as a sticky note

### Step 4: Create the Filter Controls
    frontend/src/components/FilterControls.js for the instructor's board controls

### Step 5: Assemble the Main Board
    frontend/src/App.js to bring all the components together.

### Step 6: Add CSS for Sticky Notes
    frontend/src/App.css with styles to make it look like a sticky board.
