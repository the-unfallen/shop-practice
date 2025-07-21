import { useLoaderData, Form, redirect } from "react-router-dom";
import '../styles/ProductCard.css';
import StarRating from "./StarRating";


export default function ProductCard() {
    const product = useLoaderData();
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    
    function quantityInCart(){
        if(cartData.length === 0)return 0;
        for(let i = 0; i < cartData.length; i++ ){
            if(cartData[i].title === product.title) {
                return cartData[i].quantity;
            }
        }
        return 0;
    }

    const productQuant = quantityInCart();


    function inCart(){
        if(cartData.length === 0)return false;
        for(let i = 0; i < cartData.length; i++ ){
            if(cartData[i].title === product.title) {
                return true
            }
        }
        return false;
    }

    return (
        <div className="productCard">
            <div className="productCanvas">
                <div className="productTitle">
                    {product.title}
                </div>
                <span className="productStars">
                    <span>
                        <b>{`${product.rating.rate.toFixed(2)}`}</b>
                    </span>
                    {/* Star rating v1 */}
                    <span >
                            <StarRating rating={product.rating.rate}/>
                    </span>
                    <span>
                        {`${product.rating.count} ratings`}
                    </span>
                </span>
                <div className="productImage">
                    <img src={product.image} alt="" />
                </div>
                
                
            </div>
            <div className="productDetails">
                <div className="productValue">
                    <span>
                        {`${product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}
                    </span>
                </div>
                <div className="productDescription">
                    <span>About this Item:</span><br />
                    {product.description}
                </div>
                <div className="formParent">
                    <Form method="post" className="productForm">
                        <input 
                            type="text"
                            hidden
                            defaultValue={product.title}
                            name="productName"
                        />
                        <input 
                            type="number"
                            hidden
                            defaultValue={product.id}
                            name="productId"
                        />
                        <input 
                            type="text"
                            hidden
                            defaultValue={product.price}
                            name="productPrice"
                        />
                        <label>
                            Quantity:
                            <input 
                                type="number" 
                                min={1}
                                name="productQuantity"
                                defaultValue={productQuant > 0 ? productQuant : 1}
                            />
                        </label>
                        <button type="submit">
                            {inCart() ? `Change Quantity` : `Add to Cart`}
                            
                        </button>
                    </Form>
                </div>
                <div 
                    className="removeCart"
                    hidden = {!inCart()}
                >
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if(
                                !confirm(
                                    "Please confirm you want to remove item from cart"
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <input 
                            type="text"
                            hidden
                            defaultValue={product.title}
                            name="productName"
                        />
                        <button type='submit'>Remove From Cart</button>
                    </Form>
                    
                </div>
            </div>
        </div>
    );
}

export async function loader({ params }) {
    const product_id = params.productId;
    console.log(product_id);
    const url =  `https://fakestoreapi.com/products/${encodeURIComponent(product_id)}`;
    console.log(url);
    const this_fetched = await fetch(url);
    const this_fetched_object = await this_fetched.json();

    if(this_fetched_object){
        return this_fetched_object;
    } else {
        return {
            id: -1,
            category: "",
            description: "",
            title: 'Nothing',
            image: '',
            price: '',
            rating: '',
            quantity: 0,
        }
    }
}

export async function action({ request }) {
    const formData = await request.formData();
    const productId = formData.get("productId");
    const this_title = formData.get("productName");
    console.log('%cTitle: %s', 'color: green; font-weight: bold;', this_title);
    const this_price = parseFloat(formData.get("productPrice"));
    console.log('%cPrice: %s', 'color: green; font-weight: bold;', this_price);
    const this_quantity = parseInt(formData.get("productQuantity"));
    console.log('%cQuantity: %s', 'color: green; font-weight: bold;', this_quantity);
    // const this_object = {title: this_title, price: this_price, quantity: this_quantity};

    ////// get product details
    const url =  `https://fakestoreapi.com/products/${encodeURIComponent(productId)}`;
    console.log(url);
    const this_fetched = await fetch(url);
    const this_fetched_object = await this_fetched.json();
    this_fetched_object.quantity = this_quantity;

    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

    if (cartData.length > 0) {
        let found = false;
        for (let i = 0; i < cartData.length; i++) {
            let this_data = cartData[i];
            if(this_data.title === this_title){
                cartData[i] = this_fetched_object;
                found = true;
                break;
            }
        }
        if( found === false) {
            cartData.push(this_fetched_object);
        }
    }else{
        cartData.push(this_fetched_object);
    };

    localStorage.setItem('cartData', JSON.stringify(cartData));
    // 🔔 Notify listeners
    window.dispatchEvent(new Event("cart-updated"));

    return redirect('/mycart');
}

