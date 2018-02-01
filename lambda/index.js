// Requires
import { PLATFORMS, TYPE, getGames } from './scraper'

// Handler
exports.scrape = async (event, context, callback) => {
  let platform = event && event.queryStringParameters ? PLATFORMS[event.queryStringParameters.platform || PLATFORMS.SWITCH] : PLATFORMS.SWITCH
  let type = event && event.queryStringParameters ? TYPE[event.queryStringParameters.type || TYPE.NEW] : TYPE.NEW

  try {
    let games = await getGames(platform, type)
    callback(null, { "statusCode": 200, "body": JSON.stringify(games), "headers": {"Access-Control-Allow-Origin": "*"} })
  } catch (e) {
    callback(null, { "statusCode": 500, "body": e.message, "headers": {"Access-Control-Allow-Origin": "*"} })
  }
}
