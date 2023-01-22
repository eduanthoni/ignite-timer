import { Route, Routes } from 'react-router-dom';

//Componentes
import { History } from './screens/History';
import { Home } from './screens/Home';
import { DefaultLayout } from './screens/layouts/DefaultLayout';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
      </Route>
    </Routes>
  )
}