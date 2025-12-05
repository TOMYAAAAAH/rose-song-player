import {useContext} from "react";
import {SongContext} from "../contexts/songContext";
import {getDate, getMeta} from "../utils/songMeta.js";

export default function Song({title}) {

    const meta = getMeta(title);
    const imgUrl = meta.imgUrl;
    const album = meta.album;

    const date = getDate(album);

    const {songTitle, setSongTitle} = useContext(SongContext);
    const isPlaying = songTitle === title;

    return (
        <div
            onClick={() => setSongTitle(title)}
            className="group hover:brightness-75 hover:scale-99 transition duration-150 cursor-pointer"
        >

            <img src={imgUrl} alt={title} className={`rounded-md ${isPlaying && 'brightness-75'} `}/>
            <p className="font-medium">{title}</p>
            <p className="text-sm">{album} · {date}</p>
        </div>
    );
}
