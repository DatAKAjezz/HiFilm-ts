import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { MovieDetails } from './types';

const app = express();
const port = 3000;
// data
let allMovies: Movie[] = [];  

app.use(cors());

export interface MovieListResponse {
    currentPage: number;
    totalPages: number;
    items: Movie[];
}

export interface Movie {
    _id: string;
    slug: string;
    name: string;
    origin_name: string;
    thumb_url: string;
    year: string;
    category: string[];
    view: number;
}

const getMovieDetails = async (slug: string): Promise<MovieDetails> => {
    const response = await axios.get(`https://ophim1.com/phim/${slug}`);
    return response.data as MovieDetails;
};

const fetchMovies = async () => {
    let currentPage = 1;
    const startTime = Date.now();

    try {
        while (true) {
            console.log("fetching page: ", currentPage);
            const response = await axios.get<MovieListResponse>(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${currentPage}`);
            const movies = response.data.items;

            if (!movies || movies.length === 0) {
                break;
            }

            allMovies = [...allMovies, ...movies];

            if (currentPage >= response.data.totalPages) {
                const endTime = Date.now();
                console.log('Fetching time:', endTime - startTime);
                break;
            }

            currentPage++;
        }

        console.log("Movies fetched successfully:", allMovies.length);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

fetchMovies();

app.get('/api/movies', (req, res) => {
    if (allMovies.length > 0) {
        res.json({
            status: "success",
            message: "Fetching complete",
            data: allMovies
        });
    } else {
        res.status(500).json({ message: 'Movies not fetched yet' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
