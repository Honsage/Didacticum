import React from 'react';
import { ImageBlock as ImageBlockType } from '../../../types/material.types';
import * as styles from './image-block.module.css';

interface ImageBlockProps {
    block: ImageBlockType;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ block }) => {
    const { content } = block;

    return (
        <figure className={styles.figure}>
            <img 
                src={content.url} 
                alt={content.alt || content.caption || ''} 
                className={styles.image}
            />
            {content.caption && (
                <figcaption className={styles.caption}>
                    {content.caption}
                </figcaption>
            )}
        </figure>
    );
};

export default ImageBlock; 