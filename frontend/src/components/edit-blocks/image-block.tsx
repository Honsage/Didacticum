import React, { useRef } from 'react';
import { ImageBlock } from '../../types/material.types';
import { EditableBlockWrapper } from './base-block';
import * as styles from './edit-blocks.module.css';

interface EditableImageBlockProps {
    block: ImageBlock;
    onChange: (block: ImageBlock) => void;
    onDelete: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    isDragging?: boolean;
    dragHandleProps?: any;
}

export const EditableImageBlock: React.FC<EditableImageBlockProps> = ({
    block,
    onChange,
    onDelete,
    onMoveUp,
    onMoveDown,
    isDragging,
    dragHandleProps
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            // Convert to base64 for now, later we'll implement proper file upload
            const reader = new FileReader();
            reader.onload = () => {
                onChange({
                    ...block,
                    content: {
                        ...block.content,
                        url: reader.result as string
                    }
                });
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Failed to read image:', error);
        }
    };

    const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                caption: e.target.value
            }
        });
    };

    const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                alt: e.target.value
            }
        });
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (!file || !file.type.startsWith('image/')) return;

        try {
            const reader = new FileReader();
            reader.onload = () => {
                onChange({
                    ...block,
                    content: {
                        ...block.content,
                        url: reader.result as string
                    }
                });
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Failed to read image:', error);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
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
            <div className={styles.imageBlock}>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                {!block.content.url ? (
                    <div
                        className={styles.imageUpload}
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <p>Нажмите для загрузки изображения или перетащите файл сюда</p>
                    </div>
                ) : (
                    <>
                        <img
                            src={block.content.url}
                            alt={block.content.alt || 'Uploaded image'}
                            className={styles.imagePreview}
                        />
                        <div className={styles.imageControls}>
                            <input
                                type="text"
                                value={block.content.alt || ''}
                                onChange={handleAltChange}
                                placeholder="Alt-текст для изображения..."
                                className={styles.imageAlt}
                            />
                            <input
                                type="text"
                                value={block.content.caption || ''}
                                onChange={handleCaptionChange}
                                placeholder="Подпись к изображению..."
                                className={styles.imageCaption}
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className={styles.imageReplace}
                            >
                                Заменить изображение
                            </button>
                        </div>
                    </>
                )}
            </div>
        </EditableBlockWrapper>
    );
}; 