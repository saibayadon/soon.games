// Requires
import axios from 'axios';
import cheerio from 'cheerio';
import moment from 'moment';

// Constants
export const PLATFORMS = {
    "SWITCH": "switch",
    "PS4": "ps4",
    "PC": "pc",
    "3DS": "3ds",
    "XBONE": "xboxone"
};

export const TYPE = {
    "NEW": "available",
    "COMING_SOON": "coming-soon"
};

// Logic
const getBaseUrl = (platform, type) => `https://www.metacritic.com/browse/games/release-date/${type}/${platform}/date?view=detailed`;

const parseResponse = (response) => {
    if (response.status !== 200) throw new Error('NOT OK')
    const $ = cheerio.load(response.data);

    let titles = $('#main_content .browse_list_wrapper .clamp-summary-wrap').map((i, el) => {
        // Title
        const title = $(el).find('h3').text().trim();

        // Date
        const date_str = $(el).find('.clamp-details > span').text();
        const date = moment.utc(date_str, "MMM Do, YYYY").unix();

        // Game URL
        const link = `https://www.metacritic.com${$(el).find('a.title').attr('href')}`;

        return { title, date, link };
    })

    return titles.get();
};

export const getGames = async (platform = PLATFORMS.SWITCH, type = TYPE.COMING_SOON) => {
    let games = await axios.get(getBaseUrl(platform, type));
    return parseResponse(games);
};
