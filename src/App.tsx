import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login';
import AllEvents from './events/allEvents';
import MyEvents from './components/MyEvents';
import Account from './components/Account';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/allEvents" element={<AllEvents />} />
        <Route path="/my" element={<MyEvents />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
