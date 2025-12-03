import {useRef, useContext, useState} from "react";
import {SongContext} from "../contexts/songContext.jsx";
import {albums} from "../data/albums.js";
import {tracks} from "../data/tracks.js";
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'


export default function Player() {
    const { songTitle } = useContext(SongContext);
    let currentTrack;
    let currentAlbum;
    let imgUrl;
    let audioUrl;


    const audioRef = useRef();
    const volumeRef = useRef(1); // default volume 1
    const [isPlaying, setIsPlaying] = useState(true); // Track audio state (playing / paused)


    const play = () => {
        audioRef.current.play();
        setIsPlaying(true);
    }
    const pause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    }

    if (songTitle) {
        currentTrack = tracks.find((track) => track.title === songTitle) || {title: '', album: ''};
        currentAlbum = albums.find((album) => album.name === currentTrack.album) || null;
        imgUrl = new URL(`../assets/covers/${currentAlbum.img}`, import.meta.url).href;
        audioUrl = new URL(`../assets/audios/${currentTrack.audio}`, import.meta.url).href;
    }



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

            {!isPlaying && <PlayIcon onClick={play} className="w-8 h-8 text-black" />}
            {isPlaying && <PauseIcon onClick={pause} className="w-8 h-8 text-black" />}


        </div>
    );
}

