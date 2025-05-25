import React from 'react';
import { HeadingBlock } from '../../types/material.types';
import { EditableBlockWrapper } from './base-block';
import * as styles from './edit-blocks.module.css';

interface EditableHeadingBlockProps {
    block: HeadingBlock;
    onChange: (block: HeadingBlock) => void;
    onDelete: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    isDragging?: boolean;
    dragHandleProps?: any;
}

export const EditableHeadingBlock: React.FC<EditableHeadingBlockProps> = ({
    block,
    onChange,
    onDelete,
    onMoveUp,
    onMoveDown,
    isDragging,
    dragHandleProps
}) => {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                text: e.target.value
            }
        });
    };

    const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                level: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6
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
            <div className={styles.headingBlock}>
                <div className={styles.headingControls}>
                    <select
                        value={block.content.level}
                        onChange={handleLevelChange}
                        className={styles.headingLevel}
                    >
                        <option value={1}>Заголовок 1</option>
                        <option value={2}>Заголовок 2</option>
                        <option value={3}>Заголовок 3</option>
                        <option value={4}>Заголовок 4</option>
                        <option value={5}>Заголовок 5</option>
                        <option value={6}>Заголовок 6</option>
                    </select>
                </div>
                <input
                    type="text"
                    value={block.content.text}
                    onChange={handleTextChange}
                    placeholder="Введите текст заголовка..."
                    style={{ 
                        fontSize: `${2 - (block.content.level - 1) * 0.2}rem`
                    }}
                />
            </div>
        </EditableBlockWrapper>
    );
}; 