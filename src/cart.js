import React, { useEffect, useState } from "react";
import { getbyid } from "./Data";
import Cartitem from "./Cartitem";
export default function Cart({cart}){
    const [product,setproduct]=useState([])
    const productid=Object.keys(cart)
    // console.log(productid)
    useEffect(function(){
    let mypromise=[];
        for(let i=0;i<productid.length;i++){
            const promise=getbyid(productid[i]).then((res)=>{return res.data})
            mypromise.push(promise)
        }
        Promise.all(mypromise).then((p)=>{
            setproduct(p)
        })
    },[])
    return(
        <div className=" flex justify-center">
        <div className="bg-white w-[1250px] h-[800px] flex justify-center">
        <h2 className="text-4xl text-orange-600 self-start mt-5">Cart</h2>
        <div className="w-[850px] mt-[80px]">
        {
            product.map((p)=>{
                return  <Cartitem title={p.title} quantity={cart[p.id]} url={p.thumbnail} price={(p.price)}/>
            }) 
        }
        </div>
        </div>
        </div>
    );
} 