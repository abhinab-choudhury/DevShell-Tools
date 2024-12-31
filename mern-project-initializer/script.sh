#!/bin/sh

# Function to install required global packages
install_required_packages() {
    echo "Installing required global packages..."
    npm install -g create-vite || { echo "Failed to install create-vite. Exiting..."; exit 1; }
}

# Function to create the backend structure with TypeScript
create_ts_backend() {
    echo "Setting up the TypeScript backend..."

    mkdir -p server/src/{controller,middlewares,routes,utils,database,public,strategies,models,zodschema}
    cd server || { echo "Failed to create server directory. Exiting..."; exit 1; }

    # Initialize Node.js and TypeScript configuration
    npm init -y || { echo "Failed to initialize npm in the server. Exiting..."; exit 1; }
    npm install typescript --save-dev || { echo "Failed to install TypeScript. Exiting..."; exit 1; }
    npx tsc --init || { echo "Failed to initialize TypeScript config. Exiting..."; exit 1; }

    # Create necessary files
    touch src/index.ts \
          src/controller/user.controllers.ts \
          src/routes/auth-routes.ts \
          src/middlewares/rate-limiting.ts \
          src/database/db-connect.ts \
          src/models/user.model.ts \
          src/strategies/google-oauth-strategy.ts \
          .env.example .env vercel.json

    # Add basic .prettierignore and .prettierrc
    printf "node_modules\ndist\nbuild\n" > .prettierignore
    echo '{
        "semi": true,
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 80,
        "tabWidth": 2,
        "arrowParens": "always"
    }' > .prettierrc

    echo "TypeScript backend setup complete!"
    cd ../ || exit
}

# Function to create the React frontend using Vite
create_react_frontend() {
    echo "Setting up the React frontend with Vite..."

    npm create vite@latest client || { echo "Failed to create Vite project. Exiting..."; exit 1; }
    cd client || { echo "Failed to create client directory. Exiting..."; exit 1; }

    read -p "Choose your Package Manager [npm, yarn, pnpm](enter the name) : " PACKAGE_MANAGER

    # Install frontend dependencies
    if $PACKAGE_MANAGER == ""
    $PACKAGE_MANAGER install || { echo "Failed to install npm packages in the client. Exiting..."; exit 1; }

    # Add .prettierignore for frontend
    printf "node_modules\ndist\nbuild\n" > .prettierignore

    echo "React frontend setup complete!"
    cd ../ || exit
}

# Function to initialize a Git repository and make the initial commit
initialize_git_repo() {
    echo "Initializing Git repository..."
    git init || { echo "Failed to initialize Git repository. Exiting..."; exit 1; }
    git add . || { echo "Failed to stage changes. Exiting..."; exit 1; }
    git commit -m "Initial commit for MERN project setup" || { echo "Failed to create initial commit. Exiting..."; exit 1; }
}

# Function to display final instructions
display_final_instructions() {
    echo "MERN Starter Project is ready!"
    echo "Next steps:"
    echo "1. Navigate to your project folder: cd $PROJECT_NAME"
    echo "2. Start the backend: cd server && npm run dev"
    echo "3. Start the frontend: cd client && npm run dev"
    echo "Happy coding!"
}

# Main script execution starts here
echo "Welcome to the MERN Starter Script"

# Prompt for the project name
read -p "Enter the name of your MERN project: " PROJECT_NAME

# Create project directory
mkdir "$PROJECT_NAME" || { echo "Failed to create project directory. Exiting..."; exit 1; }
cd "$PROJECT_NAME" || { echo "Failed to enter project directory. Exiting..."; exit 1; }

# Create essential files in the root directory
touch README.md CODE-OF-CONDUCT.md LICENSE.md SECURITY.md

# Call functions to set up the project
install_required_packages
create_react_frontend
create_ts_backend
initialize_git_repo
display_final_instructions
