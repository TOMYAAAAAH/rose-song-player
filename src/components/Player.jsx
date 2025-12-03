import {useState, useContext} from "react";
import {SongContext} from "../contexts/songContext.jsx";
import {albums} from "../data/albums.js";
import {tracks} from "../data/tracks.js";


export default function Player() {
    const [playing, setPlaying] = useState(false);
    const { songTitle } = useContext(SongContext);

    if (!songTitle) {

    }
    const currentTrack = tracks.find((track) => track.title === songTitle) || {title: '', album: ''};
    const currentAlbum = albums.find((album) => album.name === currentTrack.album) || null;


    function togglePlay() {
        setPlaying(!playing);
    }

    return (
        <div className="bg-gray-300 sticky p-5 bottom-0">

            <div className="flex items-center gap-4">
            <img src={imgUrl} alt={currentTrack.title} className="rounded-md w-16"/>
                <div className="flex flex-col">
                    <p>{currentTrack.title}</p>
                    <p>{currentAlbum.name}</p>
                </div>
            </div>

            <button onClick={togglePlay}>{playing ? "PAUSE" : "PLAY"}</button>
        </div>
    );
}

