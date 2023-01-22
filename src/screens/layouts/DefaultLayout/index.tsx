import { Outlet } from 'react-router-dom';

//Componentes
import { Header } from "../../../components/Header";

//Estilos
import { LayoutContainer } from './styles';

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}