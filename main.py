import numpy as np
from flask import Flask,request,jsonify
from flask_cors import CORS
from util import columns,get_locations,predictvalue
app=Flask(__name__)
CORS(app)
@app.route("/")
def main():
    return "hello"

@app.route("/location",methods=["GET"])
def locations():
    return jsonify({"locations":get_locations()})


@app.route("/predict",methods=["POST"])
def predict():
    data=request.json
    data=data["data"]
    bath=data["bathroom"]
    balcony=data["balcony"]
    bhk=data["bhk"]
    sqft=data["sqft"]
    location=data["location"]
    predicted=predictvalue([bath,balcony,sqft,bhk,location])
    print(predicted)
    return jsonify({"predicted_value":predicted[0]})
if __name__=="__main__":
    app.run(debug=True)