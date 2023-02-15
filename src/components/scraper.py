from bs4 import BeautifulSoup
import requests
from unidecode import unidecode
import json


data = []
i = 0
for page in range(1, 3):
    url = f'https://www.a101.com.tr/elektronik/cep-telefonu/?page={page}'
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'lxml')
    brands = soup.find_all('li', class_='col-md-4 col-sm-6 col-xs-6 set-product-item')

    for brand in brands:
        i += 1
        brand_name = unidecode(brand.find('h3', class_='name').text).replace("\n","").strip()
        price = brand.find('span', class_='current').text.replace('\u20ba',"TL")
        photo_figure = brand.find('figure', class_='product-image')
        photo = photo_figure.find('img', class_='lazyload')['data-src']
        data.append({'id': i, 'brand_name': brand_name, 'price': price, 'photo': photo})

with open('scraped_data.json', 'w') as json_file:
    json.dump(data, json_file)

