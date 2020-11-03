import React from 'react';

// Styles
import styles from '../css/app.module.css';

// Components
import ListItem from './ListItem';

const List = (props) => {
  const { items } = props;

  if (items.length === 0) {
    return (
      <ul className={styles.list}>
        <li>
          <p>no games found</p>
        </li>
      </ul>
    );
  }

  const itemsElements = items.map((item, index) => {
    return (
      <ListItem
        // eslint-disable-next-line react/no-array-index-key
        key={item.title + index}
        title={item.title}
        date={item.date}
        link={item.link}
        thumbnail={item.thumbnail}
      />
    );
  });

  return <ul className={styles.list}>{itemsElements}</ul>;
};

export default List;
