import { useEffect, useState } from "react";
import { getdata } from "./Data";
export default function Dataarr(){
    const [alldata1,upalldata]=useState([]);
    useEffect(function(){
    const xyz=getdata();
    xyz.then(function(response){
      upalldata(response.data.products);
    })
  },[]);
    return(alldata1);
}
// export default Dataarr;