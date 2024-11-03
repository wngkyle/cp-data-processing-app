import React, {
    createContext,
    useContext,
    useState,
} from 'react';

const FastTrackContext = createContext();
const SetFastTrackContext = createContext();

export function useFastTrackContext() {
    return useContext(FastTrackContext);
}

export function useSetFastTrackContext() {
    return useContext(SetFastTrackContext);
}

export function FastTrackContextProvider({ children }) {
    const [fastTrack, setFastTrack] = useState(null);

    return (
        <FastTrackContext.Provider value={fastTrack}>
            <SetFastTrackContext.Provider value={setFastTrack}>
                { children }
            </SetFastTrackContext.Provider>
        </FastTrackContext.Provider>
    );
}