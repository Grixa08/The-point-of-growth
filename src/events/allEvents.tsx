import React, { useState, useEffect } from 'react';
import './AllEvents.css';
import EventCard from '../components/EventCard';

// Интерфейс для ивента
export interface EventItem {
  id: string;
  title: string;
  type: string;
  company: string;
  date: string;
  isNew?: boolean;
  tags?: string[];
  imageUrl?: string;
}

// Данные для карусели баннера
const bannerSlides = [
  {
    id: 1,
    title: 'Олимпиады'
  },
  {
    id: 2,
    title: 'Конкурсы'
  },
  {
    id: 3,
    title: 'Стажировки'
  },
  {
    id: 4,
    title: 'Вакансии'
  }
];

// Моковые данные (потом заменятся на данные с бэка)
const mockEvents: EventItem[] = [
  {
    id: '1',
    title: 'Олимпиада по математике',
    type: 'Олимпиада',
    company: 'ООО "ЛучшийИнфоГигант"',
    date: '12 сентября',
    isNew: true,
    tags: ['Frontend', '2024'],
  },
  {
    id: '2',
    title: 'Олимпиада по физике',
    type: 'Олимпиада',
    company: 'ООО "Наука"',
    date: '15 сентября',
    tags: ['Backend'],
  },
  {
    id: '3',
    title: 'Олимпиада по физике',
    type: 'Вакансия',
    company: 'ООО "Наука"',
    date: '15 сентября',
    tags: ['Backend'],
  },
  {
    id: '4',
    title: 'Олимпиада по физике',
    type: 'Стажировка',
    company: 'ООО "Наука"',
    date: '15 сентября',
    tags: ['Backend'],
  },
  {
    id: '5',
    title: 'Олимпиада по физике',
    type: 'Конкурс',
    company: 'ООО "Наука"',
    date: '15 сентября',
    tags: ['Backend'],
  },
];

function AllEvents() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Фиксированный список типов ивентов
    const allTypes = ['Олимпиада', 'Конкурс', 'Стажировка', 'Вакансия'];

    // Группируем ивенты по типу
    const eventsByType: Record<string, EventItem[]> = {};
    allTypes.forEach(type => {
      eventsByType[type] = mockEvents.filter(e => e.type === type);
    });

    // Секции с ивентами (не пустые)
    const nonEmptySections = allTypes.filter(type => eventsByType[type].length > 0);
    // Секции без ивентов (пустые)
    const emptySections = allTypes.filter(type => eventsByType[type].length === 0);

    // Автоматическое переключение слайдов
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    // Обработчики для карусели
    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        // Возобновляем автопрокрутку через 5 секунд
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };




    return (
        <div className="all-events-container">
            {/* Верхний баннер с каруселью */}
            <div className="banner">
                <div className="banner-bg" />
                <div className="banner-carousel">
                    {bannerSlides.map((slide, index) => (
                        <div 
                            key={slide.id}
                            className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{
                                transform: `translateX(${(index - currentSlide) * 100}%)`
                            }}
                        >
                            <div className="banner-content">
                                <h2>{slide.title}</h2>
                                <button className="see-all-btn">See all</button>
                            </div>
                        </div>
                    ))}
                    
                </div>
                
                {/* Точки индикаторы */}
                <div className="slider-dots">
                    {bannerSlides.map((_, index) => (
                        <span 
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Сначала секции с ивентами */}
            {nonEmptySections.map((type, idx) => (
              <div className={`section${idx === 0 ? ' first-section' : ''}`} key={type}>
                <div className="section-header">
                  <h3>{type}</h3>
                  <button className="btn-event">Все</button>
                </div>
                <div className="events-list">
                  {eventsByType[type].map(event => (
                    <EventCard key={event.id} {...event} />
                  ))}
                </div>
              </div>
            ))}

            {/* Потом секции без ивентов (пустые) */}
            {emptySections.map(type => (
              <div className={"section empty-section"} key={type}>
                <h3>{type}</h3>
                <div className="events-list empty-list">
                  <div className="empty-events-placeholder">Пока нет ивентов</div>
                </div>
              </div>
            ))}

            {/* Нижнее меню */}
            <div className="bottom-nav">
                <div className="nav-item active">
                    <span role="img" aria-label="events">📅</span>
                    <div>Все ивенты</div>
                </div>
                <div className="nav-item">
                    <span role="img" aria-label="my-events">🔔</span>
                    <div>Мои ивенты</div>
                </div>
                <div className="nav-item">
                    <span role="img" aria-label="account">👤</span>
                    <div>Аккаунт</div>
                </div>
            </div>
        </div>
    )
}

export default AllEvents;