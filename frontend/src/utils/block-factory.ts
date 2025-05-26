import { ContentBlock, HeadingBlock, TextBlock, LatexBlock, ImageBlock, QuizBlock, VideoBlock } from '../types/material.types';

export const createBlock = (type: ContentBlock['type']): ContentBlock => {
    const baseBlock = {
        id: crypto.randomUUID(),
        order: 0
    };

    switch (type) {
        case 'heading':
            return {
                ...baseBlock,
                type: 'heading',
                content: {
                    text: '',
                    level: 2
                }
            };
        case 'text':
            return {
                ...baseBlock,
                type: 'text',
                content: {
                    text: '',
                    format: 'plain'
                }
            };
        case 'latex':
            return {
                ...baseBlock,
                type: 'latex',
                content: {
                    formula: '',
                    displayMode: true
                }
            };
        case 'image':
            return {
                ...baseBlock,
                type: 'image',
                content: {
                    url: '',
                    alt: '',
                    caption: ''
                }
            };
        case 'quiz':
            return {
                ...baseBlock,
                type: 'quiz',
                content: {
                    question: '',
                    type: 'single',
                    options: [],
                    correctAnswer: ''
                }
            };
        case 'video':
            return {
                ...baseBlock,
                type: 'video',
                content: {
                    url: '',
                    provider: 'youtube',
                    startTime: 0
                }
            };
        default:
            throw new Error(`Unsupported block type: ${type}`);
    }
}; 