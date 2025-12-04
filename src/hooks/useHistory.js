import { useState, useEffect, useContext } from "react";
import { SongContext } from "../contexts/SongContext";

export function useHistory() {
  const { songTitle } = useContext(SongContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("songHistory") || "[]"
    );
    setHistory(storedHistory);
  }, []);

  useEffect(() => {
    if (songTitle) {
      setHistory((prevHistory) => {
        const lastSong = prevHistory[0];
        if (lastSong !== songTitle) {
          let updatedHistory = [songTitle, ...prevHistory];
          if (updatedHistory.length > 29) {
            updatedHistory = updatedHistory.slice(0, 29);
          }
          localStorage.setItem("songHistory", JSON.stringify(updatedHistory));
          return updatedHistory;
        }
      });
    }
  }, [songTitle]);

  return history;
}
