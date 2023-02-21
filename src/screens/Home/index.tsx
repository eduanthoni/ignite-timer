import { HandPalm, Play } from "phosphor-react";
import { 
  MainContainer, 
  StartButton, 
  StopButton
} from "./styles";
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { number, string } from "zod";

import { CountDown } from './components/Countdown';
import { CycleForm } from './components/CycleForm';
import { useContext } from "react";
import { CyclesContext } from "../../context/CycleContext";

//Constante de configurações de validação
const newCycleFormValidations = zod.object({
  task: string().min(1, 'Informe uma tarefa'),
  minutesAmount: number().min(1).max(60),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidations>

//Componente Home
export function Home() {
  const { activeCycle, createNewCycle, stopCurrentCycle} = useContext(CyclesContext)

  const formOptions = useForm({
    resolver: zodResolver(newCycleFormValidations),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  const { watch, reset, handleSubmit } = formOptions;

  const isSubmitEmpty = watch('task');

  function handleCreateCycle(data: newCycleFormData) {
    createNewCycle(data);
    reset();
  }

  return (
    <MainContainer>
      <form onSubmit={handleSubmit(handleCreateCycle)}>
          <FormProvider {...formOptions}>
            <CycleForm />
          </FormProvider> 
          <CountDown />
        

        {activeCycle ? (
          <StopButton type="button" onClick={stopCurrentCycle}>
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