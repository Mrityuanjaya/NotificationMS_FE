type User={
    name:string,
    email:string,
    role:number
}

export type EditAdminProps={
    user:User,
    onClickFunction:(name:string,email:string,role:number)=>Promise<void>
}