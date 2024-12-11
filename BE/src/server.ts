import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { Movie, MovieDetails } from './types/types';

const app = express();
const port = 3000;
// data
let allMovieDetails: MovieDetails[] = [];  

app.use(cors());

export interface MovieListResponse {
    currentPage: number;
    totalPages: number;
    items: Movie[];
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
    
            const detailsPromises = movies.map((movie) => {
              return getMovieDetails(movie.slug);
            })
    
            const details = await Promise.all(detailsPromises);

            if (!movies || movies.length === 0) {
                break;
            }

            allMovieDetails = [...allMovieDetails, ...details];

            if (currentPage >= response.data.totalPages) {
                const endTime = Date.now();
                console.log('Fetching time:', endTime - startTime);
                break;
            }

            currentPage++;
        }

        console.log("Movies fetched successfully:", allMovieDetails.length);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

fetchMovies();

app.get('/api/movies', (req, res) => {
    if (allMovieDetails.length > 0) {
        res.json({
            status: "success",
            message: "Fetching complete",
            data: allMovieDetails
        });
    } else {
        res.status(500).json({ message: 'Movies not fetched yet' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
