#!/bin/bash

# Navigate to the server directory 
cd ~/Desktop/CP\ Data\ Processing\ App/server || {
    echo "Failed to navigate to the server directory"
    exit 1
}

# Start the flask server
if python3 server.py; then 
    echo "Server Start Script Executed..."
else
    echo "Server Start Script Failed to Execute..."
    exit 1
fi
