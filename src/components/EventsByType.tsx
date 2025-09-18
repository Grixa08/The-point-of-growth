import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import type { EventItem } from '../events/allEvents';
import './EventsByType.css';

interface EventsByTypeProps {
    type: string;
    events: EventItem[];
    onBack: () => void;
}

function EventsByType({ type, events, onBack }: EventsByTypeProps) {
    const navigate = useNavigate();
    // Обработчик нативной кнопки "назад"
    useEffect(() => {
        const handleBackButton = (event: Event) => {
            event.preventDefault();
            onBack(); // Возвращаемся на экран "все ивенты"
        };

        // Добавляем обработчик для нативной кнопки "назад"
        window.addEventListener('popstate', handleBackButton);
        
        // Добавляем запись в историю, чтобы кнопка "назад" работала правильно
        window.history.pushState(null, '', window.location.pathname);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [onBack]);

    // Функция для получения градиента по типу
    const getGradientStyle = (eventType: string): React.CSSProperties => {
        const gradients: Record<string, string> = {
            'События': 'linear-gradient(180deg, #0099FF, #FFFFFF)',
            'Олимпиада': 'linear-gradient(180deg, #FF9500, #FFBD61)',
            'Конкурс': 'linear-gradient(180deg, #7378FF, #ACAFFF)',
            'Стажировка': 'linear-gradient(180deg, #787878, #161616)',
            'Вакансия': 'linear-gradient(135deg, #87C0FF, #007AFF)',
        };
        
        return {
            backgroundImage: gradients[eventType] || 'linear-gradient(135deg, #787878, #161616)'
        };
    };

    const headerStyle = getGradientStyle(type);

    return (
        <div className="events-by-type-container">
            {/* Хедер с градиентом */}
            <div 
                className="events-header"
                style={headerStyle}
            >
                <div >
                    <h1>Раздел</h1>
                    <h1>{type}</h1>
                </div>    
            </div>

            {/* Список событий */}
            <div className="events-grid">
                {events.length > 0 ? (
                    events.map(event => (
                        <EventCard key={event.id} {...event} />
                    ))
                ) : (
                    <div className="no-events">
                        <p>Нет событий в категории "{type}"</p>
                    </div>
                )}
            </div>

            {/* Нижнее меню */}
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
        </div>
    );
}

export default EventsByType;