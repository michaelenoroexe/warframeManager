from array import array
from asyncio.windows_events import NULL
from copyreg import constructor
from unicodedata import category, name
import requests, re

import json
from bs4 import BeautifulSoup
scrapped_names = []
stoplist = r"(Кува|Догмат|МК1-*)"
fullList = list()


class item:
    def __init__(self, name, type, href, location = NULL):
        self.name = name
        self.type = type
        self.location = location
        self.href = href
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
    name = str()
    type = list()
    location = str()
    href = str()

def GetWeaponsList():
    """Function that gets list of all weapons from warframe wiki"""
    url = 'https://warframe.fandom.com/wiki/Weapons'
    # Get page
    request = requests.get(url)
    soup_obj = BeautifulSoup(request.content, 'html.parser')
    # Get all weapons from table on page
    item_list = list()
    # Get names of category of weapon for tag
    categs_Names =[ el.attrs['data-hash'] for el in soup_obj.find_all('li', {'class':'wds-tabs__tab'})]
    # Get all separeted tables of weapon for categorys
    categorys = soup_obj.find_all('div', {'class':'wds-tab__content'})
    for category in range(len(categorys)):
        # Get cells of table
        navboxgroup_list = categorys[category].find_all('td', {'class':'navboxgroup'})
        for navboxgroup_el in navboxgroup_list:
            navbox_Sibling = navboxgroup_el.nextSibling
            if navbox_Sibling != '\n':
                for element in navbox_Sibling.contents:
                    if element.name:
                        # Set tags for weapon
                        tag_list = []
                        tag_list.append(element.parent.previous.lower())
                        tag_list.append(element.parent.parent.previous.lower())
                        tag_list.append(categs_Names[category].lower())
                        tag_list.append('weapon')
                        # Append item to list
                        item_list.append(item(element.contents[2].attrs['title'], tag_list, element.contents[2].attrs['href']) )
                    else:
                        pass
    return item_list


def GetWarframesList ():
    """Function that gets list of all warframes from warframe wiki"""
    url = 'https://warframe.fandom.com/wiki/Warframes'
    # Get page with warframes
    request = requests.get(url)
    soup_obj = BeautifulSoup(request.content, 'html.parser')
    item_list = list()
    # Get table of warframes
    table = soup_obj.find('table', {'class':'navbox'})
    # Get all objects with warframes
    warframes = table.findAll('span', {'data-param2':'Warframes'})
    for warframe in warframes:
        item_list.append(item(warframe.attrs['data-param'], ['warframe'], warframe.contents[2].attrs['href']))
    return item_list


def GetCompanionsList ():
    """Function that gets list of all companions from warframe wiki"""
    url = 'https://warframe.fandom.com/wiki/Companion'
    # Get page with companions
    request = requests.get(url)
    soup_obj = BeautifulSoup(request.content, 'html.parser')
    item_list = list()
    # Get table of companions
    table = soup_obj.find('table', {'class':'navbox'})
    # Get all objects with companions
    companions = table.findAll('span', {'data-param2':'Companions'})
    for companion in companions:
        # Setting tags for companions
        tag_List = []
        tag_List.append(companion.parent.parent.contents[1].contents[0].attrs['title'].lower())
        tag_List.append(GetCateg(companion.parent.parent).lower())
        tag_List.append('companion')
        # Adding companion in list
        item_list.append(item(companion.attrs['data-param'], tag_List, companion.contents[2].attrs['href']))
    return item_list


def GetCateg(elem):
    """ Recursive function that find headers of table and return for tag """
    if (elem.contents[1].name == 'th' if hasattr(elem, 'contents') else False ):
        return elem.contents[1].contents[0].attrs['title']
    return GetCateg(elem.previousSibling)



def GetArchwingsList ():
    """Function that gets list of all archwings from warframe wiki"""
    url = 'https://warframe.fandom.com/wiki/Archwing'
    # Get page with archwings
    request = requests.get(url)
    soup_obj = BeautifulSoup(request.content, 'html.parser')
    item_list = list()
    # Get table of archwings
    table = soup_obj.find('table', {'class':'navbox'})
    # Get all objects with archwings
    archwings = table.find('td', {'class': ''}).findAll('a')
    for archwing in archwings:
        tag_List = []
        tag_List.append('archwing')
        item_list.append(item(archwing.attrs['title'], tag_List, archwing.attrs['href']))
    return item_list


def GetResourcesList ():
    """Function that gets list of all resources from warframe wiki"""
    url = 'https://warframe.fandom.com/wiki/Category:Resources'
    # Get page with resources
    request = requests.get(url)
    soup_obj = BeautifulSoup(request.content, 'html.parser')
    item_list = list()
    # Get table of resources
    table = soup_obj.find('table', {'class':'navbox'})
    # Get all objects with resources
    resources = table.findAll('span', {'data-param2':'Resources'})
    for resource in resources:
        res_request = requests.get('https://warframe.fandom.com' + resource.contents[2].attrs['href'])
        soup_res = BeautifulSoup(res_request.content, 'html.parser')
        res_info = soup_res.find_all('div', {'class':'pi-data-value pi-font'})
        tag_List = []
        try:
            tag_List.append(res_info[0].text.lower())
        except:
            pass
        try:
            tag_List.append(res_info[2].text.lower())
        except:
            pass
        try:
            tag_List.append(res_info[3].text.lower())
        except:
            pass
        location = str()
        try:
            location = res_info[1].contents[0].contents[3].lower()
        except:
            pass
        item_list.append(item(resource.attrs['data-param'], tag_List, resource.contents[2].attrs['href'], location) )
    return item_list

fullList.extend(GetWarframesList())
fullList.extend(GetWeaponsList()) 
fullList.extend(GetCompanionsList()) 
fullList.extend(GetArchwingsList()) 
fullList.extend(GetResourcesList()) 

with open('allItems.json', 'w') as outp:
    for ite in fullList:
        outp.writelines(ite.toJSON());

