import {useRef, useContext, useState, useEffect} from "react";
import {SongContext} from "../contexts/songContext.jsx";
import {albums} from "../data/albums.js";
import {tracks} from "../data/tracks.js";
import {SpeakerXMarkIcon, SpeakerWaveIcon} from "@heroicons/react/24/solid";
import PlayerControl from "./PlayerControl.jsx";


export default function Player() {
    const {songTitle} = useContext(SongContext);
    let currentTrack;
    let currentAlbum;
    let imgUrl = '/covers/undefined.svg'
    let audioUrl;
    const sliderColors = ["#00000060", "#00000018"]


    // Update current track, album, and file URLs based on the selected song
    if (songTitle) {
        currentTrack = tracks.find((track) => track.title === songTitle) || {title: "", album: ""};
        currentAlbum = albums.find((album) => album.name === currentTrack.album) || null;
        imgUrl = `/covers/${currentAlbum.img}.webp`;
        audioUrl = new URL(`../assets/audios/${currentTrack.audio}`, import.meta.url).href;
    }

    // References and player state management
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false); // Track if audio is playing
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);




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

    return (<div className="bg-white/50 backdrop-blur-2xl sticky p-5 bottom-0 flex items-center justify-between">

        {/* ----------- CURRENT SONG DISPLAY ----------- */}
        <div className="flex items-center gap-4 grow w-[6vw] ">

            <img src={imgUrl} alt={currentTrack ? currentTrack.title : ""} className="rounded-md w-16"/>
            <div className="flex flex-col">
                <p className="text-xl font-bold">{currentTrack ? currentTrack.title : ""}</p>
                <p>{currentAlbum ? currentAlbum?.name : ""}</p>
            </div>
        </div>

        {/* ----------- PLAY PAUSE AND TIME CONTROLS ----------- */}
        <PlayerControl audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} songTitle={songTitle} duration={duration} currentTime={currentTime} changeTime={changeTime} />

        {/* ----------- VOLUME CONTROLS ----------- */}
        <div className="flex items-center gap-4 grow justify-end w-[6vw]">
            {isMuted ? (<SpeakerXMarkIcon onClick={toggleMute} className="w-6 h-6"/>) : (
                <SpeakerWaveIcon onClick={toggleMute} className="w-6 h-6"/>)}

            {/* Volume Input (Seek Bar) */}
            <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={isMuted ? 0 : volume}
                onChange={changeVolume}
                className="appearance-none h-2 hover:h-4 transition-all rounded-lg cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                style={{
                    accentColor: "transparent",
                    background: `linear-gradient(to right, ${sliderColors[0]} ${volume * 100}%, ${sliderColors[1]} ${volume * 100}%)`
                }}

            />
        </div>

        {/* ----------- AUDIO TAG (NOT DISPLAYED) ----------- */}
        <audio
            ref={audioRef}
            src={audioUrl}
            onPlay={handleAudioPlay}
            onPause={handleAudioPause}
        />
    </div>);
}