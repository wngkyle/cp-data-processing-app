import React, {
    createContext,
    useContext,
    useState,
} from "react";

const columnRanges = {
    'Isc_20mA': [2, 10],
    'Turn_off_80mA_': [0, 150],
    'Turn_off_80mA_HL': [-20, 20],
    'Rf': [10, 20],
    'Rr': [10, 20],
};

const ColumnRangeContext = createContext();
const SetColumnRangeContext = createContext();

export function useColumnRangeContext() {
    return useContext(ColumnRangeContext);
};

export function useSetColumnRangeContext() {
    return useContext(SetColumnRangeContext);
};

export function ColumnRangeProvider({ children }) {
    const [columnRange, setColumnRange] = useState(columnRanges);

    return (
        <ColumnRangeContext.Provider value={columnRange}>
            <SetColumnRangeContext.Provider value={setColumnRange}>
                { children }
            </SetColumnRangeContext.Provider>
        </ColumnRangeContext.Provider>
    );
}
