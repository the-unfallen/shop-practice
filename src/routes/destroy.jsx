import { 
    redirect 
} from "react-router-dom";

export async function action ({ request }) {
    const formData = await request.formData();
    const this_title = formData.get('productName');

    // get cart data
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    if(cartData.length === 0) return;
    
    let inCart = false;
    let title_id = null;
    let item_category = null;
    for (let i = 0; i < cartData.length; i++) {
        if (cartData[i].title === this_title) {
            inCart = true;
            title_id = i;
            item_category = cartData[i].category;
            break;
        }
    }

    if (inCart === false) return;
    let newCartData = [...cartData.slice(0, title_id), ...cartData.slice(title_id + 1)];
    
    localStorage.setItem('cartData', JSON.stringify(newCartData));
    // 🔔 Notify listeners
    window.dispatchEvent(new Event("cart-updated"));
    return redirect(`/shop/${item_category}`);
        
}