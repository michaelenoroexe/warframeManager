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
planets_Col = warf_db["Planets"]

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
        if (self.location != NULL and len(self.location) > 0): obj['locations'] = self.location
        return json.dumps(obj, indent=4)
    name = str()
    type = list()
    location = list()
    href = str()


def FindAndReturnTypesID(types):
    type_list = list()
    for type in types:
        res = types_col.find_one({"name":type}, {"_id": 1, "name": 0})
        if res != None:
            type_list.append(str(res["_id"]))
        else:
            print(type)
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
                        for categ in element.parent.previous.lower().split(" / "):
                            tag_list.append(categ)
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
    url = 'https://warframe.fandom.com/wiki/Resources'
    # Get page with resources
    request = requests.get(url)
    soup_Obj = BeautifulSoup(request.content, 'html.parser')
    tables_list = soup_Obj.findAll('table')
    common_Res = tables_list[2]
    uncommon_Res = tables_list[3]
    rare_Res = tables_list[4]   
    research_Res = tables_list[5]
    item_List = list()
    # Get table of resources
    table = soup_Obj.find('table', {'class':'navbox mw-collapsible'})
    # Get all objects with resources
    resources = table.findAll('span', {'data-param2':'Resources'})
    for resource in resources:
        # Applight all tags to res
        tag_List = list()
        res_Type = resource.parent.parent.previous
        if (res_Type != None and res_Type != NULL):
            tag_List.append(res_Type.lower().strip())
        allowed_Tags_With_Locations = {'Common', 'Uncommon', 'Rare', 'Research'}
        tag_List.append('resource')
        # Get location of resource
        location = list()
        if (res_Type in allowed_Tags_With_Locations):
            loc_Res = Get_Location(resource.attrs['data-param'], common_Res if (res_Type == 'Common') else uncommon_Res if (res_Type == 'Uncommon') else rare_Res if (res_Type == 'Rare') else research_Res)
            if (len(loc_Res) > 0):
                location = loc_Res
        item_List.append(item(resource.attrs['data-param'], tag_List, resource.contents[2].attrs['href'], location) )
    return item_List


def Get_Location(res_Name, tab):
    planet_list = ['mercury','venus','earth','lua','mars','deimos','phobos','ceres','jupiter','europa','saturn','uranus','neptune','pluto','eris','sedna','void','kuva fortress']
    loc_List = list()
    res = tab.find('span', {'data-param':res_Name})
    if (res == None): return loc_List
    # Get list of resource belong
    res_Box = res.parent.parent.contents
    for state_Num in range(3, len(res_Box)+1, 2):
        if (len(res_Box[state_Num].contents) > 1):
            # Get planets id from db
            re = planets_Col.find_one({"name":planet_list[int((state_Num-1)/2)-1]}, {"_id": 1, "name": 0})
            if re != None:
                loc_List.append(str(re["_id"]))
            else:
                # Printing result if planet not in db
                print(int((state_Num-1)/2)-1)
                print(planet_list[int((state_Num-1)/2)-1])
    return loc_List


def Save_To_File(name, item_list):
    with open('./items/' + name, 'w') as outp:
        outp.write('[')
        for ite in item_list:
            outp.writelines(ite.toJSON());
            outp.write(',')
        outp.write('[')


#Save_To_File('warframes.json', GetWarframesList())
#Save_To_File('weapons.json', GetWeaponsList())
#Save_To_File('companions.json', GetCompanionsList())
#Save_To_File('archwings.json', GetArchwingsList())
Save_To_File('resources.json', GetResourcesList())

