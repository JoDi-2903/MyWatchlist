import {useParams} from "react-router-dom";
import UserProfile from "../../components/UserProfile/UserProfile";

const UserProfilePage = () => {
    
    const params = useParams();

    return (
        <div className="flex justify-center mx-auto my-10 p-10 w-3/4">
            <UserProfile username={params.id as string} />
        </div>
    )
}

export default UserProfilePage;