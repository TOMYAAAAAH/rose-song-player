import Song from "./Song.jsx";
import {albums} from "../data/albums.js";
import {tracks} from "../data/tracks.js";
import {useState} from "react";
import SongFilters from "./SongFilters.jsx";

export default function SongList() {
    const [sortBy, setSortBy] = useState("popularity asc");
    const [search, setSearch] = useState(undefined);

    const sortedTracks = [...tracks].sort((a, b) => {
        const relatedAlbumA = albums.find((album) => album.name === a.album);
        const relatedAlbumB = albums.find((album) => album.name === b.album);

        let compareValue;
        if (sortBy.includes("popularity")) {
            //pick sort category
            compareValue = a.popularity - b.popularity;
        } else if (sortBy.includes("date")) {
            compareValue = relatedAlbumA.sortDate - relatedAlbumB.sortDate;
        }

        return sortBy.includes("asc") ? compareValue : -compareValue; //pick sort order
    });


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
                        const relatedAlbum = albums.find(
                            (album) => album.name === track.album
                        );
                        return (
                            <Song
                                key={track.title}
                                img={relatedAlbum.img}
                                title={track.title}
                                album={track.album}
                                date={relatedAlbum.date}
                            />
                        );
                    })}
            </div>
        </>
    );
}
