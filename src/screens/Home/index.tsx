import { Play } from "phosphor-react";
import { 
  MainContainer, 
  FormContainer, 
  CountdownContainer, 
  Colon, 
  TimerButton, 
  TaskInput, 
  MinutesAmountInput 
} from "./styles";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useState } from "react";
import { number, string } from "zod";


//Constante de configurações de validação
const newCycleFormValidations = zod.object({
  task: string().min(1, 'Informe uma tarefa'),
  minutesAmount: number().min(5).max(60),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidations>

//Componente Home
export function Home() {

  const { register, watch, handleSubmit, reset } = useForm({
    resolver: zodResolver(newCycleFormValidations),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  const isSubmitEmpty = watch('task');

  function onHandleSubmit(data: newCycleFormData) {
    console.log(data);

    reset();
  }

  return (
    <MainContainer>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            type="text" 
            id="task"
            placeholder="Dê um nome para seu projeto"
            {...register('task')}
          />

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
            placeholder="00" 
            type="number" 
            id="minutesAmount"
            min={5}
            max={60}
            step={5}
            {...register('minutesAmount')}
          />      
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Colon>:</Colon>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <TimerButton disabled={!isSubmitEmpty} type="submit">
          <Play size={24}/>
          Começar
        </TimerButton>
      </form>
    </MainContainer>
  );
}