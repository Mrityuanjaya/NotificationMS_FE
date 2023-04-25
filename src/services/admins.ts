import client from "services/client";
import ROUTES from "constants/routes"

const getAllAdmins = async (token:string) => client.get(ROUTES.ADMIN_ROUTE,{
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const getUser=async(user_id:number,token:string)=>{
    const URL=ROUTES.USER_ROUTE.replace(":user_id",user_id)
    const status=client.get(URL,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return status
}
const inviteUser = async (username: string, email: string, applicationId: string, token: string) => {

    const status = client.post(ROUTES.INVITE_ROUTE, 
        {
        name: username,
        email: email,
        application_id:applicationId}, 
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }, );
    return status;
};

const verifyCode = async (token: string) => {
    const status = client.patch(`/verify?invitation_code=${token}`);
    return status;
};
const editUser=async(user_id:number,name:string,email:string,role:number,token:string)=>{
    const URL=ROUTES.USER_ROUTE.replace(":user_id",user_id)
    const status=client.put(URL,{
        name: name,
        email: email,
        role:role}, 
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },)
    return status
}

const deleteUser=async(user_id:number,application_id:number,token:string)=>{
    const URL=ROUTES.USER_ROUTE.replace(":user_id",user_id)+`?application_id=${application_id}`;
    const status=client.delete(URL,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return status
}

export default { getAllAdmins, inviteUser, verifyCode ,getUser,editUser,deleteUser};

