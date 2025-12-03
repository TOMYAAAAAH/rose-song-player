import {useRef, useContext} from "react";
import {SongContext} from "../contexts/songContext.jsx";
import {albums} from "../data/albums.js";
import {tracks} from "../data/tracks.js";


export default function Player() {
    const { songTitle } = useContext(SongContext);
    let currentTrack;
    let currentAlbum;
    let imgUrl;
    let audioUrl;

    if (songTitle) {
        currentTrack = tracks.find((track) => track.title === songTitle) || {title: '', album: ''};
        currentAlbum = albums.find((album) => album.name === currentTrack.album) || null;
        imgUrl = new URL(`../assets/covers/${currentAlbum.img}`, import.meta.url).href;
        audioUrl = new URL(`../assets/audios/${currentTrack.audio}`, import.meta.url).href;
    }

    const audioRef = useRef();
    const volumeRef = useRef(1); // default volume 1

    const play = () => audioRef.current.play();
    const pause = () => audioRef.current.pause();



    const handleVolume = (e) => {
        const vol = e.target.value;
        volumeRef.current = vol;
        audioRef.current.volume = vol;
    };

    return (
        <div className="bg-gray-300 sticky p-5 bottom-0">

            {songTitle && <div className="flex items-center gap-4">
                <img src={imgUrl} alt={currentTrack.title} className="rounded-md w-16"/>
                <div className="flex flex-col">
                    <p>{currentTrack.title}</p>
                    <p>{currentAlbum.name}</p>
                    <p>{audioUrl}</p>
                </div>
            </div>}

            <audio ref={audioRef} src={audioUrl} controls autoPlay={true}/>

            <button onClick={play}>PLAY</button><br/>
            <button onClick={pause}>PAUSE</button><br/>
        </div>
    );
}

