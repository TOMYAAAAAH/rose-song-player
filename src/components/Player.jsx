import {useRef, useContext, useState, useEffect} from "react";
import {SongContext} from "../contexts/songContext.jsx";
import {albums} from "../data/albums.js";
import {tracks} from "../data/tracks.js";
import {PlayIcon, PauseIcon, SpeakerXMarkIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";


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
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);

    // Play and Pause functions
    const play = () => {
        audioRef.current.play();
        setIsPlaying(true); // Update state to playing
    };
    const pause = () => {
        audioRef.current.pause();
        setIsPlaying(false); // Update state to paused
    };


    // Handle song changes
    useEffect(() => {
        // If a new song is loaded, play it automatically
        if (songTitle && audioRef.current) {
            audioRef.current.load();
            audioRef.current.play();
            updateTime()
        }
    }, [songTitle]); // Dependency array ensures this runs when songTitle changes

    // apply changes from the audio tag to the state
    const handleAudioPlay = () => setIsPlaying(true);
    const handleAudioPause = () => setIsPlaying(false);

    function updateTime() {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || 0);
    }

    useEffect(() => {
        const audio = audioRef.current;

        updateTime()
        audio.addEventListener("timeupdate", updateTime);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
        };

    }, []);

    const changeTime = (e) => {
        const time = e.target.value;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const formatTime = (t) => {
        if (!t) return "0:00";
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60)
            .toString()
            .padStart(2, "0");
        return `${m}:${s}`;
    };

    const changeVolume = (e) => {
        const vol = Number(e.target.value);
        setVolume(vol);
        audioRef.current.volume = vol;
        setIsMuted(vol === 0);
    };

    const toggleMute = () => {
        if (isMuted) {
            audioRef.current.volume = volume;
            setIsMuted(false);
        } else {
            audioRef.current.volume = 0;
            setIsMuted(true);
        }
    };

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

            <span className="w-24 text-right text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

            <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={changeTime}
                step="1"
                className="w-64 accent-pink-500"
            />

            <button
                onClick={toggleMute}
                className="bg-white border-pink-500 border-2 text-white px-3 py-2 rounded-md"
            >
                {isMuted ? "🔇" : "🔊"}
            </button>
            <SpeakerXMarkIcon className="w-8 h-8"/>
            <SpeakerWaveIcon className="w-8 h-8"/>


            <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={changeVolume}
                className="w-32 accent-pink-500"
            />

            <audio
                ref={audioRef}
                src={audioUrl}
                onPlay={handleAudioPlay}
                onPause={handleAudioPause}
            />
        </div>
    );
}