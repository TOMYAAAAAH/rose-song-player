import Hero from "./Hero.jsx";
import SongList from "./SongList.jsx";
import Player from "./Player.jsx";
import History from "./History.jsx";

export default function Page() {

    return (
        <>
            <div className="flex">

                <History/>

                <main className="max-w-6xl mx-auto px-8 py-12 flex-1">
                    <Hero/>
                    <SongList/>
                </main>

            </div>
            <Player/>
        </>
    );
}