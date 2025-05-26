import React, { useState } from 'react';
import { QuizBlock } from '../../types/material.types';
import { EditableBlockWrapper } from './base-block';
import * as styles from './edit-blocks.module.css';

interface EditableQuizBlockProps {
    block: QuizBlock;
    onChange: (block: QuizBlock) => void;
    onDelete: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    isDragging?: boolean;
    dragHandleProps?: any;
}

export const EditableQuizBlock: React.FC<EditableQuizBlockProps> = ({
    block,
    onChange,
    onDelete,
    onMoveUp,
    onMoveDown,
    isDragging,
    dragHandleProps
}) => {
    const [newOption, setNewOption] = useState('');

    const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                question: e.target.value
            }
        });
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value as QuizBlock['content']['type'];
        onChange({
            ...block,
            content: {
                ...block.content,
                type,
                options: type === 'input' ? undefined : (block.content.options || []),
                correctAnswer: type === 'multiple' ? [] : ''
            }
        });
    };

    const handleAddOption = () => {
        if (newOption.trim() && block.content.options) {
            onChange({
                ...block,
                content: {
                    ...block.content,
                    options: [...block.content.options, newOption.trim()]
                }
            });
            setNewOption('');
        }
    };

    const handleRemoveOption = (index: number) => {
        if (block.content.options) {
            const newOptions = [...block.content.options];
            newOptions.splice(index, 1);
            onChange({
                ...block,
                content: {
                    ...block.content,
                    options: newOptions,
                    correctAnswer: Array.isArray(block.content.correctAnswer)
                        ? block.content.correctAnswer.filter(answer => newOptions.includes(answer))
                        : block.content.correctAnswer
                }
            });
        }
    };

    const handleCorrectAnswerChange = (option: string) => {
        if (block.content.type === 'multiple') {
            const currentAnswers = Array.isArray(block.content.correctAnswer)
                ? block.content.correctAnswer
                : [];
            
            const newAnswers = currentAnswers.includes(option)
                ? currentAnswers.filter(answer => answer !== option)
                : [...currentAnswers, option];

            onChange({
                ...block,
                content: {
                    ...block.content,
                    correctAnswer: newAnswers
                }
            });
        } else {
            onChange({
                ...block,
                content: {
                    ...block.content,
                    correctAnswer: option
                }
            });
        }
    };

    const handleInputAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                correctAnswer: e.target.value
            }
        });
    };

    const handleExplanationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({
            ...block,
            content: {
                ...block.content,
                explanation: e.target.value
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
            <div className={styles.quizBlock}>
                <div className={styles.field}>
                    <label>Вопрос:</label>
                    <textarea
                        value={block.content.question}
                        onChange={handleQuestionChange}
                        placeholder="Введите вопрос..."
                        rows={2}
                    />
                </div>

                <div className={styles.field}>
                    <label>Тип вопроса:</label>
                    <select value={block.content.type} onChange={handleTypeChange}>
                        <option value="single">Один вариант ответа</option>
                        <option value="multiple">Несколько вариантов ответа</option>
                        <option value="input">Ввод текста</option>
                    </select>
                </div>

                {block.content.type !== 'input' && (
                    <div className={styles.field}>
                        <label>Варианты ответов:</label>
                        <div className={styles.optionsList}>
                            {block.content.options?.map((option, index) => (
                                <div key={index} className={styles.optionItem}>
                                    <label className={styles.optionLabel}>
                                        <input
                                            type={block.content.type === 'single' ? 'radio' : 'checkbox'}
                                            checked={Array.isArray(block.content.correctAnswer)
                                                ? block.content.correctAnswer.includes(option)
                                                : block.content.correctAnswer === option
                                            }
                                            onChange={() => handleCorrectAnswerChange(option)}
                                        />
                                        <span>{option}</span>
                                    </label>
                                    <button
                                        onClick={() => handleRemoveOption(index)}
                                        className={styles.removeButton}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            ))}
                            <div className={styles.addOption}>
                                <input
                                    type="text"
                                    value={newOption}
                                    onChange={(e) => setNewOption(e.target.value)}
                                    placeholder="Новый вариант ответа..."
                                />
                                <button
                                    onClick={handleAddOption}
                                    disabled={!newOption.trim()}
                                    className={styles.addButton}
                                >
                                    Добавить
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {block.content.type === 'input' && (
                    <div className={styles.field}>
                        <label>Правильный ответ:</label>
                        <input
                            type="text"
                            value={block.content.correctAnswer as string}
                            onChange={handleInputAnswerChange}
                            placeholder="Введите правильный ответ..."
                        />
                    </div>
                )}

                <div className={styles.field}>
                    <label>Объяснение (необязательно):</label>
                    <textarea
                        value={block.content.explanation || ''}
                        onChange={handleExplanationChange}
                        placeholder="Введите объяснение правильного ответа..."
                        rows={2}
                    />
                </div>
            </div>
        </EditableBlockWrapper>
    );
}; 