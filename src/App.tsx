import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { Navbar } from "./components/navbar";
import { RudimentsListPage } from "./pages/rudiments-list/rudiments-list-page";

const RudimentTrackerPage = () => (
  <div>
    <div>
    scoresheet
    <button>play</button>
    </div>
    <div>
      Track your progress:
      <div>
        - 80bpm
        - 80bpm
        - 80bpm
        - 80bpm
      </div>
    </div>
    <div>
      metronome
    </div>
  </div>
)

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
