import os
import re

files = ['index.html', 'lands.html']

slider_css_fix = """
    /* SLIDER & HERO OVERLAP FIX */
    @media (max-width: 768px) {
        .page-hero {
            height: 300px !important;
            margin-bottom: 20px !important;
        }
        .page-hero-content h1 {
            font-size: 1.6rem !important;
            margin-bottom: 5px !important;
        }
        .promo-slider {
            width: 100% !important;
            margin: 10px 0 !important;
            border-radius: 8px !important;
            overflow: hidden !important;
        }
        .slides {
            display: flex !important;
            width: 100% !important;
        }
        .slide {
            flex: 0 0 100% !important;
            width: 100% !important;
            min-width: 100% !important;
        }
        .slide img {
            height: 220px !important;
            width: 100% !important;
            object-fit: cover !important;
        }
        .land-gallery {
            gap: 10px !important;
        }
    }
"""

for file_name in files:
    if os.path.exists(file_name):
        with open(file_name, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if '/* SLIDER & HERO OVERLAP FIX */' not in content:
            content = content.replace('</style>', slider_css_fix + '\n</style>')
            
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(content)

print("Slider and Hero overlap fixes applied.")
