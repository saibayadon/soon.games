import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios, { CancelToken } from 'axios';
import classNames from 'classnames';
import { parse, isBefore } from 'date-fns';

// Styles Import
import styles from '../css/app.module.css';

// Components Imports
import Nav from './Nav';
import List from './List';
import DocumentTitle from './DocumentTitle';

// Constants
const API_URL = 'https://api.soon.games';

export const PLATFORMS = {
  switch: 'SWITCH',
  ps5: 'PS5',
  ps4: 'PS4',
  pc: 'PC',
  xbone: 'XBOX ONE X',
  seriesx: 'XBOX SERIES X',
};

export const TYPE = {
  new: 'RECENT RELEASES',
  coming_soon: 'COMING SOON',
};

const ListContainer = props => {
  const { match } = props;
  const { platform, type } = match.params;

  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [cancelFetch, setCancelFetch] = useState({ source: () => {} });

  // eslint-disable-next-line no-shadow
  const fetchGameList = async (platform, type) => {
    try {
      if (fetching && cancelFetch) cancelFetch.source();

      setFetching(true);
      setItems([]);

      const response = await axios.get(
        `${API_URL}?platform=${platform.toUpperCase()}&type=${type.toUpperCase()}`,
        {
          cancelToken: new CancelToken(source => {
            setCancelFetch({ source });
          }),
        },
      );

      let responseItems = response.data.sort((a, b) => a.date - b.date);

      // Return only "old" games on the new releases section
      if (type === 'new') {
        responseItems = responseItems.filter(game => {
          return isBefore(
            parse(
              game.date,
              'X',
              new Date().toLocaleString('en-US', {
                timeZone: 'America/New_York',
              }),
            ),
            new Date().toLocaleString('en-US', {
              timeZone: 'America/New_York',
            }),
          );
        });
      }

      setFetching(false);
      setError(null);
      setItems(type === 'new' ? responseItems.reverse() : responseItems);
    } catch (e) {
      if (axios.isCancel(e)) {
        return;
      }

      setFetching(false);
      setError(e);
      setItems([]);
    }
  };

  useEffect(() => {
    if (PLATFORMS[platform] && TYPE[type]) {
      // Save route as default for subsequent visits.
      window.localStorage.setItem('defaultRoute', `/${platform}/${type}`);

      // Fetch data.
      fetchGameList(platform, type);
    }
  }, [platform, type]);

  const sectionInfo = `${PLATFORMS[platform]} - ${TYPE[type]}`;

  return (
    <div className={classNames(styles[platform], styles.wrapper)}>
      <DocumentTitle title={sectionInfo} />
      <Nav platforms={PLATFORMS} types={TYPE} />
      <h1 className={styles.title}>{sectionInfo}</h1>
      {fetching ? (
        <p className={classNames(styles.loading, styles.list)}> loading... </p>
      ) : null}
      {fetching ? null : <List items={items} />}
      {error ? (
        <p className={styles.error}>
          {' '}
          Thank You Mario, But Our Princess is in Another Castle (
          {error.message}){' '}
        </p>
      ) : null}
      <footer>
        <p>
          all times shown are est - all information is scraped from{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://metacritic.com"
          >
            metacritic
          </a>
          .
          <br />
          crafted in the warm winter of atx by{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://twitter.com/saibayadon"
          >
            @saibayadon
          </a>
        </p>
      </footer>
    </div>
  );
};

export default withRouter(ListContainer);
