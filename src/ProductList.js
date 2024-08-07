import React, { useState, useEffect } from "react";
import Product from "./Products";
import Loading from "./Loading";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Getdata } from "./Data";

export default function ProductList(){
    const navigate = useNavigate();
    let [searchparam, setsearchparam] = useSearchParams();
    let params = Object.fromEntries([...searchparam]);
    
    let [data, setdata] = useState([]);
    let [sortBy, setsortBy] = useState("");
    let { page, sort, query } = params;
    let Pagenumber = page || 1;
    sort = sort || "asc";
    query = query || "";
    let [lastpage, setlastpage] = useState();
    
    useEffect(() => {
        let token = localStorage.getItem("token");
        if (!token) {
            navigate("/signup");
        }
    }, [navigate]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Getdata(sort, query, Pagenumber, sortBy);
                setlastpage(result.data.meta.last_page);
                setdata(result.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [query, sort, Pagenumber, sortBy]);
    
    function handle(event) {
        let q = event.target.value;
        setsearchparam({
            ...params,
            query: q,
            page:1
        });
    }
  
    function handlesort(event) {
        let s = event.target.value;
        setsearchparam({
            ...params, 
            sort: s
        });
    }
    
    useEffect(() => {
        if (sort === "asc" || sort === "desc") {
            setsortBy("price");
        } else if (sort === "SN") {
            setsortBy("title");
        }
    }, [sort]);
    
    if (!data) {
        return <Loading />;
    }
    
    return (
        <div>
            <div className='flex items-center justify-between mx-4 px-7 '>
                <div className="w-10">
                    <div className="relative w-full min-w-[200px] h-10">
                        <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <input
                            onChange={handle}
                            className="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-blue-gray-200 focus:border-gray-900"
                            placeholder=" "
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                            Search Products
                        </label>
                    </div>
                </div> 
                <div>
                    <select className='border-black' onChange={handlesort}>
                        <option value="asc">Sort By Default</option>
                        <option value="asc">Sort By Title</option>
                        <option value="asc">Sort By Price- Low to High</option>
                        <option value="desc">Sort By Price- High to Low</option>
                    </select>
                </div>
            </div>
            <div className="bg-white max-w-[1220px] sm:mx-[220px] mx-[110px] pl-9 mt-10">    
                <div key="qq" className="grow flex flex-row flex-wrap">
                    {data.map((i) => {
                        return (
                            <Product key={i.id} title={i.title} category={i.category} price={i.price} id={i.id} />
                        );
                    })}
                </div>
                {[...Array(lastpage).keys()].map((item) => {
                    return (
                        <Link
                            // to={`?page=${item + 1}&sort=${sort}&query=${query}`}
                            to={"?"+new URLSearchParams({...params,page:item+1})}
                            key={item}
                            className={`p-2 mb-2 mr-2 bg-blue-400 rounded ${item + 1 === parseInt(Pagenumber) ? "bg-red-400" : ""}`}
                        >
                            {item + 1}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
