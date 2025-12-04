import { useHistory } from "../hooks/useHistory";

export default function Aside() {
  const history = useHistory();
  console.log(history);

  return (
    <div className="bg-gray-300 w-30 h-screen p-5 top-0 transition">
      test
      {history.map((songTitle) => (
        <div>{songTitle}</div>
      ))}
    </div>
  );
}
