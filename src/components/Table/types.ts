interface Table{
    headingFields:string[]
    deleteFunction?:(...args: any[]) => Promise<void>
    editFunction?:(...args: any[]) => Promise<void>
    deleteFunctionArgs?: string[]
    editFunctionArgs?: string[]
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