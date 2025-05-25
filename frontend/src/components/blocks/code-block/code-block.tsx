import React from 'react';
import { CodeBlock as CodeBlockType } from '../../../types/material.types';
import * as styles from './code-block.module.css';

interface CodeBlockProps {
    block: CodeBlockType;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ block }) => {
    const { content } = block;

    // TODO: Add syntax highlighting library (e.g., Prism or Highlight.js)
    return (
        <pre className={styles.pre}>
            <code className={`${styles.code} language-${content.language}`}>
                {content.code}
            </code>
        </pre>
    );
};

export default CodeBlock; 