export interface ButtonProps {
    args: any[];
    handleClick: (...args: any) => Promise<void>;
    disabled:boolean
}