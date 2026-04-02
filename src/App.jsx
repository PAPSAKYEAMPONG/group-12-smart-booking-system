import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Booking from './pages/Booking/Booking'
import Footer from './components/Footer'
import ClientLayout from './layouts/ClientLayout'
import AdminLayout from './layouts/AdminLayout'
import Overview from './pages/Admin/Overview'
import Appointments from './pages/Admin/Appointments'
import Specialists from './pages/Admin/Specialists'

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        {/* Client Routes */}
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/booking/*" element={<Booking />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="specialists" element={<Specialists />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
