import { useContext } from "react";
import { SongContext } from "../contexts/songContext";

export default function Song({ img, title, date, album }) {
  const imgUrl = `/covers/${img}`;
  const { setSongTitle } = useContext(SongContext);

  return (
    <div
      onClick={() => setSongTitle(title)}
      className="hover:opacity-60 transition duration-150"
    >
      <img src={imgUrl} alt={title} className="rounded-md" />
      <h3>
        {title} - {album}
      </h3>
      <p>{date}</p>
    </div>
  );
}
