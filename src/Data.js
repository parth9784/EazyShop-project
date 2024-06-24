import React from "react";
import axios from "axios";
export default function getdata(){
    return axios.get("https://dummyjson.com/products")
}