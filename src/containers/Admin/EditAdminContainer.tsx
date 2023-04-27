import { EditAdminComponent } from "components";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import inviteApi from "services/admins";

function EditAdminContainer() {
    const { user_id } = useParams();
    const [user, setUser] = useState();

    const getUserApi = useApi(inviteApi.getUser);
    const editUserApi = useApi(inviteApi.editUser);

    useEffect(() => {
        getUserApi.request(user_id, localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (getUserApi.data !== null) {
            setUser(getUserApi.data);
        }
    }, [getUserApi.loading]);

    const editUser = async (name: string, email: string, role: number) => {
        editUserApi.request(
            user_id,
            name,
            email,
            role,
            localStorage.getItem("token")
        );
    };
    return (
        <div>
            {user && (
                <EditAdminComponent user={user} onClickFunction={editUser} />
            )}
        </div>
    );
}
export default EditAdminContainer;
