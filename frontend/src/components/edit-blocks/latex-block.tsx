import React, { useState, useEffect } from 'react';
import { LatexBlock } from '../../types/material.types';
import { EditableBlockWrapper } from './base-block';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import * as styles from './edit-blocks.module.css';

interface EditableLatexBlockProps {
    block: LatexBlock;
    onChange: (block: LatexBlock) => void;
    onDelete: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    isDragging?: boolean;
    dragHandleProps?: any;
}

export const EditableLatexBlock: React.FC<EditableLatexBlockProps> = ({
    block,
    onChange,
    onDelete,
    onMoveUp,
    onMoveDown,
    isDragging,
    dragHandleProps
}) => {
    const [error, setError] = useState<string | null>(null);
    const [html, setHtml] = useState<string>('');

    useEffect(() => {
        try {
            const rendered = katex.renderToString(block.content.formula, {
                displayMode: block.content.displayMode,
                throwOnError: true
            });
            setHtml(rendered);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка рендеринга формулы');
        }
    }, [block.content.formula, block.content.displayMode]);

    const handleFormulaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                formula: e.target.value
            }
        });
    };

    const handleDisplayModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                displayMode: e.target.checked
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
            <div className={styles.latexBlock}>
                <div className={styles.latexControls}>
                    <label className={styles.displayModeLabel}>
                        <input
                            type="checkbox"
                            checked={block.content.displayMode}
                            onChange={handleDisplayModeChange}
                        />
                        Отображать как отдельную формулу
                    </label>
                </div>
                <textarea
                    value={block.content.formula}
                    onChange={handleFormulaChange}
                    placeholder="Введите формулу в формате LaTeX..."
                />
                {error ? (
                    <div className={styles.latexError}>
                        {error}
                    </div>
                ) : (
                    <div 
                        className={styles.latexPreview}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                )}
                <div className={styles.latexHint}>
                    Примеры: x^2 + y^2 = z^2, \frac{1}{2}, \sum_{'i=1'}^n i
                </div>
            </div>
        </EditableBlockWrapper>
    );
}; 