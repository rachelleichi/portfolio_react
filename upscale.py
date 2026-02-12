import os
import json
from PIL import Image

# Configuration
SCALE_FACTOR = 4  # 400% increase
PUBLIC_DIR = "./public"
# Folders where your JSONs are located (adjust if different)
JSON_FILES = [
    os.path.join(PUBLIC_DIR, "data/projects.json"),
    os.path.join(PUBLIC_DIR, "data/experiences.json"),
    os.path.join(PUBLIC_DIR, "data/skills.json")
]

# Manual list of core assets not in JSONs
CORE_ASSETS = [
    "bio_bg.png", "bio.png", "footer.png",
    "ccna1.png", "ccna2.png", "ccna3.png", 
    "ccnp.png", "csna.png", "csne.png"
]

def get_all_used_images():
    image_list = set(CORE_ASSETS)
    for json_path in JSON_FILES:
        if os.path.exists(json_path):
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                for item in data:
                    # Get 'img' or 'icon' fields
                    img = item.get('img') or item.get('icon')
                    if img:
                        # Remove leading slash if present
                        image_list.add(img.lstrip('/'))
    return image_list

def upscale_image(image_name):
    img_path = os.path.join(PUBLIC_DIR, image_name)
    if not os.path.exists(img_path):
        print(f"Skipping: {image_name} (File not found)")
        return

    try:
        with Image.open(img_path) as img:
            # Calculate new dimensions
            new_size = (img.width * SCALE_FACTOR, img.height * SCALE_FACTOR)
            
            # Use LANCZOS for the best quality standard upscaling
            # Resampling.LANCZOS is the modern replacement for ANTIALIAS
            upscaled_img = img.resize(new_size, resample=Image.Resampling.LANCZOS)
            
            # Save the image, keeping the original format
            upscaled_img.save(img_path, quality=95, optimize=True)
            print(f"Successfully upscaled: {image_name} to {new_size[0]}x{new_size[1]}")
    except Exception as e:
        print(f"Error processing {image_name}: {e}")

if __name__ == "__main__":
    print("Starting 400% quality/resolution increase...")
    target_images = get_all_used_images()
    
    for img_name in target_images:
        upscale_image(img_name)
        
    print("\nUpscaling complete! All images are now 4x larger.")