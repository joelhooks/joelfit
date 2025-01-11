#!/bin/bash

# Fix utils imports
find src/components/ui -type f -name "*.tsx" -exec sed -i '' 's|@/lib/utils|../../lib/utils.js|g' {} +

# Fix component imports
find src/components/ui -type f -name "*.tsx" -exec sed -i '' 's|@/components/ui/\([^"]*\)|./\1.js|g' {} +

# Fix hook imports
find src/hooks -type f -name "*.ts" -exec sed -i '' 's|@/components/ui/\([^"]*\)|../components/ui/\1.js|g' {} + 