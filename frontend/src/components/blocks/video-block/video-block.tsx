import React from 'react';
import { VideoBlock as VideoBlockType } from '../../../types/material.types';
import * as styles from './video-block.module.css';

interface VideoBlockProps {
    block: VideoBlockType;
}

const getVideoId = (url: string, provider: 'youtube' | 'vimeo'): string => {
    if (provider === 'youtube') {
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : '';
    } else if (provider === 'vimeo') {
        const match = url.match(/vimeo\.com\/(?:.*\/)?(?:videos\/)?([0-9]+)/);
        return match ? match[1] : '';
    }
    return '';
};

const getEmbedUrl = (block: VideoBlockType): string => {
    const videoId = getVideoId(block.content.url, block.content.provider);
    const startTime = block.content.startTime || 0;

    if (block.content.provider === 'youtube') {
        return `https://www.youtube.com/embed/${videoId}?start=${startTime}&rel=0`;
    } else if (block.content.provider === 'vimeo') {
        return `https://player.vimeo.com/video/${videoId}#t=${startTime}s`;
    }
    return '';
};

export const VideoBlock: React.FC<VideoBlockProps> = ({ block }) => {
    const embedUrl = getEmbedUrl(block);

    if (!embedUrl) {
        return (
            <div className={styles.error}>
                Неверная ссылка на видео
            </div>
        );
    }

    return (
        <div className={styles.videoBlock}>
            {block.content.title && (
                <h3 className={styles.title}>{block.content.title}</h3>
            )}
            <div className={styles.videoWrapper}>
                <iframe
                    src={embedUrl}
                    title={block.content.title || 'Embedded video'}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
            {block.content.description && (
                <p className={styles.description}>{block.content.description}</p>
            )}
        </div>
    );
}; 