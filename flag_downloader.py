import os
import requests
import pycountry

# Output folder
output_dir = "flags"
os.makedirs(output_dir, exist_ok=True)

def country_code_to_emoji(cc):
    return ''.join(chr(0x1F1E6 + ord(c) - ord('A')) for c in cc.upper())

def sanitize_filename(name):
    return name.replace(" ", "_").replace("/", "_")

def download_flag(country):
    cc = country.alpha_2
    name = sanitize_filename(country.name)
    emoji = country_code_to_emoji(cc)
    url = f"https://emoji.dutl.uk/png/128x128/{emoji}.png"

    try:
        response = requests.get(url)
        response.raise_for_status()
        filepath = os.path.join(output_dir, f"{name}.png")
        with open(filepath, "wb") as f:
            f.write(response.content)
        print(f"✅ {cc} - {country.name}")
    except Exception as e:
        print(f"❌ {cc} - {country.name}: {e}")

# Iterate over all countries in pycountry
for country in pycountry.countries:
    download_flag(country)
