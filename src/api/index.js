import LRUCache from "lru-cache";
const API_KEY = "18c95fdf57bfc2df89087cc2e44fbb7e";
const API_BASE = "https://api.themoviedb.org/3";

async function basicFetch(endpoint) {
  const requestUrl = `${API_BASE}${endpoint}`;
  const response = await fetch(requestUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${requestUrl}`);
  }

  const data = await response.json();
  return data;
}

const cache = new LRUCache({
  max: 100,
  maxAge: 5 * 60 * 1000, // 5 minutos
  async load(key) {
    return basicFetch(key);
  },
});

export default async function getHomeList() {
  const fetches = [
    {
      slug: 'originals',
      title: 'Originais do Netflix',
      url: `/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`,
    },
    {
      slug: 'trending',
      title: 'Recomendados para você',
      url: `/trending/all/week?language=pt-BR&api_key=${API_KEY}`,
    },
    {
      slug: 'toprated',
      title: 'Em alta',
      url: `/movie/top_rated?language=pt-BR&api_key=${API_KEY}`,
    },
    {
      slug: 'action',
      title: 'Ação',
      url: `/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`,
    },
    {
      slug: 'comedy',
      title: 'Comédia',
      url: `/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`,
    },
    {
      slug: 'horror',
      title: 'Terror',
      url: `/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`,
    },
    {
      slug: 'romance',
      title: 'Romance',
      url: `/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`,
    },
    {
      slug: 'documentary',
      title: 'Documentários',
      url: `/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`,
    },
  ];

  const requests = fetches.map((fetch) => cache.get(fetch.url));
  if(!requests[0]){
    fetches.forEach((fetch) => cache.set(fetch.url, fetch));
  }
  const data = requests.map(async (result) => ({
    slug: result.slug,
    title: result.title,
    items: await basicFetch(result.url),
  }));
  return Promise.all(data).then((result) => {
    return result;
  });
}

export async function getMovieInfo(movieId, type) {
  let info = {};

  switch (type) {
    case 'movie':
      info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
      break;
    case 'tv':
      info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
      break;
    default:
      info = null;
      break;
  }
  return info;
}