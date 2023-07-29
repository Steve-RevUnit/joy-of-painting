import axios from 'axios';
import { API_HEADERS, ARTIST_BY_ID_ROUTE, ARTIST_SEARCH_ROUTE, LEADERBOARD_ROUTE, MY_STATS_ROUTE, PAINTING_BY_ID_ROUTE, PAINTING_CATEGORIES_ROUTE, PAINTING_SEARCH_ROUTE, PIXELATION_BY_ID_ROUTE, PIXELATION_SEARCH_ROUTE, SUBMIT_PIXELATION_ROUTE } from './constants';

export const getAllArtists = async (options = {}) => {
    const res = await axios.post(ARTIST_SEARCH_ROUTE, options, API_HEADERS);
    return res.data?.items || [];
};

export const getOneArtistById = async (id) => {
    const res = await axios.get(ARTIST_BY_ID_ROUTE.replace('{id}', id), API_HEADERS);
    return res.data?.item || {};
};

export const getLeaderboard = async () => {
    const res = await axios.get(LEADERBOARD_ROUTE, API_HEADERS);
    return res.data?.results || [];
};

export const getMyStats = async () => {
    const res = await axios.get(MY_STATS_ROUTE, API_HEADERS);
    return res.data?.item || {};
};

export const getOnePaintingById = async (id) => {
    const res = await axios.get(PAINTING_BY_ID_ROUTE.replace('{id}', id), API_HEADERS);
    return res.data?.item || {};
};

export const getAllPaintings = async (options = {}) => {
    const res = await axios.post(PAINTING_SEARCH_ROUTE, options, API_HEADERS);
    return res.data?.items || [];
};

export const getAllCategories = async () => {
    const res = await axios.get(PAINTING_CATEGORIES_ROUTE, API_HEADERS);
    return res.data?.items || [];
};

export const getOnePixelation = async (id = '44') => {
    const res = await axios.get(PIXELATION_BY_ID_ROUTE.replace('{id}', id), API_HEADERS);
    return res.data?.item || {};
};

export const getAllPixelations = async (options = {}) => {
    const res = await axios.post(PIXELATION_SEARCH_ROUTE, options, API_HEADERS);
    return res.data?.items || [];
};

export const submitPixelation = async (brushstrokes = [], paintingId = '1') => {
    const res = await axios.post(
        SUBMIT_PIXELATION_ROUTE,
        { brushstrokes, paintingId },
        API_HEADERS
    );
    return res.data;
};
