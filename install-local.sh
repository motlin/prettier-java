#!/bin/bash

# Script to install Kempt locally for testing
# This script sets up the pre-release version of Kempt for use in other projects

set -e

KEMPT_PACKAGE_PATH="/Users/craig/projects/kempt/local-packages/kempt-2.7.1-beta.1.tgz"
PROJECTS_DIR="/Users/craig/projects"

# Check if the package exists
if [[ ! -f "$KEMPT_PACKAGE_PATH" ]]; then
    echo "Error: Package not found at $KEMPT_PACKAGE_PATH"
    echo "Please run 'just pack' to create the package first"
    exit 1
fi

# Function to set up Kempt for a project
setup_kempt() {
    local project_path="$1"
    local project_name=$(basename "$project_path")
    
    if [[ ! -d "$project_path" ]]; then
        echo "Skipping $project_name - directory not found"
        return
    fi
    
    echo "Setting up Kempt for $project_name..."
    
    # Check if it's a Node.js project
    if [[ -f "$project_path/package.json" ]]; then
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
        
    # Check if it's a mise-based project
    elif [[ -f "$project_path/mise.toml" || -f "$project_path/.mise.toml" ]]; then
        echo "🔧 mise-based project detected"
        echo "📋 To use Kempt in $project_name:"
        echo "   1. Add to your mise.toml:"
        echo "      \"npm:kempt\" = \"file:$KEMPT_PACKAGE_PATH\""
        echo "   2. Run: mise install"
        echo "   3. Update your justfile to use 'kempt' instead of 'prettier-plugin-java'"
        echo "   4. Or use directly: npx kempt --write '**/*.java'"
        
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
}

# Set up in liftwizard
setup_kempt "$PROJECTS_DIR/liftwizard"

# Set up in klass
setup_kempt "$PROJECTS_DIR/klass"

# Return to original directory
cd "$PROJECTS_DIR/kempt"

echo "🎉 Setup complete!"
echo ""
echo "📦 Package created at: $KEMPT_PACKAGE_PATH"
echo "🧪 To test the formatting, you can run:"
echo "   npx kempt --write '**/*.java'"
echo ""
echo "💡 For Maven projects using Spotless, update your pom.xml to use 'kempt' instead of 'prettier-plugin-java'"