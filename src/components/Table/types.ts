import { ReactNode } from "react"

interface Table{
    headingFields:string[]
    deleteInvitation?:(user_id: number, application_id: number) => Promise<void>,
    handleEdit?:(user_id: number) => Promise<void>
}

export interface TableRowProps extends Table{
    data:{
        [key:string]:any
    }
}

export interface TableProps extends Table{
    dataFields:{
        [key:string]:any
    }[]
}