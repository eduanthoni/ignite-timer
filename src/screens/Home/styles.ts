import styled from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  flex-wrap: wrap;
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  
  color: ${props => props.theme['gray-300']};
  font-weight: bold;
  font-size: inherit;
  padding: 0 0.5rem;

  &:focus {
    border-color: ${props => props.theme['green-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;
  border-bottom: 2px solid ${props => props.theme['gray-500']};

  &::placeholder {
    color: ${props => props.theme['gray-500']}
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  border-bottom: 2px solid ${props => props.theme['gray-500']};
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CountdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: 'Roboto Mono', monospace;  
  font-size: 10rem;
  line-height: 8rem;
  font-weight: bold;
  
  span {
    padding: 2.5rem 1rem;
    border-radius: 8px;
    background: ${props => props.theme['gray-700']};
  }
`

export const Colon = styled.div`
  padding: 2.5rem 0;
  color: ${props => props.theme['green-500']};
  width: 5rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

export const TimerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  font-weight: bold;
  background: ${props => props.theme['green-500']};
  color: ${props => props.theme['gray-100']};
  border: 0;
  border-radius: 8px;

  &:not(:disabled):hover {
    background: ${props => props.theme['green-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
