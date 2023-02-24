import { createContext, ReactNode, useState, useReducer } from "react"
import { CycleData, cyclesReducer } from "../reducers/CycleReducer"

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
  
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      }
    });

    setSecondsPassed(0);
  }
  
  function stopCurrentCycle() {

    dispatch({
      type: 'STOP_CURRENT_CYCLE',
      payload: {
        activeCycleId
      }
    })   
  }

  function markCurrentAsFinished() {

    dispatch({
      type: 'MARK_FINISHED_CYCLE',
      payload: {
        activeCycleId
      }
    })
  }

  function handleSecondsPassed(seconds: number) {
    setSecondsPassed(seconds);
  }

  function resetActiveCycleId(id: string | null) {
    dispatch({
      type: 'RESET_ACTIVE_CYCLE',
      payload: {
        id
      }
    })
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