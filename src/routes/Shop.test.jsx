import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// Mock the hook
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useLoaderData: () => products,
    };
});



import Shop from "./Shop";



const products = [
    {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack",
        category: "men's clothing",
        description:
            "Perfect pack for everyday use. Stash your laptop in the padded sleeve.",
        price: 109.95,
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: {
            rate: 3.9,
            count: 120,
        },
    },
    {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts",
        category: "men's clothing",
        description:
            "Slim-fitting style with soft fabric for everyday comfort.",
        price: 22.3,
        image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
        rating: {
            rate: 4.1,
            count: 259,
        },
    },
];

describe("Shop Component Exist", () => {
    
    it("Shop Component Exist", () => {
        render(
            <MemoryRouter>
                <Shop />
            </MemoryRouter>
        );
        expect(screen.getByText(/Fjallraven - Foldsack/i)).toBeInTheDocument();
        expect(screen.getByText(/Mens Casual Premium Slim Fit/i)).toBeInTheDocument();
    });

    it("Shop", () => {
        const { container } = render(
            <MemoryRouter>
                <Shop />
            </MemoryRouter>
        );
        // screen.debug();
        expect(container).toBeTruthy();
    });
});
