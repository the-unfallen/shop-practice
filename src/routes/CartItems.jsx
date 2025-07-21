import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CartItems.css'

export default function CartItems() {
    const initialCartData = JSON.parse(localStorage.getItem('cartData')) || [];
    const [cartData, setCartData] = useState(initialCartData);

    function findItemInCart(product_id){
        let found = false;
        let product_index = null;
        let refCartData = [...cartData];
        for (let i = 0; i < refCartData.length; i++){
            if(refCartData[i].id === product_id){
                found = true;
                product_index = i;
                break;
            }
        }
        return { found, product_index }
    }



    function RemoveCartItem(product_id) {
        // check that item is in cart
        const { found, product_index } = findItemInCart(product_id);
        if (found === false) return;
        const modifiedRefCartData = [...cartData.slice(0, product_index), ...cartData.slice(product_index + 1)];
        localStorage.setItem('cartData', JSON.stringify(modifiedRefCartData));
        // 🔔 Notify listeners
        window.dispatchEvent(new Event("cart-updated"));
        setCartData(modifiedRefCartData);
    }

    function increaseQuantity(product_id) {
        // check that item is in cart
        const { found, product_index } = findItemInCart(product_id);
        if (found === false) return;
        const refCartData = [...cartData];
        // increment quantity
        refCartData[product_index].quantity += 1;
        // update local storage
        localStorage.setItem('cartData', JSON.stringify(refCartData));
        // 🔔 Notify listeners
        window.dispatchEvent(new Event("cart-updated"));
        // update state
        setCartData(refCartData);
    }

    function decreaseQuantity(product_id) {
        //check that item is in cart
        const { found, product_index } = findItemInCart(product_id);  // destructuring
        if (found === false)return;
        const refCartData = [...cartData];   // shallow copy
        // if quantity is at 0, just return
        if (refCartData[product_index].quantity <= 0) return;
        // else decrease quantity by 1
        refCartData[product_index].quantity -= 1;
        // update local storage
        localStorage.setItem('cartData', JSON.stringify(refCartData));
        // 🔔 Notify listeners
        window.dispatchEvent(new Event("cart-updated"));
        // update state
        setCartData(refCartData);

    }

    return (
        <div>
            {cartData.length > 0 && 
                cartData.map((product) => {
                    return(
                        <div key={product.id} className='myCartItem'>
                            <div className='cartItemImage'><img src={product.image} alt={product.title} /></div>
                            <div className='cartItemStats'>
                                <span><Link to={`/shop/${product.category}/${product.id}`}>{product.title}</Link></span>
                                <span>Price Per Unit: {product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                                <span>Quantity: {product.quantity}</span>
                                <span>Total Cost: {(product.quantity * product.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                            </div>
                            <div className="cartItemModify">
                                <div className="modifyQuantity">
                                    <input
                                        type="number"
                                        value={product.quantity}
                                        readOnly
                                    />
                                    <button
                                        onClick={() => increaseQuantity(product.id)}
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => decreaseQuantity(product.id)}
                                    >
                                        Reduce
                                    </button>
                                </div>
                                <div className="removeCartItem">
                                    <button
                                        onClick={() => RemoveCartItem(product.id)}
                                    >
                                        Remove Cart Item
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};