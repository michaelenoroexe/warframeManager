from array import array
from asyncio.windows_events import NULL
from copyreg import constructor
from datetime import timedelta
from hashlib import new
from time import time
from turtle import title
from unicodedata import category, name
from bs4 import BeautifulSoup, NavigableString
import requests, re
import pymongo
import asyncio
import aiohttp
import json

scrapped_names = []
stoplist = r"(Кува|Догмат|МК1-*)"
fullList = list()
mongo_client = pymongo.MongoClient("mongodb+srv://warframe_manager_user:H9guvYhcVtWk5z25@warframemanagercluster.jvusw.mongodb.net/test")
warf_db = mongo_client["WarframeManager"]
types_col = warf_db["Types"]
planets_Col = warf_db["Planets"]

class item:
    """Base item which dont need craft"""
    # item constructor
    def __init__(self, name, type, href, location = NULL, masterable = False):
        self.name = name
        self.type = type
        self.location = location
        self.href = href
        self.masterable = masterable
    # item json serializing
    def toJSON(self):
        obj = dict()
        obj['name'] = self.name
        obj['type'] = FindAndReturnTypesID(self.type)
        if (self.location != NULL and len(self.location) > 0): obj['locations'] = self.location
        obj['masterable'] = self.masterable
        return json.dumps(obj, indent=4)
    # item data
    name = str()
    type = list()
    location = list()
    href = str()
    masterable = bool()


class complex_Item(item):
    """Complex item what crafted from different materials"""
    # constructor
    def __init__(self, name = "", type = "", href = "", credits = 0, creation_Time = 0 , components = dict(), location=NULL, masterable = True):
        super().__init__(name, type, href, location, masterable)
        self.credits = credits
        self.creation_Time = creation_Time
        self.components = components
    # constructor that create complex item from simpl
    def form(self, simpl_Obj , credits, creation_Time , components):
        self.name = simpl_Obj.name
        self.type = simpl_Obj.type
        self.href = simpl_Obj.href
        self.credits = credits
        self.creation_Time = creation_Time
        self.components = components
        return self
    # serializer
    def toJSON(self):
        obj = dict()
        obj['name'] = self.name
        obj['type'] = FindAndReturnTypesID(self.type)
        if self.credits > 0:
            obj['credits'] = self.credits
        if type(self.creation_Time) is timedelta:
            obj['createTime'] = self.creation_Time.total_seconds()
        if len(self.components) > 0:
            obj['components'] = self.components
        obj['masterable'] = self.masterable
        return json.dumps(obj, indent=4)
    # data
    credits = int()
    creation_Time = timedelta()
    components = dict()
    masterable = bool


def FindAndReturnTypesID(types):
    """Function that find and return types id from DB"""
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
    for category in range(0, len(categorys)-3):
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
                        res_name = element.contents[2].text.replace('''\xa0''', ' ')
                        foun_par = re.findall(' \(.*\)', res_name)
                        if len(foun_par) > 0: res_name = res_name.replace(foun_par[0], '')
                        item_list.append(item(res_name, tag_list, element.contents[2].attrs['href']) )
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


async def task(name, work_queue, out, typ):
    async with aiohttp.ClientSession(requote_redirect_url=True) as session:
        while not work_queue.empty():
            curr_Item = await work_queue.get()
            url = 'https://warframe.fandom.com/' + curr_Item.href
            print(f"Task {name} getting URL: {url}")
            try:
                async with session.get(url, allow_redirects=True) as response:
                    # Get warframe from queue, get components, and append to output
                    if typ == 'warframe':
                        ress = Get_Warframe_Components(await response.text())
                        if ress == None: 
                            curr_Item.masterable = True
                            out.append(curr_Item)
                        else:
                            out.append(complex_Item().form(curr_Item, ress[0]['credits'], ress[0]['time'], ress[0]['resources']))
                            for ind in range(1, len(ress)): 
                                out.append(complex_Item(ress[ind]['name'], ['warframe part'], '', ress[ind]['credits'], ress[ind]['time'], ress[ind]['resources'], masterable = False))
                    # Get weapon from queue, get components, and append to output
                    if typ == 'weapon':
                        ress = Get_Weapon_Components(await response.text())
                        if ress == None: 
                            curr_Item.masterable = True
                            out.append(curr_Item)
                        else:
                            if type(ress) is list:
                                out.append(complex_Item().form(curr_Item, ress[0]['credits'], ress[0]['time'], ress[0]['resources']))
                                for ind in range(1, len(ress)):
                                    ress[ind].type = ['weapon part']
                                    ress[ind].masterable = False
                                    out.append(ress[ind])
                            else:
                                out.append(complex_Item().form(curr_Item, ress['credits'], ress['time'], ress['resources']))
                    #Get companion from, get components, and append to output
                    if typ == 'companion':
                        ress = Get_Companion_Components(await response.text(), curr_Item.name)
                        if ress == None: 
                            curr_Item.masterable = True
                            out.append(curr_Item)
                        else:
                            if type(ress) is list:
                                out.append(complex_Item().form(curr_Item, ress[0]['credits'], ress[0]['time'], ress[0]['resources']))
                                for ind in range(1, len(ress)):
                                    if ress[ind].credits == 0:
                                        ress[ind].type = ['companion part']
                                        ress[ind].masterable = False
                                        out.append(ress[ind])
                                    else:
                                        out.append(complex_Item(ress[ind]['name'], ['companion part'], '', ress[ind]['credits'], ress[ind]['time'], ress[ind]['resources']))
                            else:
                                out.append(complex_Item().form(curr_Item, ress['credits'], ress['time'], ress['resources']))
                    if typ == 'archwing':
                        ress = Get_Archwing_Components(await response.text())
                        if ress == None: 
                            curr_Item.masterable = True
                            out.append(curr_Item)
                        else:
                            out.append(complex_Item().form(curr_Item, ress[0]['credits'], ress[0]['time'], ress[0]['resources']))
                            for ind in range(1, len(ress)): 
                                out.append(complex_Item(ress[ind]['name'], ['archwing part'], '', ress[ind]['credits'], ress[ind]['time'], ress[ind]['resources'], masterable = False))
                    if typ == 'resource':
                        ress = Get_Resource_Components(await response.text())
                        if ress == None: 
                            curr_Item.masterable = False
                            out.append(curr_Item)
                        else:
                            out.append(complex_Item(masterable = False).form(curr_Item, ress['credits'], ress['time'], ress['resources']))
            except:
                out.append(curr_Item)


def Get_Ress(res, name = None, ext_Name = None):
    """Get all resources of item"""
    obj = dict()
    ress = dict()
    obj['credits'] = int(res.contents[1].text.split('''\n''')[0].replace(",", ""))
    obj['time'] = Get_Time(res.contents[11].contents[0])
    li = [complex_Item()]
    for ind in range(3, len(res.contents)-2, 2):
        if (type(res.contents[ind].contents[0]) is NavigableString):
                break
        comp_Name = str()
        if 'title' in res.contents[ind].contents[0].attrs: 
            comp_Name = res.contents[ind].contents[0].attrs['title']
        elif 'data-param' in res.contents[ind].contents[0].attrs:
            comp_Name = res.contents[ind].contents[0].attrs['data-param']
        elif (len(res.contents[ind].contents) < 3):
            break
        elif (res.contents[ind].contents[2].name == 'a'):
            comp_Name = res.contents[ind].contents[2].contents[0]
        else: comp_Name = "Err"
        # If item has aditional items in it
        if ext_Name != None: 
            spec_List = {'Barrel', 'Receiver', 'Stock', 'Upper Limb', 'Lower Limb', 'Grip', 'String', 'Gun Chassis', 'Handle', 'Blade', 'Head', 'Link', 'Pouch', 'Stars', 'Gauntlet', 'Disc', 'Limbs', 'Carapace', 'Cerebrum', 'Systems'}
            for spec in spec_List:
                if spec in comp_Name:
                    comp_Name = (' '.join(ext_Name.split(' ')[0:-1]) if ext_Name.endswith('Prime') else ext_Name) + ' ' + comp_Name
                    li.append(complex_Item(name = comp_Name))
                    break
        comp_Num = int()
        if len(res.contents[ind].contents) > 2:
            if type(res.contents[ind].contents[2]) is NavigableString:
                comp_Num = int(res.contents[ind].contents[2].split('''\n''')[0].replace(",", ""))
            else: comp_Name = 0
        elif not (type(res.contents[ind].contents[1]) is NavigableString):
            comp_Num = int(res.contents[ind].contents[1].text.split('''\n''')[0].replace(",", ""))
        else: comp_Num = 1
        ress[comp_Name] = comp_Num
    obj['name'] = name
    obj['resources'] = ress
    li[0] = obj
    return li if len(li) > 1 else obj


def Get_Time(str_Time):
    """Get time from wiki time string"""
    time = str_Time.split(' ')
    if (time[2].startswith('Day')): return timedelta( days = int(time[1]))
    if (time[2].startswith('Hour') or time[2].startswith('hr')): return timedelta( hours = int(time[1]))
    if (time[2].startswith('Minute') or time[2].startswith('m')): return timedelta( minutes = int(time[1]))
    if (time[2].startswith('Second')): return timedelta( seconds = int(time[1]))


def Get_Equinox_Components(page):
    foundary_Tables = BeautifulSoup(page, 'html.parser').find_all('table',{'class':'foundrytable'})
    res = list()
    res.append(Get_Ress(res = foundary_Tables[0].contents[1].contents[2]))
    res.append(Get_Ress(res = foundary_Tables[1].contents[1].contents[2], name = 'Equinox Day Aspect'))
    res.append(Get_Ress(res = foundary_Tables[1].contents[1].contents[20], name = 'Equinox Day Neuroptics'))
    res.append(Get_Ress(res = foundary_Tables[1].contents[1].contents[12], name = 'Equinox Day Chassis'))
    res.append(Get_Ress(res = foundary_Tables[1].contents[1].contents[28], name = 'Equinox Day Systems'))
    res.append(Get_Ress(res = foundary_Tables[2].contents[1].contents[2], name = 'Equinox Night Aspect'))
    res.append(Get_Ress(res = foundary_Tables[2].contents[1].contents[20], name = 'Equinox Night Neuroptics'))
    res.append(Get_Ress(res = foundary_Tables[2].contents[1].contents[12], name = 'Equinox Night Chassis'))
    res.append(Get_Ress(res = foundary_Tables[2].contents[1].contents[28], name = 'Equinox Night Systems'))
    res[1]['resources'] = {"Equinox Day Neuroptics": 1,
                        "Equinox Day Chassis": 1,
                        "Equinox Day Systems": 1,
                        "Orokin Cell": 1}
    res[5]['resources'] = {"Equinox Night Neuroptics": 1,
                        "Equinox Night Chassis": 1,
                        "Equinox Night Systems": 1,
                        "Orokin Cell": 1}
    return res


def Get_Warframe_Components(warf_page):
    # Full table of crafting
    foundary_Table = BeautifulSoup(warf_page, 'html.parser').find('table',{'class':'foundrytable'})
    # Resources needed to produce warframe
    curr_warf = BeautifulSoup(warf_page, 'html.parser').find('title').text
    exc = ['Excalibur Umbra | WARFRAME Wiki | Fandom', 'Excalibur Prime | WARFRAME Wiki | Fandom']
    if (curr_warf.startswith('Equinox | WARFRAME Wiki')): return Get_Equinox_Components(warf_page)
    if (curr_warf in exc): return None
    warf_Res = foundary_Table.contents[1].contents[2]
    neuro_Name = foundary_Table.contents[1].contents[10].text.split('''\n''')[1].replace(' Blueprint', '')
    neuro_Res = foundary_Table.contents[1].contents[12]
    chass_Name = foundary_Table.contents[1].contents[18].text.split('''\n''')[1].replace(' Blueprint', '')
    chass_Res = foundary_Table.contents[1].contents[20]
    syst_Name = foundary_Table.contents[1].contents[26].text.split('''\n''')[1].replace(' Blueprint', '')
    syst_Res = foundary_Table.contents[1].contents[28]
    if (curr_warf.startswith('Garuda Prime')): 
        neuro_Name = "Garuda Prime Neuroptics"
        chass_Name = "Garuda Prime Chassis"
        syst_Name = "Garuda Prime Systems"
    warf_Components_Names = [neuro_Name, chass_Name, syst_Name, warf_Res.contents[9].contents[2].contents[0] if (warf_Res.contents[9].contents[2].name == 'a') else warf_Res.contents[9].contents[0].contents[0].attrs['title']]
    main_Ress = dict()
    # Gathering all components of main warframe receipe
    main_Ress['credits'] = int(warf_Res.contents[1].text.split('''\n''')[0].replace(",", ""))
    main_Ress['time'] = Get_Time(warf_Res.contents[11].contents[0])
    ress = dict()
    for ind in range(3, len(warf_Res.contents)-2, 2):
        if (type(warf_Res.contents[ind].contents[0]) is NavigableString):
                break
        ress[warf_Components_Names[int((ind-3)/2)]] = int(warf_Res.contents[ind].contents[2].split('''\n''')[0].replace(",", "")) if (type(warf_Res.contents[ind].contents[2]) is NavigableString) else 1
    main_Ress['resources'] = ress
    return [main_Ress, Get_Ress(neuro_Res, neuro_Name), Get_Ress(chass_Res, chass_Name), Get_Ress(syst_Res, syst_Name)]


def Get_Weapon_Components(weapon_page):
    # Full table of crafting
    foundary_Table = BeautifulSoup(weapon_page, 'html.parser').find('table',{'class':'foundrytable'})
    # Name of current weapon
    curr_weap = BeautifulSoup(weapon_page, 'html.parser').find('title').text
    weap_Name = curr_weap.split(' | ')[0]
    exc = []
    if (foundary_Table == None): return None
    if (len(foundary_Table.contents[1].contents) <= 15):
        if foundary_Table.text.startswith('\nDefault Combos'): return None
        weap_Res = foundary_Table.contents[1].contents[2]
        return Get_Ress(weap_Res, None, ext_Name = weap_Name)
    # If parts of weapon are craftable and reciepe in same table
    else:
        weap_Res = foundary_Table.contents[1].contents[2]
        main_Weap = dict()
        compl_Components = { weap_Name +' ' + foundary_Table.contents[1].contents[ind-2].contents[1].contents[0].split('''\n''')[0].replace(''' \u2022 ''', ''):foundary_Table.contents[1].contents[ind] for ind in range(10, len(foundary_Table.contents[1].contents), 6)}
        compl_Components_Info = list()
        for comp in compl_Components:
            compl_Components_Info.append(Get_Ress(compl_Components[comp] ,comp))
        # Gathering all components of main weapon receipe
        main_Weap['credits'] = int(weap_Res.contents[1].text.split('''\n''')[0].replace(",", ""))
        main_Weap['time'] = Get_Time(weap_Res.contents[11].contents[0])
        ress = dict()
        for ind in range(3, len(weap_Res.contents)-2, 2):
            if (type(weap_Res.contents[ind].contents[0]) is NavigableString):
                    break
            ress[weap_Res.contents[ind].contents[0].attrs['data-param'] if (weap_Res.contents[ind].contents[0].name == 'span') else weap_Name + ' ' + weap_Res.contents[ind].contents[0].attrs['title']] = int(weap_Res.contents[ind].contents[2].split('''\n''')[0].replace(",", "")) if (type(weap_Res.contents[ind].contents[2]) is NavigableString) else 1
        main_Weap['resources'] = ress
        add_comps_list = list()
        for ite in compl_Components_Info:
            add_comps_list.append(complex_Item(ite['name'], credits = ite['credits'], creation_Time = ite['time'], components = ite['resources']))
        return [main_Weap] + add_comps_list


def Get_Companion_Components(comp_page, name):
    # Full table of crafting
    foundary_Table = BeautifulSoup(comp_page, 'html.parser').find('table',{'class':'foundrytable'})
    # Name of current companion
    curr_comp = BeautifulSoup(comp_page, 'html.parser').find('title').text
    comp_Name = curr_comp.split(' | ')[0]
    if comp_Name == 'Model':
        nam = name.split(' ')[0]
        moa_Page = foundary_Table.parent
        for ind in range(4, len(moa_Page.contents)):
            if nam == moa_Page.contents[ind].text.split('[')[0]:
                return Get_Ress(moa_Page.contents[ind+7].contents[1].contents[2])
    if (foundary_Table == None): return None
    comp_Res = foundary_Table.contents[1].contents[2]
    return Get_Ress(comp_Res, ext_Name = name)


def Get_Archwing_Components(arch_page):
    # Full table of crafting
    foundary_Table = BeautifulSoup(arch_page, 'html.parser').find('table',{'class':'foundrytable'})
    # Resources needed to produce warframe
    curr_arch = BeautifulSoup(arch_page, 'html.parser').find('title').text.split(' | ')[0]
    
    arch_Res = foundary_Table.contents[1].contents[2]
    neuro_Name = curr_arch + ' ' + foundary_Table.contents[1].contents[10].text.split('''\n''')[1]
    neuro_Res = foundary_Table.contents[1].contents[12]
    chass_Name = curr_arch + ' ' + foundary_Table.contents[1].contents[18].text.split('''\n''')[1]
    chass_Res = foundary_Table.contents[1].contents[20]
    syst_Name = curr_arch + ' ' + foundary_Table.contents[1].contents[26].text.split('''\n''')[1]
    syst_Res = foundary_Table.contents[1].contents[28]
    arch_Components_Names = [neuro_Name, chass_Name, syst_Name, arch_Res.contents[9].contents[2].contents[0] if (arch_Res.contents[9].contents[2].name == 'a') else arch_Res.contents[9].contents[0].contents[0].attrs['title']]
    main_Ress = dict()
    # Gathering all components of main archwing receipe
    main_Ress['credits'] = int(arch_Res.contents[1].text.split('''\n''')[0].replace(",", ""))
    main_Ress['time'] = Get_Time(arch_Res.contents[11].contents[0])
    ress = dict()
    for ind in range(3, len(arch_Res.contents)-2, 2):
        if (type(arch_Res.contents[ind].contents[0]) is NavigableString):
                break
        ress[arch_Components_Names[int((ind-3)/2)]] = int(arch_Res.contents[ind].contents[2].split('''\n''')[0].replace(",", "")) if (type(arch_Res.contents[ind].contents[2]) is NavigableString) else 1
    main_Ress['resources'] = ress
    return [main_Ress, Get_Ress(neuro_Res, neuro_Name), Get_Ress(chass_Res, chass_Name), Get_Ress(syst_Res, syst_Name)]


def Get_Resource_Components(res_page):
    # Full table of crafting
    foundary_Table = BeautifulSoup(res_page, 'html.parser').find('table',{'class':'foundrytable'})
    # Name of current resource
    curr_comp = BeautifulSoup(res_page, 'html.parser').find('title').text
    comp_Name = curr_comp.split(' | ')[0]
    if (foundary_Table == None): return None
    res_Res = foundary_Table.contents[1].contents[2]
    return Get_Ress(res_Res)



async def Get_Full_Info(item_List, type):
    res_List = list()
    work_queue = asyncio.Queue()
    # Put some work in the queue
    for it in item_List:
        await work_queue.put(it)
    await asyncio.gather(
            asyncio.create_task(task('One', work_queue, res_List, type)),
            asyncio.create_task(task('Two', work_queue, res_List, type)),
            asyncio.create_task(task('Three', work_queue, res_List, type)),
            asyncio.create_task(task('Four', work_queue, res_List, type))
        )
    return res_List


def Save_To_File(name, item_list):
    with open('./items/' + name, 'w') as outp:
        outp.write('[')
        for ite in range(len(item_list)):
            outp.writelines(item_list[ite].toJSON());
            if ite != len(item_list)-1:
                outp.write(',')
        outp.write(']')


async def main():
    list_With_All_Info = dict()
    #print(Get_Warframe_Components(requests.get('https://warframe.fandom.com/wiki/Ash')))
    #list_With_All_Info['warframes'] = await Get_Full_Info(GetWarframesList(), 'warframe')
    list_With_All_Info['weapons'] = await Get_Full_Info(GetWeaponsList(), 'weapon')
    #list_With_All_Info['companions'] = await Get_Full_Info(GetCompanionsList(), 'companion')
    #list_With_All_Info['archwings'] = await Get_Full_Info(GetArchwingsList(), 'archwing')
    #list_With_All_Info['resources'] = await Get_Full_Info(GetResourcesList(), 'resource')
    #Save_To_File('warframes.json', list_With_All_Info['warframes'])
    Save_To_File('weapons.json', list_With_All_Info['weapons'])
    #Save_To_File('companions.json', list_With_All_Info['companions'])
    #Save_To_File('archwings.json', list_With_All_Info['archwings'])
    #Save_To_File('resources.json', list_With_All_Info['resources'])
    print('ar')


if __name__ == "__main__":

    asyncio.run(main())
