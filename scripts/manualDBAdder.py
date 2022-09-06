from datetime import timedelta
import os
import pymongo
import json

mongo_client = pymongo.MongoClient("mongodb+srv://warframe_manager_user:H9guvYhcVtWk5z25@warframemanagercluster.jvusw.mongodb.net/test")
warf_db = mongo_client["WarframeManager"]
Comps_col = warf_db["Components"]


def Add(name, item_list, targ):
    for item in item_list:
        it = Comps_col.find_one({"name":item})
        it[targ].append(name)
        Comps_col.update_one({"_id":it["_id"]}, {"$set":{targ:it[targ]}})


def AddLocation(name, item_list):
    pass

items = []
# type - add type to item, locations - add location to resource
Add('',items)
