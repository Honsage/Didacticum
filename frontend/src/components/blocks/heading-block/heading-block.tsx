import React, {JSX} from 'react';
import { HeadingBlock as HeadingBlockType } from '../../../types/material.types';
import * as styles from './heading-block.module.css';

interface HeadingBlockProps {
    block: HeadingBlockType;
}

const HeadingBlock: React.FC<HeadingBlockProps> = ({ block }) => {
    const { content } = block;
    const Tag = `h${content.level}` as keyof JSX.IntrinsicElements;

    return (
        <Tag className={styles.heading}>
            {content.text}
        </Tag>
    );
};

export default HeadingBlock; 