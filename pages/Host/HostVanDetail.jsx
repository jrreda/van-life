import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { getHostVans } from "../../api";

export default function HostVanDetail() {
    const [van, setVan] = useState(null);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadHostVan() {
            setLoading(true);
            try {
                const hostVan = await getHostVans(params.id);
                console.log("hostVan", hostVan);
                setVan(hostVan);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        loadHostVan();
    }, [params.id]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>There was an error: {error.message}</h2>;
    }

    if (!van) {
        return (
            <section className="container host-van-detail">
                <h2>No van details found</h2>
                <Link to=".." relative="path">
                    Back to all vans
                </Link>
            </section>
        );
    }

    return (
        <section className="container host-van-detail">
            <div className="van-header">
                <span className="icon">&larr;</span>
                <Link to=".." relative="path" className="back-button">
                    Back to all vans
                </Link>
            </div>

            <div className="host-van-detail-info">
                <div className="header">
                    <img src={van.imageUrl} alt={`${van.name} van`} />
                    <div className="van-info">
                        <span className={`van-type ${van.type}`}>
                            {van.type}
                        </span>
                        <h2>{van.name}</h2>
                        <p className="van-price">
                            <span>${van.price}</span> /day
                        </p>
                    </div>
                </div>

                <nav className="host-van-detail-nav">
                    <NavLink end to=".">
                        Details
                    </NavLink>
                    <NavLink to="pricing">Pricing</NavLink>
                    <NavLink to="photos">Photos</NavLink>
                </nav>

                <Outlet context={{ van }} />
            </div>
        </section>
    );
}
