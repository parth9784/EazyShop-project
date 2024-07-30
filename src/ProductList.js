import React, { useState,useMemo, useEffect } from "react";
import Product from "./Products";
import Dataarr from "./Dataarr";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

export default function ProductList(){
    const navigate=useNavigate()
    let alldata=Dataarr();
    let [query,setquery]=useState("");
    let [sort,upsort]=useState("DS");
    useEffect(()=>{
      let token=localStorage.getItem("token");
      if(!token){
        navigate("/signup")
      }
    },[])
    let data= alldata.filter(function(item){
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    function handle(event){
      let q=event.target.value;
      setquery(q);
    }
  
    function handlesort(event){
      let s=event.target.value;
      upsort(s);
    }
    useMemo(()=>{
      if(sort==="SPLH"){
        data.sort((x,y)=>{
          return x.price-y.price;
        })
      }
      else if(sort==="SPHL"){
        data.sort((x,y)=>{
          return y.price-x.price;
        })
      }
      else if(sort==="SN"){
        data.sort((x,y)=>{
          return x.title < y.title ? -1:1;
        });
      }

    }, [sort])
    
    if(!data || !alldata){
        return <Loading/>;
    }
    return (
        <div>
        <div className='flex items-center justify-between mx-4 px-7 '>
        <div class="w-10">
            <div class="relative w-full min-w-[200px] h-10">
              <div class="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
              <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <input
                onChange={handle}
                class="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-blue-gray-200 focus:border-gray-900"
                placeholder=" " /><label
                class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Search Products
              </label>
            </div>
          </div> 
          <div>
          <select className='border-black' onChange={handlesort} >
          <option value="DS">Sort By Default</option>
          <option value="SN">Sort By Title</option>
          <option value="SPLH">Sort By Price- Low to High</option>
          <option value="SPHL">Sort By Price- Low to High</option>
          </select>
          </div>
        </div>
        <div className="bg-white max-w-[1220px] sm:mx-[220px] mx-[110px] pl-9 mt-10">    
        <div class=" grow flex flex-row flex-wrap ">
            {data.map((i)=>{
                return(
                    <Product title={i.title} category={i.category} price={i.price} image={i.thumbnail} id={i.id} />
                );
            })}
        </div>
        </div>
        </div>
    );
}