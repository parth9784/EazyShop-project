import React from "react";
export default function Loading(){
    return(
        <div className="flex flex-col justify-center items-center">
        <lottie-player src="https://lottie.host/1f32b23a-8e11-4f0d-8b7b-2688649b6e98/RrdnJjcIc9.json" background="##fff" speed="1" style={{width: "500px", height: "500px"}} loop autoplay direction="1" mode="normal"></lottie-player>
        <h1 className="text-3xl font-bold">Loading......</h1>
        </div>
    );
} 