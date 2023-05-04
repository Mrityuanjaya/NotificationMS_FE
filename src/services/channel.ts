import client from "services/client";

const getChannels = async (token:string,page_no:number,records_per_page:number) => client.get(
        `/channels?page_no=${page_no}&records_per_page=${records_per_page}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
const postChannel = (
    applicationId:number,
    name:string,
    alias:string,
    description:string, 
    MAIL_USERNAME: string,
    MAIL_PASSWORD: string,
    MAIL_FROM: string,
    MAIL_PORT: number,
    MAIL_SERVER: string,
    USE_CREDENTIALS: number,
    MAIL_STARTTLS: number,
    MAIL_SSL_TLS: number,
    token:string,
    ) => client.post("/channel", 
    {
        application_id:applicationId,
        name:name,
        alias:alias,
        description:description, 
        type:1,
        configuration:{
            "MAIL_USERNAME": MAIL_USERNAME,
            "MAIL_PASSWORD": MAIL_PASSWORD,
            "MAIL_FROM": MAIL_FROM,
            "MAIL_PORT": MAIL_PORT,
            "MAIL_SERVER": MAIL_SERVER,
            "USE_CREDENTIALS": USE_CREDENTIALS,
            "MAIL_STARTTLS": MAIL_STARTTLS,
            "MAIL_SSL_TLS": MAIL_SSL_TLS
        }
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

const updateChannel=async(
    alias:string,
    name:string,
    description:string, 
    MAIL_USERNAME: string,
    MAIL_PASSWORD: string,
    MAIL_FROM: string,
    MAIL_PORT: number,
    MAIL_SERVER: string,
    USE_CREDENTIALS: number,
    MAIL_STARTTLS: number,
    MAIL_SSL_TLS: number,
    token:string,)=>{
        const url="/channel/"+alias;
        return await client.patch(url,{
            name:name,
            description:description, 
            configuration:{
                "MAIL_USERNAME": MAIL_USERNAME,
                "MAIL_PASSWORD": MAIL_PASSWORD,
                "MAIL_FROM": MAIL_FROM,
                "MAIL_PORT": MAIL_PORT,
                "MAIL_SERVER": MAIL_SERVER,
                "USE_CREDENTIALS": USE_CREDENTIALS,
                "MAIL_STARTTLS": MAIL_STARTTLS,
                "MAIL_SSL_TLS": MAIL_SSL_TLS
            }
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
const getChannel=async(alias:string,token:string)=>client.get("/channel/"+alias,
{
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

const deleteChannel=async(alias:string,token:string)=>client.delete("/channel/"+alias,
{
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export default { getChannels, postChannel,updateChannel,getChannel,deleteChannel };
