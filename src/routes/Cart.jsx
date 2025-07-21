import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiCart } from "@mdi/js";
import "../styles/Cart.css";

export default function Cart() {
    const [cartData, setCartData] = useState(() => {
        return JSON.parse(localStorage.getItem("cartData")) || [];
    });

    useEffect(() => {
        const handleCartUpdate = () => {
            const data = JSON.parse(localStorage.getItem("cartData")) || [];
            setCartData(data);
        };

        window.addEventListener("cart-updated", handleCartUpdate);

        return () => {
            window.removeEventListener("cart-updated", handleCartUpdate);
        };
    });

    const totalQuantity = () => {
        let total = 0;
        if (cartData.length < 1) return 0;
        for (let i = 0; i < cartData.length; i++) {
            total = total + cartData[i].quantity;
        }
        return total;
    };

    const totalCost = () => {
        let total = 0;
        if (cartData.length < 1) return 0;
        for (let i = 0; i < cartData.length; i++) {
            total = total + cartData[i].quantity * cartData[i].price;
        }
        return total;
    };

    return (
        <div className="cartContainer">
            <span>
                <button className="cartButton">
                    <Link to="/mycart">
                        <span>My Cart</span>
                        <Icon path={mdiCart} size={1} />
                    </Link>
                </button>
            </span>
            <span>
                <b>
                    {`Quantity: ${totalQuantity()}`} &nbsp;{" "}
                    {`Total: ${totalCost().toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}`}{" "}
                </b>
            </span>
        </div>
    );
}
