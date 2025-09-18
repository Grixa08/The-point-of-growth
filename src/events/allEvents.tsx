import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllEvents.css';
import EventCard from '../components/EventCard';
import EventsByType from '../components/EventsByType'; // Новый компонент для отображения событий по типу

// Интерфейс для ивента
export type EventItem = {
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
    title: 'Олимпиады',
    type: 'Олимпиада'
  },
  {
    id: 2,
    title: 'Конкурсы',
    type: 'Конкурс'
  },
  {
    id: 3,
    title: 'Стажировки',
    type: 'Стажировка'
  },
  {
    id: 4,
    title: 'Вакансии',
    type: 'Вакансия'
  },
  {
    id: 5,
    title: "События",
    type: "События"
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
    isNew: true,
    tags: ['Backend'],
  },
  {
    id: '3',
    title: 'Конкурс программирования',
    type: 'Конкурс',
    company: 'ООО "Наука"',
    date: '15 сентября',
    isNew: true,
    tags: ['Backend'],
  },
  {
    id: '4',
    title: 'Стажировка в IT компании',
    type: 'Стажировка',
    company: 'ООО "Наука"',
    date: '15 сентября',
    tags: ['Backend'],
  },
  {
    id: '5',
    title: 'Вакансия разработчика',
    type: 'Вакансия',
    company: 'ООО "Наука"',
    date: '15 сентября',
    tags: ['Backend'],
  },
  {
    id: '6',
    title: 'Вакансия разработчика',
    type: 'События',
    company: 'ООО "Наука"',
    date: '15 сентября',
    tags: ['Backend'],
  },
  {
    id: '7',
    title: 'Конкурс программированияz',
    type: 'Конкурс',
    company: 'ООО "Наука"',
    date: '15 сентября',
    isNew: true,
    tags: ['Backend'],
  }
];

function AllEvents() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(1);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [selectedType, setSelectedType] = useState<string | null>(null); // Новое состояние для выбранного типа

    // Создаем расширенный массив слайдов для бесконечной карусели
    const extendedSlides = [bannerSlides[bannerSlides.length - 1], ...bannerSlides, bannerSlides[0]];

    const allTypes = ['Олимпиада', 'Конкурс', 'Стажировка', 'Вакансия', 'События'];

    const eventsByType: Record<string, EventItem[]> = {};
    allTypes.forEach(type => {
      eventsByType[type] = mockEvents.filter(e => e.type === type);
    });

    const nonEmptySections = allTypes.filter(type => eventsByType[type].length > 0);
    const emptySections = allTypes.filter(type => eventsByType[type].length === 0);

    useEffect(() => {
        if (!isAutoPlaying || selectedType) return; // Не автоплеим если открыт конкретный тип

        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                const nextSlide = prev + 1;

                if (nextSlide === extendedSlides.length - 1) {
                    setTimeout(() => {
                        setIsTransitioning(false);
                        setCurrentSlide(1);
                        setTimeout(() => setIsTransitioning(true), 50);
                    }, 500);
                    return nextSlide;
                }

                return nextSlide;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, extendedSlides.length, selectedType]);

    const goToSlide = (index: number) => {
        const extendedIndex = index + 1;
        setCurrentSlide(extendedIndex);
        setIsAutoPlaying(false);
        setIsTransitioning(true);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const handleShowAll = (type: string) => {
        setSelectedType(type);
        setIsAutoPlaying(false); // Останавливаем карусель при переходе
    };

    const handleBackToAll = () => {
        setSelectedType(null);
        setIsAutoPlaying(true); // Возобновляем карусель
    };

    // Если выбран конкретный тип, показываем компонент EventsByType
    if (selectedType) {
        return (
            <EventsByType 
                type={selectedType}
                events={eventsByType[selectedType] || []}
                onBack={handleBackToAll}
            />
        );
    }

    return (
        <div className="all-events-container">
            <div className="banner">
                <div
                    className="banner-carousel"
                    style={{
                        transform: `translateX(calc(-${currentSlide * 100}% - ${currentSlide * 20}px))`,
                        transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                    }}
                >
                    {extendedSlides.map((slide, index) => (
                        <div
                            key={`${slide.id}-${index}`}
                            className="banner-slide"
                        >
                            <div className="banner-content">
                                <h2>{slide.title}</h2>
                                <button 
                                    className="see-all-btn"
                                    onClick={() => handleShowAll(slide.type)}
                                >
                                    Показать все
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Точки индикаторы */}
                <div className="slider-dots">
                    {bannerSlides.map((_, index) => {
                        const isActive = index === (currentSlide - 1) ||
                                       (currentSlide === 0 && index === bannerSlides.length - 1) ||
                                       (currentSlide === extendedSlides.length - 1 && index === 0);
                        return (
                            <span
                                key={index}
                                className={`dot ${isActive ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Сначала секции с ивентами */}
            {nonEmptySections.map((type, idx) => (
              <div className={`section${idx === 0 ? ' first-section' : ''}`} key={type}>
                <div className="section-header">
                  <h3>{type}</h3>
                  <button 
                    className="btn-event"
                    onClick={() => handleShowAll(type)}
                  >
                    Все
                  </button>
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
    )
}

export default AllEvents;