import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
    const { van } = useOutletContext();

    return (
        <div className="host-van-details-photos">
            <img src={van.imageUrl} alt={`${van.name} van`} />
        </div>
    );
}
