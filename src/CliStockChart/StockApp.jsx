import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


import './styles.css'
import Loading from './components/Loading'

const Stock = React.lazy(() => import("./CliStock"))
function App() {
   
    return (
        <>
           
            <Router>
                
                <Routes>
                   
                    <Route path='/' element={
                        <Suspense fallback={<Loading />}>
                            <Stock />
                        </Suspense>} />
                </Routes>
            </Router>
        </>
    )
}

export default App
