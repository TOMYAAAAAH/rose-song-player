import { useContext } from "react";

export default function HistoryComponent({ img, title, album }) {
  const imgUrl = new URL(`../assets/covers/${img}`, import.meta.url).href;

  return (
    <div className="flex items-center gap-4">
      <img src={imgUrl} alt={title} className="rounded-md w-13" />
      <div className="flex flex-col ">
        <p className="text-l font-bold"> {title}</p>
        <p>{album}</p>
      </div>
    </div>
  );
}
