import React, { useEffect, useState } from "react";
import { getbyid } from "./Data";
import Cartitem from "./Cartitem";
import Loading from "./Loading";
export default function Cart({cart,upcart}){
    const[loading,setloading]=useState(true)
    const [product,setproduct]=useState([])
    const productid=Object.keys(cart)
    function handleremove(data){
        const newcart={...cart}
        delete newcart[data]
        upcart(newcart)
    let cartstr=JSON.stringify(newcart);
    localStorage.setItem("cart",cartstr);
    }
    // console.log(productid)
    useEffect(function(){
    let mypromise=[];
        for(let i=0;i<productid.length;i++){
            const promise=getbyid(productid[i]).then((res)=>{return res.data})
            mypromise.push(promise)
        }
        Promise.all(mypromise).then((p)=>{
            setproduct(p)
            setloading(false)
        })
    },[cart])
    if(loading){
        return <Loading/>
    }
    return(
        <div className=" flex justify-center">
        <div className="bg-white w-[1250px] h-[800px] flex justify-center">
        <h2 className="text-4xl text-orange-600 self-start mt-5">Cart</h2>
        <div className="w-[850px] mt-[80px]">
        {
            product.map((p)=>{
                return  <Cartitem title={p.title} quantity={cart[p.id]} url={p.thumbnail} price={(p.price)} pid={p.id} remove={handleremove}/>
            }) 
        }
        </div>
        </div>
        </div>
    );
} 