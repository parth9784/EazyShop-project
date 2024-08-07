import React, { useState } from "react";
import Heading from './Heading';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProductList from './ProductList';
import Dataarr from "./Dataarr";
import Loading from "./Loading";
import Foooter from "./Foooter"
import Pagenf from "./pagenf";
import Details from "./productdetail";
import Cart from "./cart";
import Signup from "./Signup";
import LoginPage from "./Login";
function App() {
  const location = useLocation();
  const saved_data=localStorage.getItem("cart") || "{}";
  const data_json=JSON.parse(saved_data);
  const[cart,upcart]=useState(data_json);
  function handleaddtocart(productid,procount){
    let oldcount=cart[productid] || 0;
    const newcart={...cart,[productid]:procount+oldcount};
    upcart(newcart);
    let cartstr=JSON.stringify(newcart);
    localStorage.setItem("cart",cartstr);
  }
  const totalcount=Object.keys(cart).reduce((x,y)=>{
    return x+cart[y];
  },0)

  
  let alldata=Dataarr();
    if(!alldata){
      return <Loading></Loading>;
    }
  return (
    <div className="bg-[#F7F5F7] w-screen flex flex-col gap-20">   
     {location.pathname !== "/signup"&& location.pathname !== "/login" && <Heading c={totalcount} />}
        <div className="flex flex-col grow">
        <Routes>
        <Route path="/" element={<ProductList />}></Route>
        <Route path="/ProductDetails/:sku" element={<Details  onaddtocart={handleaddtocart}/>}></Route>
        <Route path="/cart" element={<Cart cart={cart} upcart={upcart}/>}></Route>
        <Route path="/signup" element={<Signup/>} ></Route>
        <Route path="/login" element={<LoginPage/>} ></Route>
        <Route path="*" element={<Pagenf/>} ></Route>
        </Routes>
        </div>
      <Foooter/>
    </div>
  );
}

export default App;
