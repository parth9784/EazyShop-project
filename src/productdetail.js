import React, { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getbyid } from "./Data";
import Loading from "./Loading";
import Nodatafound from "./nodatafound";
export  default function Details({onaddtocart}){
    let id = useParams();
    let sno=id.sku;
    // console.log(id)
    const [product,upproduct]=useState();
    const[loading,setloading]=useState(true);
    const[count,upcount]=useState(1);
    useEffect(function(){
        const p=getbyid(id.sku);
        p.then(function(response){
            upproduct(response.data);
            setloading(false);
        }).catch(()=>{
            setloading(false);
        })

    })
    if(loading){
        return <Loading/>
    }
    if(!product){
        return <Nodatafound/>
    }
    function handleclick(){
        onaddtocart(sno,count);
    }
    function handlechange(event){
        upcount(+event.target.value)
    }
    console.log(count);
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
        <input type="number" onChange={handlechange} class=" bg-gray-200 mt-3 mr-2 w-[45px] h-[35px] rounded" min="1" max="10" step="1" placeholder="1"></input>
        <button onClick={handleclick} class="bg-red-500  hover:bg-red-700 rounded font-bold text-white px-2 py-2 mt-5">
          ADD TO CART
        </button>
        </div>
        </div>
    );

}

