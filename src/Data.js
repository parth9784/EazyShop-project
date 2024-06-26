import axios from "axios";
export function getdata(){
    return axios.get("https://dummyjson.com/products")
}
export function getbyid(id){
    return axios.get("https://dummyjson.com/products/"+ id)
}