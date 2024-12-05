import React, { createContext, ReactNode, useState } from "react";
import { MovieDetails } from "../services/types";

interface MovieContextType {
  allMovies: MovieDetails[],
  setAllMovies: React.Dispatch<React.SetStateAction<MovieDetails[]>>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider = ({ children }: MovieProviderProps) => {
    const [allMovies, setAllMovies] = useState<MovieDetails[]>([]);

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

