// Requires
import { PLATFORMS, TYPE, getGames } from './scraper';
import moment from 'moment';
import cache from './cache';

// Handler
export const scrape = async (event = {}, context = {}, callback = () => {}) => {
    // Generate the chache key + parameters for the scraper.
    let platform = (event && event.queryStringParameters) ? (PLATFORMS[event.queryStringParameters.platform || "SWITCH"] || "switch") : PLATFORMS.SWITCH;
    let type = (event && event.queryStringParameters) ? (TYPE[event.queryStringParameters.type || "NEW"] || "available") : TYPE.NEW;
    let key = `${platform}-${type}`;

    // Get the cache data, if any.
    let cacheData = cache.get(key);

    // Check cache. Invalidate if it's older than 1 day or data is not there.
    if (cacheData && moment().isBefore(moment(cacheData.date, 'X').add(12, 'hours')) && cacheData.data) {
        console.log(`Retrieved ${key} from cache.`);
        callback(null, {"statusCode": 200, "body": JSON.stringify(cacheData.data), "headers": {"Access-Control-Allow-Origin": "*"}});
    } else {
        try {
            // Get the data
            let games = await getGames(platform, type);

            // Store cache + log.
            cache.set(key, games)
            console.log(`Retrieved ${key} from network.`);

            // Return
            callback(null, {"statusCode": 200, "body": JSON.stringify(games), "headers": {"Access-Control-Allow-Origin": "*"}});
        } catch (e) {
            callback(null, {"statusCode": 500, "body": e.message, "headers": {"Access-Control-Allow-Origin": "*"}});
        }
    }
};