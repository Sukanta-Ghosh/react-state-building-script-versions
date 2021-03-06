import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Detail({addToCart}) {
    const {id} = useParams();
    const {data: product, error, loading} = useFetch(`products/${id}`)
    const navigate = useNavigate()
    const [sku, setSku] = useState()

    if(loading) return <Spinner/>
    if(!product) return <PageNotFound/>
   if(error) throw error;

    return (
        <div id="detail">
        <ToastContainer/>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p id="price">${product.price}</p>
        <select id="size" value={sku}
        onChange={(e) => setSku(e.target.value)}>
            <option value="">What size?</option>
            {product.skus.map((s) => (
                <option key={s.sku} value={s.sku}>
                    {s.size}
                </option>
            ))}
        </select>
        <p>
            <button disabled={!sku} className="btn btn-primary" onClick={() => {
                addToCart(id, sku)
               toast.success("Item added")
            }}
            >Add to cart</button>
            <button className="btn btn-primary" onClick={() => navigate("/cart")}>Go to cart</button>
        </p>
        <img src={`/images/${product.image}`} alt={product.category} width="25%" height="25%"/>
        </div>
    );
}
