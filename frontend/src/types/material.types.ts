export type MaterialType = 'lecture' | 'test' | 'practice';

export interface Author {
    name: string;
    position: string;
}

export interface Material {
    id: string;
    title: string;
    author: Author;
    description: string;
    type: MaterialType;
    duration: number; // в минутах
} 