import axios from "axios";
export function getdata(){
    return axios.get("https://dummyjson.com/products")
}
export function getbyid(id){
    return axios.get("https://dummyjson.com/products/"+ id)
}
export async function Getdata(sort,query,Pagenumber,sortBy){
    let params={};
    if(query){
        params.search=query;
    }
    if(sort){
        params.sortType=sort
        params.sortBy=sortBy;
    }
    if(Pagenumber){
        params.page=Pagenumber;
    }
    let data=await axios.get("https://myeasykart.codeyogi.io/products",{params});
    return(data)


}