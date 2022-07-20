#!/bin/sh

echo "Starting the account migration status api startup script"

echo "Running migrations..."
yarn run typeorm:migration:run
if [ $? -ne 0 ]; then
    echo "STARTUP FAILURE: DATABASE MIGRATION FAILED"
    exit 1
else
    echo "Migration scripts successful: starting app..."
    node dist/main.js
fi
