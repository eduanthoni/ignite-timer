import styled from 'styled-components';

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