export default function PlayerCurrentSong ({imgUrl, currentTrack, currentAlbum}) {

    return (
        <div className="flex items-center gap-4 grow w-[6vw] ">

            <img src={imgUrl} alt={currentTrack ? currentTrack.title : ""} className="rounded-md w-16"/>
            <div className="flex flex-col">
                <p className="text-xl font-bold">{currentTrack ? currentTrack.title : ""}</p>
                <p>{currentAlbum ? currentAlbum.name : ""}</p>
            </div>
        </div>

    )

}