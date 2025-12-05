import { useHistory } from "../hooks/useHistory";
import HistoryComponent from "../components/HistoryComponent";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function History() {
  const { history, clearHistory } = useHistory();

  return (
    <div className="bg-white/30 w-64 sticky p-5 top-0 transition gap-4 flex-col overflow-y-hidden md:flex hidden">
      <div className="flex items-center justify-between">
          <h3 className="font-telma text-4xl">Historique</h3>
          {history.length > 0 && (
        <TrashIcon className="w-6 h-6" onClick={clearHistory} />
          )}
      </div>
      {history.map((songTitle, index) => {
        return (
          <HistoryComponent
            key={index}
            title={songTitle}
          />
        );
      })}
    </div>
  );
}
