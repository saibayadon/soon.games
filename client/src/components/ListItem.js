import React from 'react';
import { parse, formatDistanceStrict, endOfDay } from 'date-fns';

// Styles
import styles from '../css/app.module.css';

const ListItem = (props) => {
  const { title, link, date } = props;

  const parsedDate = formatDistanceStrict(
    endOfDay(
      parse(
        date,
        'X',
        new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      ),
    ),
    new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
    { addSuffix: true },
  );

  const metacritic = link;
  const youtube = `https://www.youtube.com/results?search_query=${title} trailer`;

  return (
    <li>
      <span className={styles['game-title']}>{title}</span>{' '}
      <span className={styles.highlight}>{parsedDate}</span> -{' '}
      <a target="_blank" rel="noopener noreferrer" href={metacritic}>
        info
      </a>{' '}
      /{' '}
      <a target="_blank" rel="noopener noreferrer" href={youtube}>
        youtube
      </a>
    </li>
  );
};

export default ListItem;
