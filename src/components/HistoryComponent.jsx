export default function HistoryComponent({ img, title, album }) {
    const imgUrl = `/covers/${img}.webp`;

  return (
    <div className="flex items-center gap-3">
      <img src={imgUrl} alt={title} className="rounded-md w-12" />
      <div className="flex flex-col truncate">
        <p className="text-l font-medium truncate"> {title}</p>
        <p className="text-sm truncate">{album}</p>
      </div>
    </div>
  );
}
