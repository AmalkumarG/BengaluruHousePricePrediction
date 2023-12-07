import numpy as np
import json
import pickle

__data=None
__location=None
__model=None
def get_locations():
    columns()
    return __location

def columns():
    with open("./model/columns.json","r") as f:
        data=json.load(f)
        global __data,__location,__model
        __data=data["data_columns"]
        __location=__data[4:]
        with open("./model/model.pkl","rb") as f:
            __model=pickle.load(f)
        
def predictvalue(x):
    if len(__data)==0:
        columns()
    try:
        location_index=__data.index(x[4].lower())
    except:
        location_index=-1
    z=np.zeros(len(__data))
    z[0]=x[0]
    z[1]=x[1]
    z[2]=x[2]
    z[3]=x[3]
    if location_index>=0:
        if x[4]=="Other":
            z[location_index]=0
        else:
            z[location_index]=1
    return __model.predict([z])
