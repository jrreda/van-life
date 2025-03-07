import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

export default function Vans() {
    const [vans, setVans] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const typeFilter = searchParams.get("type");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // fetch data from the server
    useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const vans = await getVans();
                setVans(vans);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        loadVans();
    }, []);

    const filteredVans = typeFilter
        ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
        : vans;

    const vanElements = filteredVans.map((van) => (
        <div className="van-tile" key={van.id}>
            <Link
                to={van.id}
                state={{ search: searchParams.toString(), type: typeFilter }}
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

    const filterLinks = ["simple", "luxury", "rugged"].map((type, idx) => (
        <button
            key={idx}
            onClick={() => setSearchParams({ type })}
            className={`filter-type ${type} ${
                typeFilter === type ? "active van-type" : ""
            }`}
            aria-label={`Filter by ${type} vans`}
        >
            {type}
        </button>
    ));

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>;
    }

    return (
        <section className="vans">
            <h2>Explore our van options</h2>
            <div className="van-filters">
                {filterLinks}
                {typeFilter && (
                    <button
                        onClick={() => setSearchParams({})}
                        className="clear-filters"
                        aria-label="Show all vans"
                    >
                        Clear filters
                    </button>
                )}
            </div>
            <div className="vans-list">{vanElements}</div>
        </section>
    );
}
