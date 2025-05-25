import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { LatexBlock as LatexBlockType } from '../../../types/material.types';
import * as styles from './latex-block.module.css';

interface LatexBlockProps {
    block: LatexBlockType;
}

const LatexBlock: React.FC<LatexBlockProps> = ({ block }) => {
    const { content } = block;

    const html = katex.renderToString(content.formula, {
        displayMode: content.displayMode,
        throwOnError: false,
        strict: false,
        trust: true,
        macros: {
            '\\RR': '\\mathbb{R}',
            '\\NN': '\\mathbb{N}',
            '\\ZZ': '\\mathbb{Z}',
            '\\CC': '\\mathbb{C}',
            '\\QQ': '\\mathbb{Q}'
        }
    });

    return (
        <div 
            className={`${styles.latex} ${content.displayMode ? styles.display : styles.inline}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default LatexBlock; 