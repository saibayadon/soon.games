// Requires
import axios from 'axios';
import * as cheerio from 'cheerio';
import moment from 'moment';

// Constants
export const PLATFORMS = {
    "SWITCH": "nintendo-switch",
    "PS4": "ps4",
    "PS5": "ps5",
    "PC": "pc",
    "XBONE": "xbox-one",
    "SERIESX": "xbox-series-x"
};

export const TYPE = {
    "NEW": "available",
    "COMING_SOON": "coming-soon"
};



// Logic
const getBaseUrl = (platform, type) => {
    if (type === TYPE.COMING_SOON) return `https://www.metacritic.com/browse/game/${platform}/all/all-time/new/?platform=${platform}&releaseType=coming-soon`
    return `https://www.metacritic.com/browse/game/${platform}/all/all-time/new/?platform=${platform}`
}

const parseResponse = (response) => {
    if (response.status !== 200) throw new Error('NOT OK')
    const $ = cheerio.load(response.data);

    let titles = $('.c-productListings_grid .c-finderProductCard').map((i, el) => {
        // Title
        const title = $(el).find('h3').text().trim();

        // Date
        const date_str = $(el).find('.c-finderProductCard_meta').text();
        const date = moment.utc(date_str, "MMM Do, YYYY").unix();

        // Game URL
        const link = `https://www.metacritic.com${$(el).find('a.c-finderProductCard_container').attr('href')}`;

        return { title, date, link };
    })

    return titles.get();
};

export const getGames = async (platform = PLATFORMS.SWITCH, type = TYPE.COMING_SOON) => {
    let games = await axios.get(getBaseUrl(platform, type));
    return parseResponse(games);
};
