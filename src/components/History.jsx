import { useHistory } from "../hooks/useHistory";
import { albums } from "../data/albums";
import { tracks } from "../data/tracks";
import HistoryComponent from "../components/HistoryComponent";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function History() {
  const { history, clearHistory } = useHistory();
  console.log(history);

  return (
    <div className="bg-white/30 w-64 sticky p-5 top-0 transition gap-4 flex-col overflow-y-hidden md:flex hidden">
      <div className="flex items-center justify-between">
          <h3 className="font-telma text-4xl">Historique</h3>
          {history.length > 0 && (
        <TrashIcon className="w-6 h-6" onClick={clearHistory} />
          )}
      </div>
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
