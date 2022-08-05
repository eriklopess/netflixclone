const API_KEY = '18c95fdf57bfc2df89087cc2e44fbb7e'
const API_BASE = 'https://api.themoviedb.org/3'

const basicFetch = async (endpoint) => {
    const res = await fetch(`${API_BASE}${endpoint}`)
    const json = await res.json() 
    return json 
} 

export default async function getHomeList() {
    return [
        {
            slug: 'originals',
            title: 'Originais do Netflix',
            items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'trending',
            title: 'Recomendados para você',
            items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'toprated',
            title: 'Em alta',
            items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'action',
            title: 'Ação',
            items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'comedy',
            title: 'Comédia',
            items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'horror',
            title: 'Terror',
            items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'romance',
            title: 'Romance',
            items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'documentary',
            title: 'Documentários',
            items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
        },
    ]
}

export async function getMovieInfo(movieId, type) {
    let info = {};

    if(movieId) {
        if(type === 'movie') {
            info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
        }

        if(type === 'tv') {
            info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
        }
    }
    return info;
}