import React from 'react';
import { TextBlock as TextBlockType } from '../../../types/material.types';
import * as styles from './text-block.module.css';

interface TextBlockProps {
    block: TextBlockType;
}

const TextBlock: React.FC<TextBlockProps> = ({ block }) => {
    const { content } = block;

    if (content.format === 'markdown') {
        // TODO: Add markdown support
        return <p className={styles.text}>{content.text}</p>;
    }

    return <p className={styles.text}>{content.text}</p>;
};

export default TextBlock; 