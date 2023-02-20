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

export const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  font-weight: bold;
  color: ${props => props.theme['gray-100']};
  border: 0;
  border-radius: 8px;


  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartButton = styled(BaseButton)`
  background: ${props => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${props => props.theme['green-700']};
  }
`

export const StopButton = styled(BaseButton)`
  background: ${props => props.theme['red-500']};

  &:not(:disabled):hover {
    background: ${props => props.theme['red-700']};
  }
`
