import { createContext, ReactNode, useState } from "react"

interface CycleData {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  stopDate?: Date,
  completedDate?: Date
}

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

interface CycleContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CycleContextData)

export function CycleContextProvider({ children }: CycleContextProviderProps) {

  const [cycles, setCycles] = useState<CycleData[]>([]);
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [activeCycleId, setActiveCycleId] = useState<String | null>(null);
  
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  function createNewCycle(data: formData) {
    const id = String(new Date().getTime());
  
    const newCycle:CycleData = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
  
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setSecondsPassed(0);
  }
  
  function stopCurrentCycle() {
    setCycles(state => 
      state.map(cycle => {
        if(cycle.id === activeCycleId) {
          return {...cycle, stopDate: new Date()}
        } else {
        return cycle
        }
      })
    );
    
    setActiveCycleId(null);
  }

  function markCurrentAsFinished() {
    setCycles(state => 
      state.map(cycle => {
        if(cycle.id === activeCycleId) {
          return {...cycle, completedDate: new Date()}

        } else {
          return cycle
        }
      })
    );

  }

  function handleSecondsPassed(seconds: number) {
    setSecondsPassed(seconds);
  }

  function resetActiveCycleId(id: string | null) {
    setActiveCycleId(id);
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