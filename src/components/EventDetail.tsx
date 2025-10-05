import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { EventItem } from '../events/allEvents';
import '../events/AllEvents.css';

// Временно берём данные из моков страницы allEvents через localStorage/передачу id
// Когда появится API, заменим на запрос к серверу

const fallbackEvents: EventItem[] = [
  { id: '1', title: 'Олимпиада по математике', type: 'Олимпиада', company: 'ООО "ЛучшийИнфоГигант"', date: '12 сентября', isNew: true, tags: ['Frontend', '2024'] },
  { id: '2', title: 'Олимпиада по физике', type: 'Олимпиада', company: 'ООО "Наука"', date: '15 сентября', isNew: true, tags: ['Backend'] },
  { id: '3', title: 'Конкурс программирования', type: 'Конкурс', company: 'ООО "Наука"', date: '15 сентября', isNew: true, tags: ['Backend'] },
  { id: '4', title: 'Стажировка в IT компании', type: 'Стажировка', company: 'ООО "Наука"', date: '15 сентября', tags: ['Backend'] },
  { id: '5', title: 'Вакансия разработчика', type: 'Вакансия', company: 'ООО "Наука"', date: '15 сентября', tags: ['Backend'] },
  { id: '6', title: 'Вакансия разработчика', type: 'События', company: 'ООО "Наука"', date: '15 сентября', tags: ['Backend'] },
  { id: '7', title: 'Конкурс программированияz', type: 'Конкурс', company: 'ООО "Наука"', date: '15 сентября', isNew: true, tags: ['Backend'] },
];

function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const gradientsByType: Record<string, string> = {
    'События': 'linear-gradient(180deg, #0099FF, #FFFFFF)',
    'Олимпиада': 'linear-gradient(180deg, #FF9500, #FFBD61)',
    'Конкурс': 'linear-gradient(180deg, #7378FF, #ACAFFF)',
    'Стажировка': 'linear-gradient(180deg, #787878, #161616)',
    'Вакансия': 'linear-gradient(135deg, #87C0FF, #007AFF)'
  };

  const eventItem = useMemo(() => {
    const all = fallbackEvents;
    return all.find(e => e.id === id);
  }, [id]);

  if (!eventItem) {
    return (
      <div className="all-events-container" style={{ padding: 16 }}>
        <button className="btn-event" onClick={() => navigate(-1)}>Назад</button>
        <div style={{ marginTop: 16 }}>Ивент не найден</div>
      </div>
    );
  }

  return (
    <div className="all-events-container" style={{ padding: 16 }}>
      <div className="section first-section">
        <div className="event-card" style={{ maxWidth: 600 }}>
          <div 
            className="event-img"
            style={{ 
              height: 220,
              background: gradientsByType[eventItem.type] || 'linear-gradient(180deg, #0099FF, #FFFFFF)'
            }} 
          />
          <div className="event-info" style={{ height: 'auto' }}>
            <div className="event-title" style={{ fontSize: '1.25rem' }}>{eventItem.title}</div>
            <div className="event-type">{eventItem.type}</div>
            <div style={{ fontSize: '0.95rem', color: '#666', marginTop: 6 }}>{eventItem.company}</div>
            <div style={{ fontSize: '0.9rem', color: '#888', marginTop: 4 }}>{eventItem.date}</div>
            {eventItem.tags && (
              <div style={{ marginTop: 8 }}>
                {eventItem.tags.map(tag => (
                  <span key={tag} style={{ background: '#f0f0f0', borderRadius: 4, padding: '2px 6px', fontSize: 12, marginRight: 6 }}>{tag}</span>
                ))}
              </div>
            )}
            <button 
              className="btn-event"
              style={{ marginTop: 16, background: '#1e90ff', color: '#fff', borderRadius: 10, padding: '10px 16px' }}
              onClick={() => alert('Заявка отправлена!')}
            >
              Записаться
            </button>
            <button 
              className="btn-event"
              style={{ marginTop: 8 }}
              onClick={() => navigate(-1)}
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;


