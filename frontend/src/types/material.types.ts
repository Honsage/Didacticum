export interface Author {
    id: string;
    name: string;
    role: string;
}

export type MaterialType = 'test' | 'practice' | 'lecture';


export interface MaterialMetadata {
    id: string; // id-material
    title: string;
    author: Author;
    description: string;
    type: MaterialType;
    duration: number;
    version?: string;
    createdAt: string;
    updatedAt?: string;
    tags?: string[];
    language?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface BaseBlock {
    id: string;
    order: number;
    type: string;
}

export interface HeadingBlock extends BaseBlock {
    type: 'heading';
    content: {
        text: string;
        level: 1 | 2 | 3 | 4 | 5 | 6;
    };
}

export interface TextBlock extends BaseBlock {
    type: 'text';
    content: {
        text: string;
        format?: 'plain' | 'markdown';
    };
}

export interface CodeBlock extends BaseBlock {
    type: 'code';
    content: {
        code: string;
        language: string;
        highlightedLines?: number[];
    };
}

export interface LatexBlock extends BaseBlock {
    type: 'latex';
    content: {
        formula: string;
        displayMode?: boolean;
    };
}

export interface ImageBlock extends BaseBlock {
    type: 'image';
    content: {
        url: string;
        alt?: string;
        caption?: string;
    };
}

export interface QuizBlock extends BaseBlock {
    type: 'quiz';
    content: {
        question: string;
        type: 'single' | 'multiple' | 'input';
        options?: string[];
        correctAnswer: string | string[];
        explanation?: string;
    };
}

export type ContentBlock = 
    | HeadingBlock 
    | TextBlock 
    | CodeBlock
    | LatexBlock 
    | ImageBlock 
    | QuizBlock;

export interface Material {
    metadata: MaterialMetadata;
    blocks?: ContentBlock[];
} 