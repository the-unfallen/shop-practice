import { useState, useEffect } from 'react';
import styles from '../styles/Root.module.css';
import { Link, Outlet, NavLink } from 'react-router-dom';
import Cart from './Cart';
import { capitalizeFirstLetter  } from './index';


export default function Root() {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCategories(data);
            })
            .catch(error => console.error(error))
    }, [])

    return(
        <div className={styles.all}>
            <div className={styles.header}><h1>Shop-Cart Project</h1></div>
            <nav className={styles.navGroup}>
                <div className={styles.navGroupButtons}>
                    <button><Link to="/" className={styles.link}>Home Page</Link></button>
                    <button><Link to="/shop/all" className={styles.link}>Shop Page</Link></button>
                </div>
                <Cart />
            </nav>
            <div className={styles.mainSection}>
                <div className={styles.sideBar}>
                    <div className={styles.categoryHeader}>Categories</div>
                    <ul className={styles.productUL}>
                        {categories && categories.map((category) => {
                            return(
                                <NavLink 
                                    key={category}
                                    to={`/shop/${category}`}
                                    className={({ isActive, isPending }) => 
                                        isActive
                                            ? styles.active
                                            : isPending
                                            ? styles.pending
                                            : ""
                                    }   
                                >
                                    <li  className={styles.productList}>{ capitalizeFirstLetter(category) }</li>
                                </NavLink>
                            )
                        })}
                    </ul>
                </div>
                <div className={styles.outletDiv}>
                    <Outlet />
                </div>
            </div>

        </div>

    )
}