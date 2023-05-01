export interface DropdownProps{
    initialValue:number
    options:{[key:number]:any}
    onSelect:(key:number)=>void
}