#!/usr/bin/env python3
"""
Script to resize logo for Chrome Extension icons
Requires: pip install Pillow
"""

from PIL import Image
import os

# Paths
LOGO_PATH = "assety koncepcyjne/logo.png"
OUTPUT_DIR = "extension/icons"

# Icon sizes for Chrome Extension
SIZES = [16, 48, 128]

def resize_logo():
    """Resize logo to required Chrome Extension icon sizes"""

    # Create output directory if it doesn't exist
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Open original logo
    print(f"Opening logo: {LOGO_PATH}")
    try:
        img = Image.open(LOGO_PATH)
        print(f"Logo loaded: {img.size} ({img.mode})")
    except Exception as e:
        print(f"Error loading logo: {e}")
        return

    # Convert to RGBA if needed (for transparency)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    # Resize to each required size
    for size in SIZES:
        output_path = os.path.join(OUTPUT_DIR, f"icon{size}.png")

        # Resize with high-quality Lanczos resampling
        resized = img.resize((size, size), Image.Resampling.LANCZOS)

        # Save
        resized.save(output_path, 'PNG', optimize=True)
        print(f"Created: {output_path} ({size}x{size})")

    # Also copy full logo to assets
    assets_dir = "extension/assets"
    os.makedirs(assets_dir, exist_ok=True)
    logo_full_path = os.path.join(assets_dir, "logo-full.png")

    # Resize to reasonable size for popup (max 200px height)
    popup_size = (200, 200)
    popup_logo = img.resize(popup_size, Image.Resampling.LANCZOS)
    popup_logo.save(logo_full_path, 'PNG', optimize=True)
    print(f"Created: {logo_full_path} (200x200)")

    print("\nAll icons created successfully!")

if __name__ == "__main__":
    resize_logo()
