import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import shower from "./Assets/shower_head.svg"
import bed from "./Assets/bed.svg"
import balcony from "./Assets/balcony.svg"
import location_tag from "./Assets/location.svg"
import sqft from "./Assets/sqft.svg"
function App() {
  const [location,setLocation]=useState([])
  const [bhk,setBhk]=useState()
  const [ bathroom,setBathroom]=useState()
  const [loc,setLoc]=useState()
  const [squareFt,setSquareFt]=useState()
  const [balconys,setBalconys]=useState()
  const [predicted,setPredicted]=useState()


  useEffect(() => {
    fetch("http://localhost:5000/location", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }}).then(res=>res.json()).then(json=>{
        setLocation(json.locations)
      })
  }, [])
  
  return (
    <div
        className="setBackground"
        style={{
          height: "100vh",
          backgroundColor: "blue",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {
          !predicted?
          <div class="card text-center">
          <div class="card-header fs-1 fw-bold text-success fst-italic">
            Bengaluru House Price Prediction
          </div>
          <div class="card-body">
            <div class="input-group flex-nowrap mb-2">
              <span class="input-group-text" id="addon-wrapping">
              <img src={bed} height={20} />
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="No. of BHK"
                aria-describedby="addon-wrapping"
                onChange={(e)=>setBhk(e.target.value)}
              />
            </div>
            <div class="input-group flex-nowrap mb-2">
              <span class="input-group-text" id="addon-wrapping">
                <img src={shower} height={20} />
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="No. of bathrooms"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                onChange={(e)=>setBathroom(e.target.value)}
              />
            </div>
            <div class="input-group flex-nowrap mb-2">
              <span class="input-group-text" id="addon-wrapping">
              <img src={sqft} height={20} />
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Sqaure feet"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                onChange={(e)=>setSquareFt(e.target.value)}
              />
            </div>
            <div class="input-group flex-nowrap mb-2">
              <span class="input-group-text" id="addon-wrapping">
              <img src={balcony} height={20} />
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="No. of Balconys"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                onChange={(e)=>setBalconys(e.target.value)}
              />
            </div>
            <div class="input-group flex-nowrap mb-2">
              <span class="input-group-text" id="addon-wrapping">
              <img src={location_tag} height={20} />
              </span>
              <select className={`form-control ${loc?"option_selected":"not_selected"}`} onChange={(e)=>setLoc(e.target.value)}>
              <option >Select Location</option>
        {
          location.map(location=>(
            
            <option className="option_selected" >{location}</option>
          ))
        }
        
        </select>
             
            </div>
         
              
         
        
            
            <button className="btn btn-info text-light" onClick={()=>fetch("http://localhost:5000/predict", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ data:{
                    bhk:bhk,location:loc,bathroom:bathroom,sqft:squareFt,balcony:balconys
                  } }),
                }).then(res=>res.json()).then(json=>setPredicted(json.predicted_value))}>
              Predict value
            </button>
          
            
          </div>
        </div>
      :<div>



      <div class="card text-center">
  <div class="card-header text-success fs-3 fw-bold fst-italic">
    Value Predicted Successfully
  </div>
  <div class="card-body">




  <table class="table">
  <thead>
    <tr>
     
      <th scope="col">BHK</th>
      <th scope="col">Bathrooms</th>
      <th scope="col">Balcony</th>
      <th scope="col">Sqft</th>
      <th scope="col">Location</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td>{bhk}</td>
      <td>{bathroom}</td>
      <td>{balconys}</td>
      <td>{squareFt}</td>
      <td>{loc}</td>
    </tr>
  </tbody>
</table>
    
    <p class="card-text">Predicted value is <h5 className="text-success">$ {predicted}</h5></p>
    <a  class="btn btn-info" onClick={()=>setPredicted()}>back</a>
  </div>
</div>








              </div>
        }
      </div>

       
    
  );
}

export default App;
