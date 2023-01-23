from bs4 import BeautifulSoup
import requests
from unidecode import unidecode
import json


html_text = requests.get('https://www.a101.com.tr/market/sivi-yag/').text
soup = BeautifulSoup(html_text, 'lxml')
brands = soup.find_all('li', class_='col-md-4 col-sm-6 col-xs-6 set-product-item')


data = []
for i, brand in enumerate(brands):
    brand_name = unidecode(brand.find('h3', class_='name').text).replace("\n","").strip()
    price = brand.find('span', class_='current').text.replace('\u20ba',"TL")
    data.append({'id': i+1, 'brand_name': brand_name, 'price': price})

with open('scraped_data.json', 'w') as json_file:
    json.dump(data, json_file)


    

