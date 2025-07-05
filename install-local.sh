#!/bin/bash

# Script to install Kempt locally for testing
# This script sets up the pre-release version of Kempt for use in the current project

set -e

KEMPT_PACKAGE_PATH="/Users/craig/projects/kempt/local-packages/kempt-2.7.1-beta.2.tgz"

# Check if the package exists
if [[ ! -f "$KEMPT_PACKAGE_PATH" ]]; then
    echo "Error: Package not found at $KEMPT_PACKAGE_PATH"
    echo "Please run 'just pack' from /Users/craig/projects/kempt to create the package first"
    exit 1
fi

# Function to install globally
install_globally() {
    echo "🌍 Installing Kempt globally..."
    npm install -g "$KEMPT_PACKAGE_PATH"
    echo "✅ Kempt installed globally!"
    echo "📋 You can now use:"
    echo "   - npx kempt --write '**/*.java'"
    echo "   - kempt --write '**/*.java' (if globally installed)"
    exit 0
}

# Function to set up Kempt for a project
setup_kempt() {
    local project_path="$1"
    local project_name=$(basename "$project_path")
    
    echo "Setting up Kempt for $project_name..."
    
    # Check if mise is available and this is a mise project
    if command -v mise &> /dev/null && (cd "$project_path" && mise ls 2>/dev/null | grep -q .); then
        echo "🔧 mise-based project detected"
        echo "📋 Installing Kempt locally for $project_name..."
        
        cd "$project_path"
        
        # Create package.json if it doesn't exist
        if [[ ! -f package.json ]]; then
            echo "Creating package.json..."
            npm init -y > /dev/null
        fi
        
        # Install the local package
        npm install --save-dev "$KEMPT_PACKAGE_PATH"
        
        echo "✅ Kempt installed successfully in $project_name"
        echo "📋 You can now:"
        echo "   1. Use: npx prettier --write '**/*.java' --plugin kempt"
        echo "   2. Add to .prettierrc: { \"plugins\": [\"kempt\"] }"
        echo "   3. Then just use: npx prettier --write '**/*.java'"
        
    # Check if it's a Node.js project
    elif [[ -f "$project_path/package.json" ]]; then
        echo "📦 Node.js project detected - installing via npm"
        cd "$project_path"
        npm install --save-dev "$KEMPT_PACKAGE_PATH"
        
        # Update prettier config if it exists
        if [[ -f .prettierrc.js ]]; then
            echo "Updating .prettierrc.js for $project_name..."
            sed -i '' 's/prettier-plugin-java/kempt/g' .prettierrc.js
        fi
        
        if [[ -f .prettierrc.json ]]; then
            echo "Updating .prettierrc.json for $project_name..."
            sed -i '' 's/prettier-plugin-java/kempt/g' .prettierrc.json
        fi
        
        if [[ -f .prettierrc ]]; then
            echo "Updating .prettierrc for $project_name..."
            sed -i '' 's/prettier-plugin-java/kempt/g' .prettierrc
        fi
        
        echo "✅ Kempt installed successfully in $project_name"
        echo "📋 You can now:"
        echo "   1. Use: npx kempt --write '**/*.java'"
        echo "   2. Or update your prettier config to use 'kempt' plugin instead of 'prettier-plugin-java'"
        
    # Check if it's a Maven project
    elif [[ -f "$project_path/pom.xml" ]]; then
        echo "☕ Maven project detected"
        echo "📋 To use Kempt in $project_name:"
        echo "   1. Extract the package to a local directory:"
        echo "      tar -xzf $KEMPT_PACKAGE_PATH -C /tmp/"
        echo "   2. Install the extracted package globally:"
        echo "      npm install -g /tmp/package"
        echo "   3. Update your Maven configuration to use 'kempt' instead of 'prettier-plugin-java'"
        echo "   4. Or use directly: npx kempt --write '**/*.java'"
        
    else
        echo "❓ Project type not recognized for $project_name"
        echo "📋 To use Kempt manually:"
        echo "   1. Extract and install the package:"
        echo "      tar -xzf $KEMPT_PACKAGE_PATH -C /tmp/"
        echo "      npm install -g /tmp/package"
        echo "   2. Use directly: npx kempt --write '**/*.java'"
    fi
    
    echo ""
    echo "📦 Package: $KEMPT_PACKAGE_PATH"
    echo "🧪 To test the formatting: npx kempt --write '**/*.java'"
}

# Check for global flag
if [[ "$1" == "--global" || "$1" == "-g" ]]; then
    install_globally
fi

# If no arguments provided, show usage
if [[ $# -eq 0 ]]; then
    echo "Usage: $0 [--global|-g] [project-path]"
    echo "  --global, -g    Install globally instead of locally"
    echo "  project-path    Path to project (default: current directory)"
    echo ""
    
    # Use current directory as default
    setup_kempt "$(pwd)"
else
    # Set up for provided project path
    setup_kempt "$1"
fi