import React from "react";
import { MdCancel } from "react-icons/md";
export default function Cartitem({url,price,quantity,title,pid,remove}){
    function handlecancel(pid){
        remove(pid)
    }
    return(
        <div className="m-4 flex items-center justify-around w-full  h-[100px] border-solid border-black border-2">
        <div className="flex justify-center items-center text-2xl">
        <MdCancel onClick={()=>{handlecancel(pid)}} style={{ cursor: 'pointer'}}/>
        </div>
            <div>
                <img src="https://picsum.photos/300/200" className="h-[80px] rounded"/>
            </div>
            <h2 className="font-semibold text-xl text-orange-600">{title}</h2>
            <h2 className="font-semibold text-md">${price}</h2>
            <input type="number" className="w-[40px] h-[30px]" value={quantity}></input>
            <h2>${(quantity*price).toFixed(2)}</h2>
        </div>
    );
}