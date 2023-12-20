from PIL import Image, UnidentifiedImageError
import os
import colorsys
import json

def calculate_image_statistics(image_path):
    try:
        with Image.open(image_path) as img:
            img = img.convert('RGB')

            # Calculate average RGB
            pixels = list(img.getdata())
            total_r, total_g, total_b = 0, 0, 0
            for pixel in pixels:
                r, g, b = [x for x in pixel]
                total_r += r
                total_g += g
                total_b += b
            avg_r = total_r // len(pixels)
            avg_g = total_g // len(pixels)
            avg_b = total_b // len(pixels)

            # Convert average RGB to HSV
            avg_h, avg_s, avg_v = colorsys.rgb_to_hsv(avg_r / 255.0, avg_g / 255.0, avg_b / 255.0)

            # Normalize values to the specified ranges
            avg_h = round(avg_h * 360)  # Normalize hue to [0, 360]
            avg_s = round(avg_s * 100)  # Normalize saturation to [0, 100]
            avg_v = round(avg_v * 100)  # Normalize value to [0, 100]

            # Get image dimensions
            width, height = img.size

            # Get file size
            file_size = os.path.getsize(image_path)

            return {
                'image_name': os.path.basename(image_path),
                'average_hsv': {'h': avg_h, 's': avg_s, 'v': avg_v},
                'width': width,
                'height': height,
                'file_size': file_size
            }

    except (UnidentifiedImageError, OSError) as e:
        # Log the error or print a message if needed
        print(f"Skipped {image_path} due to {type(e).__name__}: {e}")
        return None

# Directory containing images
image_directory = './images'

# List to store image data
image_data_list = []

# Iterate over each image in the directory
image_files = os.listdir(image_directory)
total_images = len(image_files)
for idx, image_file in enumerate(image_files, start=1):
    image_path = os.path.join(image_directory, image_file)
    image_statistics = calculate_image_statistics(image_path)

    if image_statistics is not None:
        image_data_list.append(image_statistics)

    # Print progress
    print(f"Processed {idx}/{total_images} images")

# Now image_data_list contains a list of dictionaries with normalized image statistics
# print(image_data_list)  # You can access the data here or use it further

json_data = json.dumps(image_data_list, indent=2)

# Write JSON data to a file
with open('image_data.json', 'w') as json_file:
    json_file.write(json_data)
