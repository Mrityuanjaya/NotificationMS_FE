export type Option= {
    id: number,
    name: string
}
export type InviteProps = {
    onClickFunction: (name:string, email:string, applicationId:number) => Promise<void>
    options:[Option]
}