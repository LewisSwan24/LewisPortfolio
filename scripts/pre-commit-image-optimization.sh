#!/bin/sh
# Pre-commit hook for image optimization
# Place this in .git/hooks/pre-commit (and make it executable)

echo "🖼️  Checking for images to optimize..."

# Check if sharp-cli is installed
if ! command -v sharp &> /dev/null; then
    echo "⚠️  sharp-cli not found. Install with: npm install -g sharp-cli"
    exit 1
fi

# Find all added/modified images
STAGED_IMAGES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(jpg|jpeg|png)$' || true)

if [ -z "$STAGED_IMAGES" ]; then
    echo "✅ No images to optimize"
    exit 0
fi

# Optimize each image
echo "🔄 Optimizing images..."
for file in $STAGED_IMAGES; do
    if [ -f "$file" ]; then
        # Create backup
        cp "$file" "${file}.backup"
        
        # Optimize with sharp
        sharp "$file" --optimize --output "$file" 2>/dev/null || true
        
        # Restore backup if optimization failed or increased size
        if [ $? -ne 0 ] || [ "$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)" -gt "$(stat -f%z "${file}.backup" 2>/dev/null || stat -c%s "${file}.backup" 2>/dev/null)" ]; then
            mv "${file}.backup" "$file"
        else
            rm "${file}.backup"
            git add "$file"
        fi
    fi
done

echo "✅ Image optimization complete"
