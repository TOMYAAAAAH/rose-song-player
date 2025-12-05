import Song from "./Song.jsx";
import {useState} from "react";
import SongFilters from "./SongFilters.jsx";
import {getSortedTracks} from "../utils/songMeta.js";

export default function SongList() {
    const [sortBy, setSortBy] = useState("popularity asc");
    const [search, setSearch] = useState(undefined);

    const sortedTracks = getSortedTracks(sortBy);

    return (
        <>

            <div className="flex justify-between items-center mb-5">
                <h2 className="text-4xl text-gray-900 font-telma">Les sons</h2>
                <SongFilters sortedTracks={sortedTracks} setSortBy={setSortBy} setSearch={setSearch}/>
            </div>


            <div className="grid grid-cols-4 gap-6">
                {sortedTracks
                    .filter(
                        (track) =>
                            !search ||
                            track.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((track) => {
                        return (
                            <Song
                                key={track.title}
                                title={track.title}
                            />
                        );
                    })}
            </div>
        </>
    );
}
