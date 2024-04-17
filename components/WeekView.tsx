import { useState } from 'react';

// This is a placeholder for your Event type
type Event = {
  day: number;
  start: number;
  end: number;
  title: string;
};

const HourLine = ({ day, hour, addEvent }: { day: number; hour: number; addEvent: (event: Event) => void }) => (
  <div
    className="border-t border-gray-200 h-16 cursor-pointer"
    onClick={() => addEvent({ day, start: hour, end: hour + 1, title: hour + "h" })}
  ></div>
);

const HourLabels = () => (
  <div className="pr-2">
    {Array.from({ length: 24 }).map((_, hour) => (
      <div key={hour} className="h-16 flex items-center">
        <span className="text-xs text-gray-500">{hour}:00</span>
      </div>
    ))}
  </div>
);

const DayColumn = ({ day, events, addEvent }: { day: number; events: Event[]; addEvent: (event: Event) => void }) => (
  <div className="border-l border-gray-200 flex-1 min-w-0">
    <div className="text-center text-sm text-gray-700 py-2">{`Day ${day}`}</div>
    <div className="relative">
    {Array.from({ length: 24 }).map((_, hour) => (
        <HourLine key={hour} day={day} hour={hour} addEvent={addEvent} />
      ))}
      {events.map((event, index) => (
        <div
          key={index}
          className="absolute left-0 right-0 bg-blue-500 text-white text-xs py-1 px-2 rounded-md"
          style={{ top: `${event.start * 64}px`, height: `${(event.end - event.start) * 64}px` }}
        >
          {event.title}
        </div>
      ))}
    </div>
  </div>
);

const WeekView = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: Event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  return (
    <div className="flex overflow-x-scroll">
      <HourLabels />
      {Array.from({ length: 7 }).map((_, day) => (
        <DayColumn key={day} day={day} events={events.filter((event) => event.day === day)} addEvent={addEvent} />
      ))}
    </div>
  );
};

export default WeekView;