import React, { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getbyid } from "./Data";
import Loading from "./Loading";
export  default function Details(){
    let id = useParams();
    // console.log(id)
    let [product,upproduct]=useState();
    useEffect(function(){
        const p=getbyid(id.sku);
        p.then(function(response){
            upproduct(response.data);
        })

    })
    if(!product){
        return <Loading/>
    }
    // let pro=getdata();
    // let xyz=pro.then(function(response){
    //     return(response.data.products);
    // })
    // console.log(xyz)
    // let product;
    // for(let i=0;i<pro.length;i++){
    //     let p=pro[i];
    //     if(sno==p.id){
    //         product=p;
    //         break;
    //     }
    // }
    // console.log(product)
    let discount=((product.discountPercentage)*(product.price)/100)
    let oriprice=product.price+discount;
    return (
        <div className="flex shadow-lg max-w-[900px] m-3 ">
        <div>
            <img src={product.thumbnail} class="basis-[45%] max-w-xs h-[350px] m-4 shadow-lg rounded-lg transition-all duration-300 hover:scale-110"></img> 
        </div>
        <div class="px-6">
        <h1 class="basis-[55%] text-2xl mt-3 text-gray-500 font-bold">
        {product.title}
        </h1>
        <p>By {product.brand}</p>
        <p class="text-xl font-bold mt-3">$ {product.price}</p>
        <p className="mt-1"><s className="text-gray-400">M.R.P: ${oriprice.toFixed(2)}</s>&nbsp;<a className="text-sm font-bold">{product.discountPercentage}% Off</a></p>
        <p className="text-sm font-semibold">Rating: {product.rating}/5</p>
        <p className="text-md font-semibold mt-1">{product.returnPolicy}</p>
        <p class="mt-3 text-gray-500">
        {product.description}
        </p>
        <button class="px-4 py-2 bg-gray-200 mt-3 mr-2">1</button>
        <button class="bg-red-500  hover:bg-red-700 rounded font-bold text-white px-2 py-2 mt-5">
          ADD TO CART
        </button>
        </div>
        </div>
    );

}

