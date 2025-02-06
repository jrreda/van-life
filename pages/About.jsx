export default function About() {
    return (
        <section className="about">
            <img
                src="/assets/images/about.png"
                alt="Person sitting on a van roof"
            />

            <div className="about-content">
                <h2>Don’t squeeze in a sedan when you could relax in a van.</h2>
                <p>
                    Our mission is to enliven your road trip with the perfect
                    travel van rental. Our vans are recertified before each trip
                    to ensure your travel plans can go off without a hitch.
                    (Hitch costs extra 😉)
                </p>
                <p>
                    Our team is full of vanlife enthusiasts who know firsthand
                    the magic of touring the world on 4 wheels.
                </p>

                <div className="about-content-box">
                    <h3>
                        Your destination is waiting.
                        <br />
                        Your van is ready.
                    </h3>
                    <button type="button">Explore our vans</button>
                </div>
            </div>
        </section>
    );
}
