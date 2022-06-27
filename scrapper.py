import requests, re
from bs4 import BeautifulSoup
scrapped_names = []
stoplist = r"(Кува|Догмат|МК1-*)"

weapon_url = 'https://warframe.fandom.com/wiki/Weapons'

request = requests.get(weapon_url)
soup_obj = BeautifulSoup(request.content, 'html.parser')


weapon_dict = {}
navboxgroup_list = soup_obj.find_all('td', {'class':'navboxgroup'})
for navboxgroup_el in navboxgroup_list:
    navbox_Sibling = navboxgroup_el.nextSibling
    if navbox_Sibling != '\n':
        for element in navbox_Sibling.contents:
            if element.name:
                # print (element.contents[2])
                weapon_dict[element.contents[2].attrs['title']] = element.contents[2].attrs['href']
            else:
                pass
print(weapon_dict)