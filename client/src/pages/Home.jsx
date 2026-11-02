import { Link } from "react-router";
import style from "./Home.module.css";

const characters = [
    { name: "Waldo", clue: "Red-and-white striped sweater and bobble hat, round glasses." },
    { name: "Wenda", clue: "Same stripes as Waldo, with a skirt and brown hair." },
    { name: "Wizard Whitebeard", clue: "Long white beard, red robe, blue pointed hat." },
    { name: "Odlaw", clue: "Yellow-and-black stripes, dark glasses. Waldo's rival." },
];

export function Home() {
    return (
        <div className={style.home}>
            <section className={style.hero}>
                <h2 className={style.title}>Find them all before the clock catches you.</h2>
                <p className={style.lead}>
                    Pick a crowded scene, start the timer, and track down every hidden
                    character. The fastest players make it onto the leaderboard.
                </p>
                <Link to="/play" className="btn">Choose a scene</Link>
            </section>

            <section className={style.rules}>
                <h3>How to play</h3>
                <ol className={style.steps}>
                    <li>
                        <p><strong>Choose a scene</strong> on the Play page, then press
                        <em> Start</em>. The timer starts on the server, so no cheating.
                        </p>
                    </li>
                    <li>
                        <p><strong>Click where you think a character is hiding.</strong> A
                        target box appears around your click.
                        </p>
                    </li>
                    <li>
                        <p><strong>Pick a name</strong> from the list next to the box. If
                        you're right, a marker stays on the character.
                        </p>
                    </li>
                    <li>
                        <p><strong>Find everyone</strong> to stop the clock, then add your
                        name to the leaderboard.
                        </p>
                    </li>
                </ol>
            </section>

            <section className={style.cast}>
                <h3>Who's hiding</h3>
                <ul className={style.characters}>
                    {characters.map((c) => (
                        <li key={c.name}>
                            <strong>{c.name}</strong>
                            <span>{c.clue}</span>
                        </li>
                    ))}
                </ul>
                <p className={style.note}>Not every character hides in every scene.</p>
            </section>
        </div>
    );
}
