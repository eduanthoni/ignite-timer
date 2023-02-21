import { differenceInSeconds } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { CyclesContext } from '../../../../context/CycleContext';
import { Colon, CountdownContainer } from './styles';

export function CountDown() {
  const { 
    activeCycle, 
    activeCycleId, 
    markCurrentAsFinished, 
    secondsPassed, 
    handleSecondsPassed,
    resetActiveCycleId
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval:number;

    if(activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);

        if(secondsDifference >= totalSeconds) {
          markCurrentAsFinished();
          handleSecondsPassed(totalSeconds);

          resetActiveCycleId(null);
          clearInterval(interval);
        } else {
          handleSecondsPassed(secondsDifference);
        }

      }, 1000);      
    }
    

    return () => {
      clearInterval(interval);
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentAsFinished]);

  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');
  
  useEffect(() => {
    if(activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Colon>:</Colon>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}