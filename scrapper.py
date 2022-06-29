import requests, re

import json
from bs4 import BeautifulSoup
scrapped_names = []
stoplist = r"(Кува|Догмат|МК1-*)"
fullList = {}

def GetWeaponsList():
    """Function that gets list of all weapons from warframe wiki"""
    url = 'https://warframe.fandom.com/wiki/Weapons'
    # Get page
    request = requests.get(url)
    soup_obj = BeautifulSoup(request.content, 'html.parser')
    # Get all weapons from table on page
    dict = {}
    navboxgroup_list = soup_obj.find_all('td', {'class':'navboxgroup'})
    for navboxgroup_el in navboxgroup_list:
        navbox_Sibling = navboxgroup_el.nextSibling
        if navbox_Sibling != '\n':
            for element in navbox_Sibling.contents:
                if element.name:
                    # print (element.contents[2])
                    dict[element.contents[2].attrs['title']] = element.contents[2].attrs['href']
                else:
                    pass
    return dict


def GetWarframesList ():
    """Function that gets list of all warframes from warframe wiki"""
    url = 'https://warframe.fandom.com/wiki/Warframes'
    # Get page with warframes
    request = requests.get(url)
    soup_obj = BeautifulSoup(request.content, 'html.parser')
    dict = {}
    # Get table of warframes
    table = soup_obj.find('table', {'class':'navbox'})
    # Get all objects with warframes
    warframes = table.findAll('span', {'data-param2':'Warframes'})
    for warframe in warframes:
        dict [warframe.attrs['data-param']] = warframe.contents[2].attrs['href']
    return dict


def GetCompanionsList ():
    """Function that gets list of all companions from warframe wiki"""
    url = 'https://warframe.fandom.com/wiki/Companion'
    # Get page with companions
    request = requests.get(url)
    soup_obj = BeautifulSoup(request.content, 'html.parser')
    dict = {}
    # Get table of companions
    table = soup_obj.find('table', {'class':'navbox'})
    # Get all objects with companions
    companions = table.findAll('span', {'data-param2':'Companions'})
    for companion in companions:
        dict [companion.attrs['data-param']] = companion.contents[2].attrs['href']
    return dict


def GetArchwingsList ():
    """Function that gets list of all archwings from warframe wiki"""
    url = 'https://warframe.fandom.com/wiki/Archwing'
    # Get page with archwings
    request = requests.get(url)
    soup_obj = BeautifulSoup(request.content, 'html.parser')
    dict = {}
    # Get table of archwings
    table = soup_obj.find('table', {'class':'navbox'})
    # Get all objects with archwings
    archwings = table.find('td', {'class': ''}).findAll('a')
    for archwing in archwings:
        dict [archwing.attrs['title']] = archwing.attrs['href']
    return dict


def GetResourcesList ():
    """Function that gets list of all resources from warframe wiki"""
    url = 'https://warframe.fandom.com/wiki/Resources'
    # Get page with resources
    request = requests.get(url)
    soup_obj = BeautifulSoup(request.content, 'html.parser')
    dict = {}
    # Get table of resources
    table = soup_obj.find('table', {'class':'navbox'})
    # Get all objects with resources
    resources = table.findAll('span', {'data-param2':'Resources'})
    for resource in resources:
        dict [resource.attrs['data-param']] = resource.contents[2].attrs['href']
    return dict

fullList.update(GetWarframesList())
fullList.update(GetWeaponsList()) 
fullList.update(GetCompanionsList()) 
fullList.update(GetArchwingsList()) 
fullList.update(GetResourcesList()) 

with open('allItems.json', 'w') as outp:
    json.dump(fullList, outp, indent=4)

