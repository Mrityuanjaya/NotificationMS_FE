interface Table{
    headingFields:{[key:string]:string}
    deleteFunction?:(...args: any[]) => Promise<void>
    editFunction?:(...args: any[]) => Promise<void>
    viewFunction?:(...args:any[]) => Promise<void>
    deleteFunctionArgs?: string[]
    editFunctionArgs?: string[]
    viewFunctionArgs?: string[]
}

export interface TableRowProps extends Table{
    data:{
        [key:string]:any
    }
}

export interface TableProps extends Table{
    nextFunction?:() => void
    prevFunction?:() => void
    currentPage: number
    totalPages: number
    dataFields:{
        [key:string]:any
    }[]
}