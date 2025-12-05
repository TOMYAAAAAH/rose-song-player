import {SpeakerXMarkIcon, SpeakerWaveIcon} from "@heroicons/react/24/solid";


export default  function PlayerVolume({isMuted, toggleMute,changeVolume, volume}) {
    const sliderColors = ["#00000060", "#00000018"]


    return (
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

    )
}