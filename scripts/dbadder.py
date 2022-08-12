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


# prints all files
for file in dir_list:
    if (not file.endswith('archwings.json')): continue
            # opening the JSON file
    data = open(path + file)
    # deserializing the data
    data = json.load(data)
    curr_col = warf_db.create_collection(file.split('.')[0])
    for item in data:
        curr_col.insert_one(item)

def Save_To_File(name, item_list):
    with open('../items/' + name, 'r') as outp:
        outp.write('[')
        for ite in item_list:
            outp.writelines(ite.toJSON());
            outp.write(',')
        outp.write(']')

