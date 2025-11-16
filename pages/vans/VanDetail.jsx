import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getVan } from "../../api";

export default function VanDetail() {
    const params = useParams();
    const [van, setVan] = useState(null);
    const location = useLocation();
    const vanType = location.state?.type || "all";
    const [loading, setLoading] = useState("false");
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadVan() {
            setLoading(true);

            try {
                const van = await getVan(params.id);
                setVan(van);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        loadVan();
    }, [params.id]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>;
    }

    return (
        <section className="container van-detail">
            {van ? (
                <>
                    <div className="van-header">
                        <span className="icon">&larr;</span>
                        <Link
                            to={`../?${location?.state?.search}`}
                            relative="path"
                            className="back-button"
                        >
                            {`Back to ${vanType} vans`}
                        </Link>
                    </div>
                    <div className="van-detail-info">
                        <img
                            src={van.imageUrl}
                            alt={`picture of ${van.name}`}
                        />
                        <div className="van-detail-info">
                            <span className={`van-type ${van.type}`}>
                                {van.type}
                            </span>
                            <h2>{van.name}</h2>
                            <p className="van-price">
                                <span>${van.price}</span> /day
                            </p>
                            <p className="description">{van.description}</p>
                            <button className="link-button" type="button">
                                Rent this van
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <h2>Loading...</h2>
            )}
        </section>
    );
}
