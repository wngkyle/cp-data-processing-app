import React, {
    createContext,
    useContext,
    useState,
} from "react";

const columnSteps = {
    'Isc_20mA': [0.15, false],
    'Turn_off_80mA_': [2, false],
    'Turn_off_80mA_HL': [0.5, false],
    'Rf': [0.2, false],
    'Rr': [0.2, false],
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
    );
}
