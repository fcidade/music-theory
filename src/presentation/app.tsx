import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navbar } from "./components";
import { RudimentTrackerPage, RudimentsListPage } from "./pages"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<RudimentsListPage />} />
          <Route path="/rudiment-tracker/:id" element={<RudimentTrackerPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
