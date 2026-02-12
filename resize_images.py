import os
import json
from PIL import Image, ImageOps

# Configuration
TARGET_SIZE = (800, 600)  # Width, Height (Adjust this to your preference)
PUBLIC_DIR = "./public"
JSON_FILES = [ "experiences.json"]

def get_images_from_json():
    image_list = []
    for json_file in JSON_FILES:
        path = os.path.join(PUBLIC_DIR, "data", json_file)
        if os.path.exists(path):
            with open(path, 'r') as f:
                data = json.load(f)
                for item in data:
                    if 'img' in item:
                        # Clean the path (remove leading slash)
                        img_path = item['img'].lstrip('/')
                        image_list.append(img_path)
    return list(set(image_list))

def resize_and_crop(image_name):
    img_path = os.path.join(PUBLIC_DIR, image_name)
    if not os.path.exists(img_path):
        print(f"Skipping: {image_name} (Not found)")
        return

    try:
        with Image.open(img_path) as img:
            # ImageOps.fit crops and resizes to fill the target size exactly
            # It maintains the aspect ratio and centers the image
            processed_img = ImageOps.fit(img, TARGET_SIZE, Image.Resampling.LANCZOS)
            
            # Save back to the same path
            processed_img.save(img_path, quality=95)
            print(f"Success: {image_name} is now {TARGET_SIZE}")
    except Exception as e:
        print(f"Error processing {image_name}: {e}")

if __name__ == "__main__":
    target_images = get_images_from_json()
    print(f"Found {len(target_images)} images to process...")
    
    for img_name in target_images:
        resize_and_crop(img_name)
    
    print("\nAll images have been uniformed!")