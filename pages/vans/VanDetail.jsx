import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function VanDetail() {
    const params = useParams();
    const [van, setVan] = useState(null);

    useEffect(() => {
        fetch(`/api/vans/${params.id}`)
            .then((res) => res.json())
            .then((data) => setVan(data.vans));
    }, [params.id]);

    return (
        <section className="van-detail">
            {van ? (
                <>
                    <div className="van-header">
                        <span className="icon">&larr;</span>
                        <Link to="/vans" className="back-button">
                            Back to all vans
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
