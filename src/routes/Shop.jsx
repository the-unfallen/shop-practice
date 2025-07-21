import { useLoaderData, Link } from 'react-router-dom';
import '../styles/Shop.css';

export default function Shop() {
    const items = useLoaderData();
    console.log(items);


    return(
        <div className={'indexProducts'}>
            {items.length > 0 && 
                items.map((item) => {
                    return(
                        <div key={item.id} className={'productBlock'}>
                            <div><img src={item.image} alt="" /></div>
                            <div className={'shopItemPrice'}><b>{`($${item.price})`}</b></div>
                            <Link  to={`/shop/${item.category}/${item.id}`} className={'itemTitle'}>    
                                <div><b>{item.title}</b></div>
                            </Link>
                        </div>

                    )

                })
            }
        </div>
    );
}



export async function loader({ params }) {
    const this_category = params.category;
    const main_categories = ["electronics","jewelery","men's clothing","women's clothing"];
    if(this_category === 'all'){
        const url = `https://fakestoreapi.com/products/`;
        const this_fetched_data =  await fetch(url);
        const this_fetched_object = await this_fetched_data.json();
        console.log({this_fetched_object});
        return this_fetched_object;
    } else if(main_categories.includes(this_category)) {
        const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(this_category)}`;
        const this_fetched_data =  await fetch(url);
        const this_fetched_object = await this_fetched_data.json();
        console.log({this_fetched_object});
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
        }
    }

    
}

