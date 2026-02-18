import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import NationalOverview from './pages/NationalOverview'
import EmploymentDashboard from './pages/EmploymentDashboard'
import EmpowermentDashboard from './pages/EmpowermentDashboard'
import NEETDashboard from './pages/NEETDashboard'
import AskAI from './pages/AskAI'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<NationalOverview />} />
        <Route path="/employment" element={<EmploymentDashboard />} />
        <Route path="/empowerment" element={<EmpowermentDashboard />} />
        <Route path="/neet" element={<NEETDashboard />} />
        <Route path="/ask-ai" element={<AskAI />} />
      </Route>
    </Routes>
  )
}
