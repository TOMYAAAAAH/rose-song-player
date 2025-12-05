import {PauseIcon, PlayIcon} from "@heroicons/react/24/solid/index.js";

export default function PlayerControl({audioRef, setIsPlaying, isPlaying, songTitle, duration, currentTime, changeTime}) {
    const sliderColors = ["#00000060", "#00000018"]

    const formatTime = (t) => {
        if (!t) return "0:00";
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60)
            .toString()
            .padStart(2, "0");
        return `${m}:${s}`;
    };


    // Play and Pause functions

    const play = () => {
        audioRef.current.play();
        setIsPlaying(true); // Update state to playing
    };
    const pause = () => {
        audioRef.current.pause();
        setIsPlaying(false); // Update state to paused
    };
    return (
        <div className={`flex items-center justify-center gap-4 grow ${!songTitle && "hidden"} `} >
            {isPlaying ? (<PauseIcon onClick={pause} className="w-12 h-12 text-black cursor-pointer"/>) : (
                <PlayIcon onClick={play} className="w-12 h-12 text-black cursor-pointer"/>)}


            <div className="flex items-center gap-4">

            <span className="text-right text-sm">
              {formatTime(currentTime)}
            </span>

                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={changeTime}
                    step="1"
                    className="w-[20vw] appearance-none hover:h-4 transition-all h-2 rounded-lg cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                    style={{
                        accentColor: "none",
                        background: `linear-gradient(to right, ${sliderColors[0]} ${(currentTime / duration) * 100}%, ${sliderColors[1]} ${(currentTime / duration) * 100}%)`
                    }}

                />

                <span className="text-sm">
         {formatTime(duration)}
            </span>
            </div>
        </div>
    )
}