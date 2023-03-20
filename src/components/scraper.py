# Import necessary libraries
from bs4 import BeautifulSoup
import requests
from unidecode import unidecode
import json

# Create an empty list to store the scraped data
data = []

# Initialize a counter
i = 0

# Loop through the first two pages of the website
for page in range(1, 3):
    # Construct the URL for each page
    url = f'https://www.a101.com.tr/elektronik/cep-telefonu/?page={page}'
    
    # Get the HTML content of the URL
    html_text = requests.get(url).text
    
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_text, 'lxml')
    
    # Find all the brands on the page
    brands = soup.find_all('li', class_='col-md-4 col-sm-6 col-xs-6 set-product-item')

    # Loop through each brand and extract the relevant information
    for brand in brands:
        # Increment the counter
        i += 1
        
        # Extract the brand name, remove unwanted characters and spaces
        brand_name = unidecode(brand.find('h3', class_='name').text).replace("\n","").strip()
        
        # Extract the price and remove unwanted characters
        price = brand.find('span', class_='current').text.replace('\u20ba',"TL")
        
        # Extract the URL of the product image
        photo_figure = brand.find('figure', class_='product-image')
        photo = photo_figure.find('img', class_='lazyload')['data-src']
        
        # Append the extracted information to the data list
        data.append({'id': i, 'brand_name': brand_name, 'price': price, 'photo': photo})

# Save the scraped data as a JSON file
with open('scraped_data.json', 'w') as json_file:
    json.dump(data, json_file)
