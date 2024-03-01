import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { SignIn } from "./pages/SignIn"

function App() {

  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate  to={"/signin"}/>
  }

  return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/'>
						<Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
						<Route path='/dashboard' element={<RequireAuth> <Dashboard/> </RequireAuth>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
