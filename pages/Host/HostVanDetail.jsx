import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

export default function HostVanDetail() {
    const [van, setVan] = useState(null);
    const params = useParams();

    useEffect(() => {
        fetch(`/api/host/vans/${params.id}`)
            .then((res) => res.json())
            .then((data) => setVan(data.vans));
    }, [params.id]);

    if (!van) {
        return <h2>Loading...</h2>;
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
