import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Index from "./routes/index.jsx";
import Shop, { loader as shopLoader } from "./routes/Shop.jsx";

import ProductCard, {
    loader as productLoader,
    action as productAction,
} from "./routes/ProductCard.jsx";

import { action as destroyAction } from "./routes/destroy.jsx";
import CartItems from "./routes/CartItems.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Index /> },
            {
                path: "/shop/:category",
                element: <Shop />,
                errorElement: <ErrorPage />,
                loader: shopLoader,
            },
            {
                path: "/shop/:category/:productId",
                element: <ProductCard />,
                errorElement: <ErrorPage />,
                loader: productLoader,
                action: productAction,
            },
            {
                path: "/shop/:category/:productId/destroy",
                action: destroyAction,
                errorElement: <ErrorPage />,

            },
            {
                path: "/mycart",
                element: <CartItems/>,
                errorElement: <ErrorPage />,
            }
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
