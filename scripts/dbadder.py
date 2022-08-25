from datetime import timedelta
import os
import pymongo
import json

mongo_client = pymongo.MongoClient("mongodb+srv://warframe_manager_user:H9guvYhcVtWk5z25@warframemanagercluster.jvusw.mongodb.net/test")
warf_db = mongo_client["WarframeManager"]
#types_col = warf_db["Types"]


# Get the list of all files and directories
path = "./items/"
dir_list = os.listdir(path)
res_list = list()
componet_list = list()


def Save_To_Db(name, item_list):
    curr_col = warf_db.create_collection(name)
    for item in item_list:
        curr_col.insert_one(item)


# prints all files
for file in dir_list:
    if (not file.endswith('.json')): continue
            # opening the JSON file
    data = open(path + file)
    # deserializing the data
    data = json.load(data)

    #
    for item in data:
        componet_list.append(item)
        #if 'credits' in item:
        #    componet_list.append(item)
        #else:
        #    res_list.append(item)  

#Save_To_Db('Resources', res_list)
Save_To_Db('Components', componet_list)

