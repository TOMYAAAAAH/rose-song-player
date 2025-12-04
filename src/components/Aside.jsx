import { useHistory } from "../hooks/useHistory";
import { albums } from "../data/albums";
import { tracks } from "../data/tracks";
import HistoryComponent from "../components/HistoryComponent";

export default function Aside() {
  const history = useHistory();
  console.log(history);
  const relatedAlbum = albums.find((album) => album.name === tracks.album);

  return (
    <div className="bg-gray-300 w-30 h-screen p-5 top-0 transition">
      Historique
      {history.map((songTitle, index) => {
        const relatedTrack = tracks.find((track) => songTitle === track.title);
        const relatedAlbum = albums.find(
          (album) => album.name === relatedTrack.album
        );

        return (
          <HistoryComponent
            key={index}
            img={relatedAlbum.img}
            title={relatedTrack.title}
            album={relatedTrack.album}
          />
        );
      })}
    </div>
  );
}
