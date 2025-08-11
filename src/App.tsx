import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login';
import AllEvents from './events/allEvents';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/allEvents" element={<AllEvents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
