import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Vans() {
    const [vans, setVans] = useState([]);

    // fetch data from the server
    useEffect(() => {
        fetch("/api/vans")
            .then((res) => res.json())
            .then((data) => setVans(data["vans"]));
    }, []);

    const vanElements = vans.map((van) => (
        <div className="van-tile" key={van.id}>
            <Link
                to={`/vans/${van.id}`}
                aria-label={`View details for ${van.name} van, priced at $${van.price} per day`}
            >
                <img src={van.imageUrl} alt={`image of ${van.name} van`} />
                <div className="van-info">
                    <div>
                        <h3>{van.name}</h3>
                        <span className={`van-type ${van.type}`}>
                            {van.type}
                        </span>
                    </div>
                    <p className="van-price">
                        <span>${van.price}</span> /day
                    </p>
                </div>
            </Link>
        </div>
    ));

    return (
        <section className="vans">
            <h2>Explore our van options</h2>
            <div className="filters"></div>
            <div className="vans-list">{vanElements}</div>
        </section>
    );
}
