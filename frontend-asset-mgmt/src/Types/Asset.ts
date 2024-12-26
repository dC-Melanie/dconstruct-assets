export interface Asset {
    id?: number;              // Optional id
    name: string;
    filePath: string;
    category: string;
    description: string;
    date: string;
    owner: string;
    fileType: string;
    comments?: string;        // Optional comments
}
