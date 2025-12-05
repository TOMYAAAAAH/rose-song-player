import {getMeta} from "../utils/songMeta.js";

export default function PlayerCurrentSong ({songTitle}) {

    const meta = getMeta(songTitle);
    const imgUrl = meta.imgUrl;
    const album = meta.album;

    return (
        <div className="flex items-center gap-4 grow w-[6vw] ">

            <img src={imgUrl} alt={songTitle} className="rounded-md w-16"/>
            <div className="flex flex-col">
                <p className="text-xl font-bold">{songTitle}</p>
                <p>{album}</p>
            </div>
        </div>

    )

}