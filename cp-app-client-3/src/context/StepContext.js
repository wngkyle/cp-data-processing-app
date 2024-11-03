import React, {
    createContext,
    useContext,
    useState,
} from "react";

const CurrentStepContext = createContext(0);
const useSatetForCurrentStepContext = createContext(null);

// const StepsContext = createContext([0, 0, 0, 0]);
// const StepsDispatchContext = createContext(null);

export function useCurrentStepContext() {
    return useContext(CurrentStepContext);
}

export function useStateCurrentStepContext() {
    return useContext(useSatetForCurrentStepContext);
}

// function useStepsContext() {
//     return useContext(StepsContext);
// }

// function useStepsDispatchContext() {
//     return useContext(StepsDispatchContext);
// }

// function stepsReducer(currentSteps, action) {
//     switch(action.type) {
//         case "nextStep":
//             currentSteps[action.payload.step] = 1;
//             return currentSteps;
//         case "backStep":
//             currentSteps[action.payload.step] = 0;
//             return currentSteps;
//         default:
//             return currentSteps;
//     }
// }

export function StepsProvider({ children }) {
    const [currStep, setCurrStep] = useState(0);

    return (
        <CurrentStepContext.Provider value={currStep}>
            <useSatetForCurrentStepContext.Provider value={setCurrStep}>
                {children}
            </useSatetForCurrentStepContext.Provider>
        </CurrentStepContext.Provider>
    );
}

// const [steps, stepsDispatch] = useReducer(stepsReducer, [0, 0, 0, 0]);

/* <StepsContext.Provider value={steps}>
    <StepsDispatchContext.Provider value={stepsDispatch}>
    </StepsDispatchContext.Provider>
</StepsContext.Provider> */