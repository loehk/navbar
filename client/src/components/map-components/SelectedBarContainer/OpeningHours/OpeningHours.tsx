import styles from './OpeningHours.module.scss';

export default function OpeningHours({ weekday_text }: { weekday_text?: string[] }) {
  const dayNames: string[] = [];
  const times: string[] = [];

  if (!weekday_text) {
    dayNames.push('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
    times.push(...Array(7).fill('Closed'));
  } else {
    for (const text of weekday_text) {
      const [day, ...time] = text.split(' ');
      dayNames.push(day.slice(0, -1));
      times.push(time.join(' '));
    }
  }

  return (
    <div className={styles.OpeningHours}>
      <ul className={styles.dayName}>
        {dayNames.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <ul className={styles.dayTime}>
        {times.map((time, i) => (
          <li key={i} className={time === 'Closed' ? styles.closed : ''}>
            {time}
          </li>
        ))}
      </ul>
    </div>
  );
}
