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
            <h2 className="text-4xl text-gray-900 font-telma">Les sons</h2>

            <div className="flex items-center gap-4">
                {/* Shuffle Button */}
                <button
                    onClick={shuffle}
                    className="w-10 h-10 flex justify-center items-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md border border-gray-300 transition-transform transform focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 active:ring-2 active:ring-gray-400"
                >
                    <img
                        src={new URL(`../assets/shuffle.svg`, import.meta.url).href}
                        alt="Shuffle"
                        className="w-5 h-5"
                    />
                </button>

                {/* Search Bar */}
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Rechercher"
                    className="appearance-none bg-gray-100 border border-gray-300 text-gray-800 rounded-md py-2 px-4 font-medium placeholder-gray-400 hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus:border-gray-400 transition duration-200"
                />

                {/* Filter Dropdown */}
                <div className="relative">
                    <select
                        onChange={(e) => setSortBy(e.target.value)}
                        defaultValue="popularity asc"
                        className="appearance-none bg-gray-100 border border-gray-300 text-gray-800 rounded-md py-2 px-4 pr-10 font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus:border-gray-400 transition duration-200"
                    >
                        <option
                            value="popularity asc"
                            className="hover:bg-gray-200 text-gray-800"
                        >
                            Popularity ↑
                        </option>
                        <option
                            value="popularity desc"
                            className="hover:bg-gray-200 text-gray-800"
                        >
                            Popularity ↓
                        </option>
                        <option
                            value="date asc"
                            className="hover:bg-gray-200 text-gray-800"
                        >
                            Release Date ↑
                        </option>
                        <option
                            value="date desc"
                            className="hover:bg-gray-200 text-gray-800"
                        >
                            Release Date ↓
                        </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>


      <div className="grid grid-cols-4 gap-6">
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
