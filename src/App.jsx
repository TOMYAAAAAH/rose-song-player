import './App.css'
import Page from "./components/Page.jsx";
import {SongProvider} from "./contexts/songContext.jsx";

export default function App() {
    return (
        <div>
            <SongProvider>
                <Page/>
            </SongProvider>
        </div>
    );
}