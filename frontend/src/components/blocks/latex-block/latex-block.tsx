import React from 'react';
import { LatexBlock as LatexBlockType } from '../../../types/material.types';
import * as styles from './latex-block.module.css';

interface LatexBlockProps {
    block: LatexBlockType;
}

const LatexBlock: React.FC<LatexBlockProps> = ({ block }) => {
    const { content } = block;

    // TODO: Add proper LaTeX rendering library (e.g., KaTeX or MathJax)
    return (
        <div className={`${styles.latex} ${content.displayMode ? styles.display : styles.inline}`}>
            {content.formula}
        </div>
    );
};

export default LatexBlock; 