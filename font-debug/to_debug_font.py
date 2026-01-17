import os
import xml.etree.ElementTree as ET

# Function to process a single SVG file
def process_svg(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()

    # SVG namespace handling
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    ET.register_namespace('', ns['svg'])

    # Get width, height, and viewBox
    width = root.get('width')
    height = root.get('height')
    viewBox = root.get('viewBox')

    # Determine rectangle coordinates and size
    if viewBox:
        vb_values = viewBox.split()
        if len(vb_values) == 4:
            x, y, w, h = map(float, vb_values)
        else:
            print(f"Invalid viewBox in {file_path}")
            return
    elif width and height:
        try:
            w = float(width.replace('px', ''))
            h = float(height.replace('px', ''))
        except ValueError:
            print(f"Invalid width/height in {file_path}")
            return
        x, y = 0, 0
    else:
        print(f"No viewBox or width/height in {file_path}")
        return

    # Remove previous border rectangle if present
    print(len(root))
    print("AHH")
    if len(root) > 0:
        last_elem = root[-1]
        print(last_elem)
        if last_elem.tag.endswith('rect') and last_elem.get('data-border-rect') == 'true':
            root.remove(last_elem)

    # Create a new rectangle element
    rect_attribs = {
        'x': str(x),
        'y': str(y),
        'width': str(w),
        'height': str(h),
        'fill': 'none',
        'stroke': 'red',
        'stroke-width': '0.1',
        'stroke-dasharray': '0.2,0.2',
        'data-border-rect': 'true'
    }
    rect = ET.Element('rect', rect_attribs)

    # Add rectangle as the last child
    root.append(rect)

    # Save changes
    tree.write(file_path)
    print(f"Processed {file_path}")

# Recursively find all SVG files
def find_and_process_svgs(root_dir):
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.lower().endswith('.svg'):
                file_path = os.path.join(dirpath, filename)
                process_svg(file_path)

if __name__ == "__main__":
    root_directory = "."  # Change this to your target directory
    find_and_process_svgs(root_directory)
