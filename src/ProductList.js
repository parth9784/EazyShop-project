import React, { useEffect, useState } from "react";
import Product from "./Products";
import Dataarr from "./Data";
import Heading from './Heading';
export default function ProductList({items}){
    return (
        <div className="bg-white max-w-[1220px] sm:mx-[220px] mx-[110px] pl-9 mt-10">    
        <div class=" grow flex flex-row flex-wrap ">
            {items.map((i)=>{
                return(
                    <Product title={i.title} category={i.category} price={i.price} image={i.thumbnail} id={i.id} />
                );
            })}
        </div>
        </div>
    );
}