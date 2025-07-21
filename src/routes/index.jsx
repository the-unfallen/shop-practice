import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Index.module.css";

export default function Index() {
    function randomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    const [jewelery, setJewelery] = useState(null);
    const [electronics, setElectronics] = useState(null);
    const [men, setMen] = useState(null);
    const [women, setWomen] = useState(null);
    const [defaultItems, setDefaultItems] = useState([]);

    useEffect(() => {
        const setters = {
            electronics: setElectronics,
            jewelery: setJewelery,
            "men's clothing": setMen,
            "women's clothing": setWomen,
        };

        [
            "electronics",
            "jewelery",
            "men's clothing",
            "women's clothing",
        ].forEach((category) => {
            const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(
                category
            )}`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const randomIndex = randomNumber(data.length);
                    console.log(category);
                    console.log(data[randomIndex]);
                    const setter = setters[category];
                    if (setter) setter(data[randomIndex]);
                })
                .catch((error) => console.error(error));
        });
    }, []);

    if (defaultItems.length === 0 && jewelery && electronics && men && women) {
        const refItems = [jewelery, electronics, men, women];
        setDefaultItems(refItems);
    }

    if (defaultItems.length === 4 && jewelery && electronics && men && women) {
        console.log(defaultItems);
    }

    return (
        <div className={styles.indexProducts}>
            {defaultItems.length > 0 &&
                defaultItems.map((item) => {
                    return (
                        <div key={item.id} className={styles.productBlock}>
                            <div>
                                <Link
                                    to={`/shop/${item.category}`}
                                    className={styles.itemTitle}
                                >
                                    <b>
                                        {capitalizeFirstLetter(item.category)}
                                    </b>
                                </Link>
                            </div>
                            <div>
                                <img src={item.image} alt="" />
                            </div>
                            <div>
                                <b>{`($${item.price})`}</b>
                            </div>
                            <div className={styles.itemTitle}>{item.title}</div>
                        </div>
                    );
                })}
        </div>
    );
}

export function capitalizeFirstLetter(word) {
    const first = word[0].toUpperCase();
    const rest = word.slice(1);
    return first + rest;
}
