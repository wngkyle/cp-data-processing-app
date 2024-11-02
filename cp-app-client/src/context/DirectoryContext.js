import React, {
    createContext,
    useContext,
    useState,
} from "react";

const listOfDirContext = createContext([]);
const setListOfDirContext = createContext(null);
const dirIndexContext = createContext(-1);
const setDirIndexContext = createContext(null);

export function useListOfDirContext() {
    return useContext(listOfDirContext);
}

export function useSetListOfDirContext() {
    return useContext(setListOfDirContext);
}

export function useDirIndexContext() {
    return useContext(dirIndexContext);
}

export function useSetDirIndexContext() {
    return useContext(setDirIndexContext);
}

export function DirectoryProvider({ children }) {
    const [listOfDir, setListOfDir] = useState([]);
    const [dirIndex, setDirIndex] = useState(-1);

    return (
        <listOfDirContext.Provider value={listOfDir}>
            <dirIndexContext.Provider value={dirIndex}>
                <setListOfDirContext.Provider value={setListOfDir}>
                    <setDirIndexContext.Provider value={setDirIndex}>
                        {children}
                    </setDirIndexContext.Provider>
                </setListOfDirContext.Provider>
            </dirIndexContext.Provider>
        </listOfDirContext.Provider>
    );
}
