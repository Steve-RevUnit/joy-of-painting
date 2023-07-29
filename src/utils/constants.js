export const API_KEY = 'f9344962-9cbb-4b7b-b190-cec7031f412e';
export const API_HEADERS = {
    headers: {
        accept: 'text/plain',
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
    }
};

export const API_BASEPATH = 'https://api.jop.revunit.com';

export const ARTIST_BY_ID_ROUTE = `${API_BASEPATH}/artist/{id}`;
export const ARTIST_SEARCH_ROUTE = `${API_BASEPATH}/artist/search`;

export const LEADERBOARD_ROUTE = `${API_BASEPATH}/leaderboard/general`;

export const MY_STATS_ROUTE = `${API_BASEPATH}/painter/me`;

export const PAINTING_BY_ID_ROUTE = `${API_BASEPATH}/painting/{id}`;
export const PAINTING_SEARCH_ROUTE = `${API_BASEPATH}/painting/search`;
export const PAINTING_CATEGORIES_ROUTE = `${API_BASEPATH}/painting/categories`;

export const PIXELATION_BY_ID_ROUTE = `${API_BASEPATH}/pixelation/{id}`;
export const PIXELATION_SEARCH_ROUTE = `${API_BASEPATH}/pixelation/search`;
export const SUBMIT_PIXELATION_ROUTE = `${API_BASEPATH}/pixelation`;
