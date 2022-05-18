import { useParams } from "react-router-dom";
import TvDetails from "../../components/Details/TvDetails";

const TvPage = () => {
    const params = useParams();

    return <TvDetails id={parseInt(params.id as string)} type='tv'/>;
};

export default TvPage;