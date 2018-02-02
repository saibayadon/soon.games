// Requires
import axios from 'axios'
import cheerio from 'cheerio'
import moment from 'moment'

// Constants
export const PLATFORMS = {
  "SWITCH": "switch",
  "PS4": "ps4",
  "PC": "pc",
  "3DS": "3ds",
  "XBONE": "xboxone"
}

export const TYPE = {
  "NEW": "new-releases",
  "COMING_SOON": "coming-soon"
}

// Logic
const getBaseUrl = (platform, type) => `https://www.metacritic.com/browse/games/release-date/${type}/${platform}/date?view=detailed`

const parseResponse = (response) => {
  if (response.status !== 200) throw new Error('NOT OK')
  const $ = cheerio.load(response.data)

  let titles = $('#main .list_product_summaries .product').map((i, el) => {
    // Title
    const title = $(el).find('h3 a').text()

    // Date
    const date_str = $(el).find('.release_date .data').text()
    const date = moment.utc(date_str, "MMM Do, YYYY").unix()

    // Image
    const thumbnail = $(el).find('img.small_image').attr('src').replace('-53.jpg', '-98.jpg').replace('53w-game.jpg', '98w-game.jpg')

    // Game URL
    const link = `https://www.metacritic.com${$(el).find('h3 a').attr('href')}`

    return {title, date, link, thumbnail}
  })

  return titles.get().sort((a, b) => a.date - b.date) // Return items sorted by date
}

export const getGames = async (platform = PLATFORMS.SWITCH, type = TYPE.COMING_SOON) => {
  let response = await axios.get(getBaseUrl(platform, type))
  return parseResponse(response)
}
