import React, { createContext, ReactNode, useState } from "react";
import { Movie } from "../services/types";

interface MovieContextType {
  allMovies: Movie[],
  setAllMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider = ({ children }: MovieProviderProps) => {
    const [allMovies, setAllMovies] = useState<Movie[]>([]);

    return(
        <MovieContext.Provider value = {{allMovies, setAllMovies}}>
            {children}
        </MovieContext.Provider>
    )
}

export const useMovies = () => {
    const context = React.useContext(MovieContext);
    if (!context){
        throw new Error("useMovies must be used within a MovieProvider!!")
    }
    return context;
}

