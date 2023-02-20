import styled from 'styled-components';

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