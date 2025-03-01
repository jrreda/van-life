import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HostVans() {
    const [vans, setVans] = useState([]);

    useEffect(() => {
        fetch("/api/host/vans")
            .then((res) => res.json())
            .then((data) => setVans(data.vans));
    }, []);

    const vanElements = vans.map((van) => (
        <div className="host-vans-list-item" key={van.id}>
            <Link to={`/host/vans/${van.id}`}>
                <img src={van.imageUrl} alt={`${van.name} van`} />
                <div className="host-vans-list-item-info">
                    <h2>{van.name}</h2>
                    <p>${van.price}/day</p>
                </div>
            </Link>
        </div>
    ));

    return (
        <section className="host-Vans">
            <h1>Your listed vans</h1>
            <div className="host-vans-list">{vanElements}</div>
        </section>
    );
}
