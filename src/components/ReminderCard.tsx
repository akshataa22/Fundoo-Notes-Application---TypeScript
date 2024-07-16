import React, { useState } from 'react';
import './../styles/ReminderCard.scss'

interface ReminderCardProps {
  noteId: number;
  setReminder: (noteId: number, reminder: string) => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({ noteId, setReminder }) => {
  const [reminder, setReminderValue] = useState('');

  const handleSetReminder = () => {
    setReminder(noteId, reminder);
  };

  return (
    <div className="reminder-card">
      <h3>Reminder:</h3>
      <div className="preset-reminders">
        <button onClick={() => setReminderValue('2024-07-16T20:00')}>Later today</button>
        <button onClick={() => setReminderValue('2024-07-17T08:00')}>Tomorrow</button>
        <button onClick={() => setReminderValue('2024-07-22T08:00')}>Next week</button>
      </div>
      <div className="custom-reminder">
        <div className='set-container'>
          <input type="datetime-local" value={reminder} onChange={(e) => setReminderValue(e.target.value)}/>
          <button onClick={handleSetReminder}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;
