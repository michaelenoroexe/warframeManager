from array import array
from asyncio.windows_events import NULL
from copyreg import constructor
from unicodedata import category, name
import requests, re
import pymongo

import json
from bs4 import BeautifulSoup
scrapped_names = []
stoplist = r"(Кува|Догмат|МК1-*)"
fullList = list()
mongo_client = pymongo.MongoClient("mongodb+srv://warframe_manager_user:H9guvYhcVtWk5z25@warframemanagercluster.jvusw.mongodb.net/test")
warf_db = mongo_client["WarframeManager"]
types_col = warf_db["Types"]

class item:
    def __init__(self, name, type, href, location = NULL):
        self.name = name
        self.type = type
        self.location = location
        self.href = href
    def toJSON(self):
        obj = dict()
        obj['name'] = self.name
        obj['type'] = FindAndReturnTypesID(self.type)
        if (self.location != NULL and self.location != ""): obj['locations'] = self.location
        return json.dumps(obj, indent=4)
    name = str()
    type = list()
    location = list()
    href = str()


def FindAndReturnTypesID(types):
    type_list = list()
    for type in types:
        res = types_col.find_one({"name":type}, {"_id": 1, "name": 0})
        type_list.append(str(res["_id"]))
    return type_list


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
                        tag_list.append(GetCateg(element.parent.parent).lower())
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
        tag_List.append(companion.parent.parent.contents[1].contents[0].attrs['title'].lower().split(" ")[0])
        tag_List.append(GetCateg(companion.parent.parent).lower())
        tag_List.append('companion')
        # Adding companion in list
        item_list.append(item(companion.attrs['data-param'], tag_List, companion.contents[2].attrs['href']))
    return item_list


def GetCateg(elem):
    """ Recursive function that find headers of table and return for tag """
    if (hasattr(elem, 'contents')):
        # 1 element for weapons categories
        if (len(elem.contents) == 1):
            if (elem.contents[0].name == 'th'):
                return elem.contents[0].contents[0].text
        # bunch of elements for companions
        if (len(elem.contents) > 1):
            if (elem.contents[1].name == 'th'):
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
        # Get full info of res
        res_request = requests.get('https://warframe.fandom.com' + resource.contents[2].attrs['href'])
        soup_res = BeautifulSoup(res_request.content, 'html.parser')
        # Get res tags
        res_info = soup_res.find_all('div', {'class':'pi-data-value pi-font'})
        # Applight all tags to res
        tag_List = list()
        tag_allow = {'Common', 'Uncommon', 'Rare'}
        for res_inf in res_info:
            if res_inf.text in tag_allow:
                tag_List.append(res_inf.text.lower().strip())
        tag_List.append('resource')
        # Get location from res info
        location = str()
        if ( len(res_info) > 0 and hasattr(res_info[1], 'contents') and hasattr(res_info[1].contents[0], 'contents') and len(res_info[1].contents[0].contents) > 3 ):
            if ('Locations' in res_info[1].contents[0].text):
                loc = [Location_Format(loc) for loc in [ loc.strip() for loc in res_info[1].contents[0].text.split('Locations')[1].split(',')]]
                location = loc
        item_list.append(item(resource.attrs['data-param'], tag_List, resource.contents[2].attrs['href'], location) )
    return item_list



def Location_Format(name):
    loc_Name = name
    if loc_Name.startswith(': '): loc_Name = loc_Name[2:]
    if loc_Name.startswith('and'): loc_Name = loc_Name[4:]
    if (loc_Name.endswith('.')): loc_Name = loc_Name[:len(loc_Name)-1]
    return loc_Name.lower()


def Save_To_File(name, item_list):
    with open('./items/' + name, 'w') as outp:
        outp.write('[')
        for ite in item_list:
            outp.writelines(ite.toJSON());
            outp.write(',')
        outp.write('[')


Save_To_File('warframes.json', GetWarframesList())
#Save_To_File('weapons.json', GetWeaponsList())
Save_To_File('companions.json', GetCompanionsList())
Save_To_File('archwings.json', GetArchwingsList())
#Save_To_File('resources.json', GetResourcesList())

