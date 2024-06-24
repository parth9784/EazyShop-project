import React, { useEffect, useState } from "react";
import Product from "./Products";
import getdata from "./Data";
export default function ProductList({items}){
    return (
        <div class="flex flex-row flex-wrap ">
            {items.map((i)=>{
                return(
                    <Product title={i.title} category={i.category} price={i.price} image={i.thumbnail} id={i.id} />
                );
            })}
        </div>
    );
}