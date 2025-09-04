import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login';
import AllEvents from './events/allEvents';
import EventsByType from './components/EventsByType';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/allEvents" element={<AllEvents />} />
        <Route path="/events/:type" element={<EventsByType />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
