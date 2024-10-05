import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginForm from './pages/Login';
import SignupForm from './pages/Signup';
import Home from './pages/Home';
import Deliveries from './pages/Deliveries';
import LeaderBoard from './pages/Leaderboard';
import CityMap from './pages/CityMap';
import Settings from './pages/Settings';
import SidebarNav from './layouts/Navbar'; 
import Rewards from './pages/Rewards';

function App() {
  const userName = "Mukesh"; 
  const location = useLocation();

  const showSidebarNav = !['/login', '/signup'].includes(location.pathname);

  return (
    <div className="flex">
      {showSidebarNav && <SidebarNav userName={userName} />}
      <main className="flex-1 p-6">
        <Routes>
          <Route index element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/deliveries' element={<Deliveries />} />
          <Route path='/leaderboard' element={<LeaderBoard />} />
          <Route path='/city-map' element={<CityMap />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/rewards' element={<Rewards/>}/>
        </Routes>
      </main>
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;