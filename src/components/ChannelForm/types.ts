interface EmailConf{
    MAIL_USERNAME: string,
    MAIL_PASSWORD: string,
    MAIL_FROM: string,
    MAIL_PORT: number,
    MAIL_SERVER: string,
    USE_CREDENTIALS: number,
    MAIL_STARTTLS: number,
    MAIL_SSL_TLS: number
}
interface channelData{
    name:string,
    alias:string,
    description:string, 
    application_name:string,
    configuration:EmailConf
   
}
export interface ChannelProps {
    applicationId?:number,
    applications?:{[key:number]:any}
    data?:channelData
    onClickFunction:(applicationId:number,
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
        MAIL_SSL_TLS: number
    )=>void
    buttonLabel:string
}