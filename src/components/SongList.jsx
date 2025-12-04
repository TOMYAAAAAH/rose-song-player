import Song from "./Song.jsx";
import { albums } from "../data/albums.js";
import { tracks } from "../data/tracks.js";
import { useContext, useState } from "react";
import { SongContext } from "../contexts/songContext.jsx";

export default function SongList() {
  const [sortBy, setSortBy] = useState("popularity asc");
  const [search, setSearch] = useState(undefined);

  const sortedTracks = [...tracks].sort((a, b) => {
    const relatedAlbumA = albums.find((album) => album.name === a.album);
    const relatedAlbumB = albums.find((album) => album.name === b.album);

    let compareValue;
    if (sortBy.includes("popularity")) {
      //pick sort category
      compareValue = a.popularity - b.popularity;
    } else if (sortBy.includes("date")) {
      compareValue = relatedAlbumA.sortDate - relatedAlbumB.sortDate;
    }

    return sortBy.includes("asc") ? compareValue : -compareValue; //pick sort order
  });

  const { setSongTitle } = useContext(SongContext);

  const shuffle = () => {
    const randomIndex = Math.floor(Math.random() * sortedTracks.length);
    const randomTrack = sortedTracks[randomIndex];
    setSongTitle(randomTrack.title);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-4xl text-pink-900 font-telma">Les sons</h2>

        <div className="flex items-center gap-4">
          <button
            onClick={shuffle}
            className="bg-pink-500 hover:bg-pink-600 text-white justify-content-center py-2 font-bold px-4 rounded-lg"
          >
            <img
              src={new URL(`../assets/shuffle.svg`, import.meta.url).href}
              alt="Shuffle"
              className="w-5 h-5 inline-block"
            />
          </button>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Rechercher"
            className="appearance-none bg-pink-50 border-2 border-pink-300 text-pink-900 py-3 px-4 rounded-lg font-medium placeholder-pink-300 hover:border-pink-400 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-150"
          />
          <div className="relative">
            <select
              onChange={(e) => setSortBy(e.target.value)}
              defaultValue="popularity asc"
              className="appearance-none bg-pink-50 border-2 border-pink-300 text-pink-900 py-3 px-4 pr-10 rounded-lg font-medium cursor-pointer hover:border-pink-400 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-150"
            >
              <option value="popularity asc">Popularity ↑</option>
              <option value="popularity desc">Popularity ↓</option>
              <option value="date asc">Release Date ↑</option>
              <option value="date desc">Release Date ↓</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-pink-900">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {sortedTracks
          .filter(
            (track) =>
              !search ||
              track.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((track) => {
            const relatedAlbum = albums.find(
              (album) => album.name === track.album
            );
            return (
              <Song
                key={track.title}
                img={relatedAlbum.img}
                title={track.title}
                album={track.album}
                date={relatedAlbum.date}
              />
            );
          })}
      </div>
    </>
  );
}
