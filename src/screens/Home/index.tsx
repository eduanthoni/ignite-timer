import { HandPalm, Play } from "phosphor-react";
import { 
  MainContainer, 
  StartButton, 
  StopButton
} from "./styles";
import { createContext, useEffect, useState } from "react";
import uuid from "react-uuid";
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { number, string } from "zod";

import { CountDown } from './components/Countdown';
import { CycleForm } from './components/CycleForm';

interface CycleData {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  stopDate?: Date,
  completedDate?: Date
}

interface CycleContextData {
  activeCycle: CycleData | undefined,
  activeCycleId: String | null,
  markCurrentAsFinished: () => void,
  secondsPassed: number,
  handleSecondsPassed: (number: number) => void
}

export const CyclesContext = createContext({} as CycleContextData)

//Constante de configurações de validação
const newCycleFormValidations = zod.object({
  task: string().min(1, 'Informe uma tarefa'),
  minutesAmount: number().min(1).max(60),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidations>

//Componente Home
export function Home() {
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [cycles, setCycles] = useState<CycleData[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<String | null>(null);

  const formOptions = useForm({
    resolver: zodResolver(newCycleFormValidations),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  const { watch, reset, handleSubmit } = formOptions;
  
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const isSubmitEmpty = watch('task');

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

  function onHandleStartCycle(data: newCycleFormData) {
    const id = uuid();

    const newCycle:CycleData = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setSecondsPassed(0);

    reset();
  }

  function onHandleStopCycle() {
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

  return (
    <MainContainer>
      <form onSubmit={handleSubmit(onHandleStartCycle)}>

        <CyclesContext.Provider value={
          { activeCycle, activeCycleId, markCurrentAsFinished, secondsPassed, handleSecondsPassed }
          }>
          <FormProvider {...formOptions}>
            <CycleForm />
          </FormProvider> 
          <CountDown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopButton type="button" onClick={onHandleStopCycle}>
            <HandPalm size={24}/>
            Interromper
          </StopButton>
        ): (
          <StartButton disabled={!isSubmitEmpty} type="submit" >
            <Play size={24}/>
            Começar
          </StartButton>
        )}
      </form>
    </MainContainer>
  );
}