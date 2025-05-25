import React from 'react';
import { TextBlock } from '../../types/material.types';
import { EditableBlockWrapper } from './base-block';
import * as styles from './edit-blocks.module.css';

interface EditableTextBlockProps {
    block: TextBlock;
    onChange: (block: TextBlock) => void;
    onDelete: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    isDragging?: boolean;
    dragHandleProps?: any;
}

export const EditableTextBlock: React.FC<EditableTextBlockProps> = ({
    block,
    onChange,
    onDelete,
    onMoveUp,
    onMoveDown,
    isDragging,
    dragHandleProps
}) => {
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                text: e.target.value
            }
        });
    };

    const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                format: e.target.value as 'plain' | 'markdown'
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
            <div className={styles.textBlock}>
                <div className={styles.textControls}>
                    <select
                        value={block.content.format || 'plain'}
                        onChange={handleFormatChange}
                        className={styles.textFormat}
                    >
                        <option value="plain">Обычный текст</option>
                        <option value="markdown">Markdown</option>
                    </select>
                </div>
                <textarea
                    value={block.content.text}
                    onChange={handleTextChange}
                    placeholder={
                        block.content.format === 'markdown'
                            ? "Введите текст в формате Markdown..."
                            : "Введите текст..."
                    }
                />
                {block.content.format === 'markdown' && (
                    <div className={styles.markdownHint}>
                        Поддерживается синтаксис Markdown: **жирный**, *курсив*, `код`, # заголовки, - списки
                    </div>
                )}
            </div>
        </EditableBlockWrapper>
    );
}; 