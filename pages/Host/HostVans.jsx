import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHostVans } from "../../api";

export default function HostVans() {
    const [vans, setVans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadHostVans() {
            setLoading(true);
            try {
                const hostVans = await getHostVans();
                setVans(hostVans);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        loadHostVans();
    }, []);

    const vanElements = vans.map((van) => (
        <div className="host-vans-list-item" key={van.id}>
            <Link to={van.id}>
                <img src={van.imageUrl} alt={`${van.name} van`} />
                <div className="host-vans-list-item-info">
                    <h2>{van.name}</h2>
                    <p>${van.price}/day</p>
                </div>
            </Link>
        </div>
    ));

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>;
    }

    return (
        <section className="container host-Vans">
            <h1>Your listed vans</h1>
            <div className="host-vans-list">{vanElements}</div>
        </section>
    );
}
