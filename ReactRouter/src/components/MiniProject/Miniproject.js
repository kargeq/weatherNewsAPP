import logo from './logo.svg';
import './App.css';
import Item from './Components/Item.js'
import { useState } from 'react';
const menu = '{\
  "breakfast": [\
    {"food": "pancakes", "price": 5.00, "vegetarian": true}, \
    {"food": "waffles", "price": 5.00, "vegetarian": true}, \
    {"food": "orange juice", "price": 2.00, "vegetarian": true} \
  ],\
  "lunch": [\
    {"food": "turkey sandwich", "price": 8.00, "vegetarian": false},\
    {"food": "grilled cheese", "price": 6.00, "vegetarian": true},\
    {"food": "hamburger", "price": 8.00, "vegetarian": false}\
  ],\
  "dinner": [\
    {"food": "chicken alfredo", "price": 10.00, "vegetarian": false},\
    {"food": "tofu stir-fry", "price": 9.00, "vegetarian": true},\
    {"food": "chili", "price": 8.00, "vegetarian": false}\
  ]\
}';

const list=JSON.parse(menu)


function Miniproject() {


  const [type, changeType]=useState(false)

  const changeFoodOption=()=>{
    changeType((oldType)=>{
      console.log(oldType)
      return !oldType
    })
    

  }
  

  return (
    
    <>
   
   
   <h1>Menu</h1>


  {type? <button onClick={changeFoodOption}>Show Only Vegetarian</button>: <button onClick={changeFoodOption}>Show All</button>}
   <h2>Breakfast</h2>
   {list["breakfast"].map(Element=>{
 return type==true?  <Item name={Element.food} cost={Element.price} veggy={type}></Item>:<></>
     

    }
     )}
     {list["breakfast"].map(Element=>{
 return (type==false && Element.vegetarian)?  <Item name={Element.food} cost={Element.price} veggy={type}></Item>:<></>
     

    }
     )}
  <h2>Lunch</h2>
  {list["lunch"].map(Element=>{
 return type==true?  <Item name={Element.food} cost={Element.price} veggy={type}></Item>:<></>
     

    }
     )}
     {list["lunch"].map(Element=>{
 return (type==false && Element.vegetarian)?  <Item name={Element.food} cost={Element.price} veggy={type}></Item>:<></>
     

    }
     )}
  <h2>Dinner</h2>

  {list["dinner"].map(Element=>{
 return type==true?  <Item name={Element.food} cost={Element.price} veggy={type}></Item>:<></>
     

    }
     )}
     {list["dinner"].map(Element=>{
 return (type==false && Element.vegetarian)?  <Item name={Element.food} cost={Element.price} veggy={type}></Item>:<></>
     

    }
     )}
 
   </>
  );
}

export default Miniproject;