// Requires
import { PLATFORMS, TYPE, getGames } from './scraper';
import moment from 'moment';

// In-memory cache (Useful for burst of multiple requests when the lambda instance is still hot)
const cache = {date: moment(), data: new Map()};

// Handler
export const scrape = async (event = {}, context = {}, callback = () => {}) => {
  // Generate the chache key + parameters for the scraper.
  let platform = (event && event.queryStringParameters) ? PLATFORMS[event.queryStringParameters.platform || "SWITCH"] : PLATFORMS.SWITCH;
  let type = (event && event.queryStringParameters) ? TYPE[event.queryStringParameters.type || "NEW"] : TYPE.NEW;
  let key = `${platform}-${type}`;

  // Check cache. Invalidate if it's older than 1 day or data is not there.
  if (cache.date.isBefore(cache.date.clone().add(1, 'days')) && cache.data.has(key)) {
    console.log(`${cache.date.format('X')}: Retrieved ${key} from cache.`);
    callback(null, {"statusCode": 200, "body": JSON.stringify(cache.data.get(key)), "headers": {"Access-Control-Allow-Origin": "*"}});
  } else {
    try {
      // Get the data
      let games = await getGames(platform, type);

      // Store cache + log.
      cache.data.set(key, games);
      console.log(`${cache.date.format('X')}: Retrieved ${key} from network.`);

      // Return
      callback(null, {"statusCode": 200, "body": JSON.stringify(games), "headers": {"Access-Control-Allow-Origin": "*"}});
    } catch (e) {
      callback(null, {"statusCode": 500, "body": e.message, "headers": {"Access-Control-Allow-Origin": "*"}});
    }
  }
};
