import React from 'react';
import { useNavigate } from 'react-router-dom';

function Account() {
  const navigate = useNavigate();
  return (
            <div className="bottom-nav">
                <div className="nav-item" onClick={() => navigate('/allEvents')}>
                    <span role="img" aria-label="events">📅</span>
                    <div>Все ивенты</div>
                </div>
                <div className="nav-item" onClick={() => navigate('/my')}>
                    <span role="img" aria-label="my-events">🔔</span>
                    <div>Мои ивенты</div>
                </div>
                <div className="nav-item" onClick={() => navigate('/account')}>
                    <span role="img" aria-label="account">👤</span>
                    <div>Аккаунт</div>
                </div>
            </div>
  );  
}

export default Account;


