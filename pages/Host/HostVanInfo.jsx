import { useOutletContext } from "react-router-dom";

export default function HostVanInfo() {
    const { van } = useOutletContext();

    return (
        <div className="host-van-details-info">
            <div className="name">
                <h4>Name:</h4>
                <p>{van.name}</p>
            </div>
            <div className="category">
                <h4>Category:</h4>
                <p>{van.type}</p>
            </div>
            <div className="description">
                <h4>Description:</h4>
                <p>{van.description}</p>
            </div>
            <div className="visibility">
                <h4>Visibility:</h4>
                <p>{van.visibility || "public"}</p>
            </div>
        </div>
    );
}
