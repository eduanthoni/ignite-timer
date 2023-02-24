import { createContext, ReactNode, useState, useReducer } from "react"
import { addNewCycleAction, 
         markFinishedCycleAction, 
         resetActiveCycleAction, 
         stopCurrentCycleAction 
        } from "../reducers/cycle/actions"
import { CycleData, cyclesReducer } from "../reducers/cycle/reducer"

interface formData {
  task: string,
  minutesAmount: number
}

interface CycleContextData {
  activeCycle: CycleData | undefined,
  activeCycleId: String | null,
  markCurrentAsFinished: () => void,
  secondsPassed: number,
  handleSecondsPassed: (number: number) => void,
  createNewCycle: (data: formData) => void,
  stopCurrentCycle: () => void,
  cycles: CycleData[],
  resetActiveCycleId: (data: string | null) => void
}


export const CyclesContext = createContext({} as CycleContextData)

interface CycleContextProviderProps {
  children: ReactNode
}

export function CycleContextProvider({ children }: CycleContextProviderProps) {

  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  });

  const { activeCycleId, cycles } = cyclesState;

  const [secondsPassed, setSecondsPassed] = useState(0);
  
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  function createNewCycle(data: formData) {
    const id = String(new Date().getTime());
  
    const newCycle:CycleData = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
  
    dispatch(addNewCycleAction(newCycle));

    setSecondsPassed(0);
  }
  
  function stopCurrentCycle() {

    dispatch(stopCurrentCycleAction())   
  }

  function markCurrentAsFinished() {

    dispatch(markFinishedCycleAction())
  }

  function handleSecondsPassed(seconds: number) {
    setSecondsPassed(seconds);
  }

  function resetActiveCycleId(id: string | null) {
    dispatch(resetActiveCycleAction(id))
  }

  return (
    <CyclesContext.Provider value={
      { activeCycle, 
        activeCycleId, 
        markCurrentAsFinished, 
        secondsPassed, 
        handleSecondsPassed, 
        createNewCycle,
        stopCurrentCycle,
        cycles,
        resetActiveCycleId
      }
    }>
      { children }
    </CyclesContext.Provider>
  )
}