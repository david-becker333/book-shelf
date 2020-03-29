
export interface ICover {
    large?: string;
    small?: string;
}
export interface IBook {
    id?: number;
    cover?: ICover;
    title?: string;
    author?: string;
    releaseDate?: string;
    pages?: number;
    link?: string;
}

export interface IBookQuery {
   sort?: string;
   offset?: number;
   limit?: number;
}

export interface ISelectItem {
   label: string;
   value: any;
}