
import './App.css'
import { CadNome } from './pages/CadNome'
import { ListAllUser } from './pages/ListAllUser'

import { Route, BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter basename='/'>
      <Route path='/' element={<CadNome />}/>
      <Route path='/atualizar' element={<ListAllUser/>}/>
    </BrowserRouter>
  )
}

export default App
