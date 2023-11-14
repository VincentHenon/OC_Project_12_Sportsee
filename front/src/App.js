import './Styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './Layout/Header'
import Sider from './Layout/Sider'
import Home from './Pages/Home'
import Page404 from './Pages/Page404'
import Dashboard from './Pages/Dashboard'

// isDevMode set the way we fetch the data (local/API)
export const isDevMode = false
console.log("Is app running in Dev Mode? ", isDevMode)

function App() {
  return (
    <>
      <Header />
      <main>
        <Sider />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/user/:id" element={<Dashboard />}/>
          <Route path="/profile" element={<Page404/>}/>
          <Route path="/settings" element={<Page404/>}/>
          <Route path="/community" element={<Page404/>}/>
          <Route path="/*" element={<Page404/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App