import pymongo

colls = ["Resources","Components"]
curr_coll = colls[1]
client = pymongo.MongoClient('mongodb+srv://warframe_manager_admin:FP6hMZWj3m9YSWQJ@warframemanagercluster.jvusw.mongodb.net/test')['WarframeManager'][curr_coll]
# Get all repet objects

result = client.aggregate([
    {
        '$lookup': {
            'from': curr_coll, 
            'let': {
                'curr_name': '$name', 
                'curr_id': '$_id'
            }, 
            'pipeline': [
                {
                    '$match': {
                        '$expr': {
                            '$and': [
                                {
                                    '$eq': [
                                        '$name', '$$curr_name'
                                    ]
                                }, {
                                    '$ne': [
                                        '$_id', '$$curr_id'
                                    ]
                                }
                            ]
                        }
                    }
                }, {
                    '$project': {
                        'name': 1, 
                        '_id': 1
                    }
                }
            ], 
            'as': 'res'
        }
    }, {
        '$match': {
            'res.0': {
                '$exists': True
            }
        }
    }
])._CommandCursor__data
# Delete objects from db
res_len = len(result)
for item in range(res_len):
    for ind in range(item + 1, res_len):
        if ind == res_len: continue
        ite = result[ind]
        if (result[item]['name'] == ite['name'] and result[item]['_id'] != ite['_id']):
            result.remove(ite)
            client.delete_one({"_id": ite['_id']})
            ind = ind - 1
            res_len = res_len - 1
print(result)
