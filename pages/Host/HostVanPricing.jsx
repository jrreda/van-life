import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
    const { van } = useOutletContext();

    return (
        <div className="host-van-details-pricing">
            <span className="price">${van.price}</span>
            <span>/day</span>
        </div>
    );
}
