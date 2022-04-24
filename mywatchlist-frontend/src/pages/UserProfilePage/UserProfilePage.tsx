import {useParams} from "react-router-dom";
import UserProfile from "../../components/UserProfile/UserProfile";
import { JWTContext } from "../../security/JWTContext";

const UserProfilePage = () => {
    
    const params = useParams();

    return (
        <JWTContext.Consumer>
            {
                ({jwtInfo, changeJWT}) => (
                    <div className="flex justify-center mx-auto my-10 p-10 w-3/4">
                        <UserProfile username={params.id as string} jwtInfo={jwtInfo} />
                    </div>
                )
            }

        </JWTContext.Consumer>
    )
}

export default UserProfilePage;