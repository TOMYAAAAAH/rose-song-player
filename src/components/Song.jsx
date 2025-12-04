import {useContext} from "react";
import {SongContext} from "../contexts/songContext";

export default function Song({img, title, date, album}) {
    const imgUrl = `/covers/${img}.webp`;
    const {songTitle, setSongTitle} = useContext(SongContext);
    const isPlaying = songTitle === title;

    return (
        <div
            onClick={() => setSongTitle(title)}
            className="group hover:brightness-75 hover:scale-99 transition duration-150 cursor-pointer"
        >

            <img src={imgUrl} alt={title} className={`rounded-md ${isPlaying && 'brightness-75'} `} />
            <p className="font-medium">{title}</p>
            <p className="text-sm">{album} · {date}</p>
        </div>
    );
}
