export interface Asset {
    id?: number;
    name: string;
    filePath: string;
    category: string;  // or use a union type if you have predefined categories
}