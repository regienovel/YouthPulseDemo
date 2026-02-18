import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import NationalOverview from './pages/NationalOverview'
import EmploymentDashboard from './pages/EmploymentDashboard'
import InfrastructureDashboard from './pages/InfrastructureDashboard'
import TalentDashboard from './pages/TalentDashboard'
import AskAI from './pages/AskAI'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<NationalOverview />} />
        <Route path="/employment" element={<EmploymentDashboard />} />
        <Route path="/infrastructure" element={<InfrastructureDashboard />} />
        <Route path="/talent" element={<TalentDashboard />} />
        <Route path="/ask-ai" element={<AskAI />} />
      </Route>
    </Routes>
  )
}
