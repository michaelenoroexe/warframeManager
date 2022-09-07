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
        it['type'].append(name)
        Comps_col.update_one({"_id":it["_id"]}, {"$set":{'type':it['type']}})


def AddLoc(name, item_list):
    for item in item_list:
        it = Comps_col.find_one({"name":item})
        it['locations'] = [name]
        #it.append({"locations":name})
        Comps_col.update_one({"_id":it["_id"]}, {"$set":{"locations":it['locations']}})


# MINING ['Auron','Auroxium Alloy','Coprun','Coprite Alloy','Ferros','Fersteel Alloy','Pyrol','Pyrotic Alloy','Azurite','Tear Azurite','Crimzian','Star Crimzian','Devar','Esher Devar','Nyth','Heart Nyth','Sentirum','Radian Sentirum','Veridos','Marquise Veridos','Axidite','Axidrol Alloy','Hesperon','Hespazym Alloy','Travoride','Travocyte Alloy','Venerol','Venerdo Alloy','Amarast','Star Amarast','Goblite','Goblite Tears','Noctrul','Heart Noctrul','Phasmin','Smooth Phasmin','Thyst','Marquise Thyst','Zodian','Radiant Zodian','Adramalium','Adramal Alloy','Bapholite','Tempered Bapholite','Namalon','Devolved Namalon','Thaumica','Thaumic Distillate','Dagonic','Purged Dagonic','Embolos','Cabochon Embolos','Heciphron','Purified Heciphron','Necrathene','Stellated Necrathene','Tiametrite','Faceted Tiametrite','Xenorhast','Trapezium Xenorhast']
items = []
# type - add type to item, locations - add location to resource, NEEDED ID
Add('',items)
