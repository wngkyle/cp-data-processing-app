import React, {
    createContext,
    useContext,
    useState,
} from "react";

const columnSteps = {
    'Isc_20mA': 0,
    'Turn_off_80mA_': 0,
    'Turn_off_80mA_HL': 0,
    'Rf': 0,
    'Rr': 0,
    'fast-track' : false,
};

const ColumnStepContext = createContext();
const SetColumnStepContext = createContext();

export function useColumnStepContext() {
    return useContext(ColumnStepContext);
}

export function useSetColumnStepContext() {
    return useContext(SetColumnStepContext);
}

export function ColumnStepProvider({ children }) {
    const [columnStep, setColumnStep] = useState(columnSteps);

    return (
        <ColumnStepContext.Provider value={columnStep}>
            <SetColumnStepContext.Provider value={setColumnStep}>
                { children }
            </SetColumnStepContext.Provider>
        </ColumnStepContext.Provider>
    )
}
