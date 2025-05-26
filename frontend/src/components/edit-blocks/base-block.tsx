import React from 'react';
import { BaseBlock } from '../../types/material.types';
import * as styles from './edit-blocks.module.css';

interface EditableBlockProps {
    block: BaseBlock;
    onDelete: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    isDragging?: boolean;
    dragHandleProps?: any;
    draggableProps?: any;
    innerRef?: any;
}

export const EditableBlockWrapper: React.FC<React.PropsWithChildren<EditableBlockProps>> = ({
    children,
    onDelete,
    onMoveUp,
    onMoveDown,
    isDragging,
    draggableProps,
    innerRef
}) => {
    return (
        <div 
            ref={innerRef}
            {...draggableProps}
            className={`${styles.blockWrapper} ${isDragging ? styles.dragging : ''}`}
        >
            <div className={styles.blockContent}>
                {children}
            </div>
            <div className={styles.blockControls}>
                <div className={styles.blockActions}>
                    {onMoveUp && (
                        <button 
                            className={styles.actionButton} 
                            onClick={onMoveUp}
                            title="Переместить вверх"
                        >
                            ↑
                        </button>
                    )}
                    {onMoveDown && (
                        <button 
                            className={styles.actionButton} 
                            onClick={onMoveDown}
                            title="Переместить вниз"
                        >
                            ↓
                        </button>
                    )}
                    <button 
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={onDelete}
                        title="Удалить блок"
                    >
                        ×
                    </button>
                </div>
            </div>
        </div>
    );
}; 