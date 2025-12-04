import { useContext } from "react";

export default function HistoryComponent({ img, title, album }) {
  const imgUrl = new URL(`../assets/covers/${img}`, import.meta.url).href;

  return (
    <div className="">
      <img src={imgUrl} alt={title} className="rounded-md" />
      <h3>
        {title} - {album}
      </h3>
    </div>
  );
}
