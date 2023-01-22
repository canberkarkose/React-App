from bs4 import BeautifulSoup
import requests
from unidecode import unidecode
import sqlite3


html_text = requests.get('https://www.a101.com.tr/market/sivi-yag/').text
soup = BeautifulSoup(html_text, 'lxml')
brands = soup.find_all('li', class_='col-md-4 col-sm-6 col-xs-6 set-product-item')
conn = sqlite3.connect('scraped_data.db')
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS scraped_data (brand_name TEXT, price TEXT)")

for brand in brands:
    brand_name = unidecode(brand.find('h3', class_='name').text).replace("\n","").strip()
    price = brand.find('span', class_='current').text
    cursor.execute("INSERT INTO scraped_data (brand_name, price) VALUES (?,?)", (brand_name, price))
    conn.commit()
cursor.close()
conn.close()

