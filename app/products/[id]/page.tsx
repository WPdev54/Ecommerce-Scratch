"use client";
import { useParams } from "next/navigation";

const SingleProduct = () => {

    const {id} = useParams();

    return (
        <div>
        <h1>Product Detail : {id}</h1>
        </div>
    );
}

export default SingleProduct;
