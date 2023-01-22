import { HeaderContainer } from "./styles";

//Imagens e ícones
import IgniteLogo from '../../assets/ignite-logo.svg';
import { Timer, Scroll } from 'phosphor-react';

import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={IgniteLogo} />
      <nav>
        <NavLink to='/' title="Timer">
          <Timer size={22} />
        </NavLink>
        <NavLink to='/history' title="Histórico">
          <Scroll size={22} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}