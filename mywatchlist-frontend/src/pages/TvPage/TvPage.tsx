import { Component } from "react";
import {useParams} from "react-router-dom";
import { getTVImages } from "../../api/API";
import { apiConfig } from "../../Config";


const TvPage = () => {
    
    const params = useParams();
    var movieID = params.id as string;

    return (
        
        <div className="flex justify-center mx-auto my-10 p-10 w-3/4">
            <h2 className="font-extrabold text-7x1 text-center text-blue-400">TV details: {movieID}</h2>
        </div>
    )
}

export default TvPage;