import React from 'react';
import type { EventItem } from '../events/allEvents';
import '../events/AllEvents.css';

interface EventCardProps extends EventItem {}

const EventCard: React.FC<EventCardProps> = ({ title, type, company, date, isNew, tags, imageUrl }) => {
  return (
    <div className="event-card">
      <div className="event-img" style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' } : {}} />
      <div className="event-info">
        <div className="event-title">{title}</div>
        <div className="event-type">{type}</div>
        <div style={{ fontSize: '0.85rem', color: '#888', margin: '4px 0' }}>{company}</div>
        <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{date}</div>
        {isNew && <span style={{ color: '#fff', background: '#1e90ff', borderRadius: 6, fontSize: 12, padding: '2px 6px', marginLeft: 6 }}>NEW</span>}
        {tags && <div style={{ marginTop: 4 }}>{tags.map(tag => <span key={tag} style={{ background: '#f0f0f0', borderRadius: 4, padding: '2px 6px', fontSize: 11, marginRight: 4 }}>{tag}</span>)}</div>}
      </div>
    </div>
  );
};

export default EventCard; 