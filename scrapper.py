from array import array
from copyreg import constructor
from unicodedata import name
import requests, re

import json
from bs4 import BeautifulSoup
scrapped_names = []
stoplist = r"(Кува|Догмат|МК1-*)"
fullList = list()


class item:
    def __init__(self, name, type, href, location = None):
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
    navboxgroup_list = soup_obj.find_all('td', {'class':'navboxgroup'})
    for navboxgroup_el in navboxgroup_list:
        navbox_Sibling = navboxgroup_el.nextSibling
        if navbox_Sibling != '\n':
            for element in navbox_Sibling.contents:
                if element.name:
                    # print (element.contents[2])
                    item_list.append(item(element.contents[2].attrs['title'], ['weapon'], element.contents[2].attrs['href']) )
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
        item_list.append(item(companion.attrs['data-param'], ['companion'], companion.contents[2].attrs['href']))
    return item_list


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
        item_list.append(item(archwing.attrs['title'], ['archwing'], archwing.attrs['href']))
    return item_list


def GetResourcesList ():
    """Function that gets list of all resources from warframe wiki"""
    url = 'https://warframe.fandom.com/wiki/Resources'
    # Get page with resources
    request = requests.get(url)
    soup_obj = BeautifulSoup(request.content, 'html.parser')
    item_list = list()
    # Get table of resources
    table = soup_obj.find('table', {'class':'navbox'})
    # Get all objects with resources
    resources = table.findAll('span', {'data-param2':'Resources'})
    for resource in resources:
        item_list.append(item(resource.attrs['data-param'], ['resource'], resource.contents[2].attrs['href']))
    return item_list

fullList.extend(GetWarframesList())
fullList.extend(GetWeaponsList()) 
fullList.extend(GetCompanionsList()) 
fullList.extend(GetArchwingsList()) 
fullList.extend(GetResourcesList()) 

with open('allItems.json', 'w') as outp:
    for ite in fullList:
        outp.writelines(ite.toJSON());

