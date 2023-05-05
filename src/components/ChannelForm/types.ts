interface channelData{
    name:string,
    alias:string,
    description:string, 
    application_name:string,
    configuration:{}
   
}
export interface ChannelProps {
    applicationId?:number,
    applications?:{[key:number]:any}
    data?:channelData
    onClickFunction:(applicationId:number,
        name:string,
        alias:string,
        description:string, 
        configuration:{[key:string]:any}
    )=>void
    buttonLabel:string
    viewMode:boolean
}