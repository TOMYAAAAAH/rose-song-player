import { createContext, useState } from 'react';

export const SongContext = createContext();

export function SongProvider({ children }) {
    const [songTitle, setSongTitle] = useState('');

    return (
        <SongContext.Provider value={{ songTitle, setSongTitle }}>
            {children}
        </SongContext.Provider>
    );
}
