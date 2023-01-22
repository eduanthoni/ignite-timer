import { Minus, Play, Plus } from "phosphor-react"
import { MainContainer, FormContainer, CountdownContainer, Colon, TimerButton, TaskInput, MinutesAmountInput } from "./styles"

export function Home() {
  return (
    <MainContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            type="text" 
            id="task"
            placeholder="Dê um nome para seu projeto"
          />

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
            placeholder="00" 
            type="number" 
            id="minutesAmount"
            min={5}
            max={60}
            step={5}
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

        <TimerButton disabled>
          <Play size={24}/>
          Começar
        </TimerButton>
      </form>
    </MainContainer>
  )
}