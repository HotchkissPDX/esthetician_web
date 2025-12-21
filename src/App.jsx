import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Testimonials from './pages/Testimonials.jsx'
import Contact from './pages/Contact.jsx'
import Book from './pages/Book.jsx'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'
import SeoDefaults from './components/SeoDefaults.jsx'

function App() {
  return (
    <Box className="App" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      {/* Spacer to offset fixed AppBar height */}
      <Toolbar />
      <Box component="main" sx={{ py: 3, flexGrow: 1 }}>
        <Container maxWidth="lg">
          <SeoDefaults />
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
            <Route path="*" element={<Navigate to="/about" replace />} />
          </Routes>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default App
