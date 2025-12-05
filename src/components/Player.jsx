import {useRef, useContext, useState, useEffect} from "react";
import {SongContext} from "../contexts/songContext.jsx";
import PlayerControl from "./PlayerControl.jsx";
import PlayerVolume from "./PlayerVolume.jsx";
import PlayerCurrentSong from "./PlayerCurrentSong.jsx";
import {getAudioUrl} from "../utils/songMeta.js";


export default function Player() {
    const {songTitle} = useContext(SongContext);
    let audioUrl;

    // Update current track, album, and file URLs based on the selected song
    if (songTitle) {
        audioUrl = getAudioUrl(songTitle);
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

        <PlayerCurrentSong songTitle={songTitle} />

        <PlayerControl audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} songTitle={songTitle} duration={duration} currentTime={currentTime} changeTime={changeTime} />

        <PlayerVolume isMuted={isMuted} changeVolume={changeVolume} volume={volume} toggleMute={toggleMute} />

        <audio
            ref={audioRef}
            src={audioUrl}
            onPlay={handleAudioPlay}
            onPause={handleAudioPause}
        />
    </div>);
}