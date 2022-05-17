import { useParams } from "react-router-dom";
import MovieDetails from "../../components/Details/MovieDetails";


const MoviePage = () => {
    const params = useParams();

    return <MovieDetails id={parseInt(params.id as string)} type='movie' />;
};

export default MoviePage;