import {useRef, useContext, useState, useEffect} from "react";
import {SongContext} from "../contexts/songContext.jsx";
import {albums} from "../data/albums.js";
import {tracks} from "../data/tracks.js";
import {PlayIcon, PauseIcon} from "@heroicons/react/24/solid";

export default function Player() {
    const {songTitle} = useContext(SongContext);
    let currentTrack;
    let currentAlbum;
    let imgUrl;
    let audioUrl;

    // Update current track, album, and file URLs based on the selected song
    if (songTitle) {
        currentTrack = tracks.find((track) => track.title === songTitle) || {title: "", album: ""};
        currentAlbum = albums.find((album) => album.name === currentTrack.album) || null;
        imgUrl = new URL(`../assets/covers/${currentAlbum.img}`, import.meta.url).href;
        audioUrl = new URL(`../assets/audios/${currentTrack.audio}`, import.meta.url).href;
    }

    // References and player state management
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false); // Track if audio is playing
    const volumeRef = useRef(1); // Default volume

    // Play and Pause functions
    const play = () => {
        audioRef.current.play();
        setIsPlaying(true); // Update state to playing
    };
    const pause = () => {
        audioRef.current.pause();
        setIsPlaying(false); // Update state to paused
    };

    // Handle volume changes
    const handleVolume = (e) => {
        const vol = e.target.value;
        volumeRef.current = vol;
        audioRef.current.volume = vol;
    };

    // Handle song changes
    useEffect(() => {
        // If a new song is loaded, play it automatically
        if (songTitle && audioRef.current) {
            audioRef.current.load();
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [songTitle]); // Dependency array ensures this runs when songTitle changes

    // apply changes from the audio tag to the state
    const handleAudioPlay = () => setIsPlaying(true);
    const handleAudioPause = () => setIsPlaying(false);

    return (
        <div className="bg-gray-300 sticky p-5 bottom-0 flex items-center justify-between">


            <div className="flex items-center gap-4 w-96">
                <img src={imgUrl} alt={currentTrack ? currentTrack.title : ""} className="rounded-md w-16"/>
                <div className="flex flex-col">
                    <p className="text-xl font-bold">{currentTrack ? currentTrack.title : "-"}</p>
                    <p className="">{currentAlbum ? currentAlbum?.name : "-"}</p>
                </div>
            </div>


            {isPlaying ? (
                <PauseIcon onClick={pause} className="w-12 h-12 text-black cursor-pointer"/>
            ) : (
                <PlayIcon onClick={play} className="w-12 h-12 text-black cursor-pointer"/>
            )}

            <div className="w-96"></div>

            <audio
            ref={audioRef}
            src={audioUrl}
            onPlay={handleAudioPlay}
            onPause={handleAudioPause}
        />
        </div>
    );
}