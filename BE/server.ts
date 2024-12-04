import express from 'express';
import axios, { all, AxiosInstance } from 'axios';

const app = express();
const port = 3000;

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

app.get('/api/movies', async (req, res) => {
    let allMovies: Movie[] = [];
    let currentPage = 1;
  
    const startTime = Date.now();
  
    try {
      while (true) {
        console.log("fetching page: ", currentPage)
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
  
      res.json({
        status: "success",
        message: "Fetching complete",
        data: allMovies
      });
      console.log("Fetched successfully: ", allMovies.length);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ message: 'Error fetching movies' });
    }
  });
  
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
