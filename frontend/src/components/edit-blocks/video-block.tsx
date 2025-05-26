import React from 'react';
import { VideoBlock } from '../../types/material.types';
import { EditableBlockWrapper } from './base-block';
import * as styles from './edit-blocks.module.css';

interface EditableVideoBlockProps {
    block: VideoBlock;
    onChange: (block: VideoBlock) => void;
    onDelete: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    isDragging?: boolean;
    dragHandleProps?: any;
}

export const EditableVideoBlock: React.FC<EditableVideoBlockProps> = ({
    block,
    onChange,
    onDelete,
    onMoveUp,
    onMoveDown,
    isDragging,
    dragHandleProps
}) => {
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                url: e.target.value
            }
        });
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                title: e.target.value
            }
        });
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                description: e.target.value
            }
        });
    };

    const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                provider: e.target.value as 'youtube' | 'vimeo'
            }
        });
    };

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? parseInt(e.target.value) : 0;
        onChange({
            ...block,
            content: {
                ...block.content,
                startTime: value
            }
        });
    };

    return (
        <EditableBlockWrapper
            block={block}
            onDelete={onDelete}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            isDragging={isDragging}
            dragHandleProps={dragHandleProps}
        >
            <div className={styles.videoBlock}>
                <div className={styles.field}>
                    <label>Видео-хостинг:</label>
                    <select 
                        value={block.content.provider} 
                        onChange={handleProviderChange}
                    >
                        <option value="youtube">YouTube</option>
                        <option value="vimeo">Vimeo</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <label>Ссылка на видео:</label>
                    <input
                        type="text"
                        value={block.content.url}
                        onChange={handleUrlChange}
                        placeholder="Вставьте ссылку на видео..."
                    />
                </div>

                <div className={styles.field}>
                    <label>Заголовок (необязательно):</label>
                    <input
                        type="text"
                        value={block.content.title || ''}
                        onChange={handleTitleChange}
                        placeholder="Введите заголовок видео..."
                    />
                </div>

                <div className={styles.field}>
                    <label>Описание (необязательно):</label>
                    <textarea
                        value={block.content.description || ''}
                        onChange={handleDescriptionChange}
                        placeholder="Введите описание видео..."
                        rows={3}
                    />
                </div>

                <div className={styles.field}>
                    <label>Начать с (в секундах):</label>
                    <input
                        type="number"
                        min="0"
                        value={block.content.startTime || 0}
                        onChange={handleStartTimeChange}
                        placeholder="0"
                    />
                </div>
            </div>
        </EditableBlockWrapper>
    );
}; 