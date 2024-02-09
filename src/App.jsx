
import { Route } from 'wouter'
import './App.css'
import Login from './pages/Login/Login'
import Calendar from './components/Calendar/Calendar'
import { UserContextProvider } from './context/UserContext'
import UserHome from './pages/UserHome/UserHome'
import NewDate from './pages/NewDate/NewDate'
import { DatesContextProvider } from './context/DatesContext'
import AdminHome from './pages/AdminHome/AdminHome'
import SpecificDay from './pages/SpecificDay/SpecificDay'

function App() {
  

  return (
    <div className='app'>
      
        <UserContextProvider>
          <Route
          path='/'
          component={Login}
          />

          <Route
          path='/home'
          component={UserHome}
          />

          <DatesContextProvider>
            <Route 
            path='/dates'
            component={Calendar}
            />
            <Route
            path='/admin'
            component={AdminHome}
            />
            <Route
            path='/dates/:year/:month/:day'
            component={SpecificDay}
            />
          </DatesContextProvider>

          <Route
          path='/newDate/:id'
          component={NewDate}
          />

        </UserContextProvider>
      
    </div>
  )
}

export default App
