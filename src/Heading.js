import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
export default function Heading(){
    return(
        <div className="flex justify-between items-center shadow-lg mt-3 bg-white">
            <img src="logo.png" className="h-[80px] ml-[50px]"/>
            <div className="flex gap-8 mr-5">
                <Link className="flex gap-2 items-center text-center"><i class="fa-solid fa-house"></i>Home</Link>
                <Link className="flex gap-2 items-center text-center"><i class="fa-solid fa-address-card"></i>About</Link>
                <Link className="flex gap-2 items-center text-center"><i class="fa-solid fa-phone"></i>Contact</Link>
                <Link className="flex gap-2 items-center text-center"><i class="fa-solid fa-user"></i>
                Account</Link>
            </div>
        </div>
    );
}