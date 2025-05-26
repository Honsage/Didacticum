import React, { useState } from 'react';
import { QuizBlock as QuizBlockType } from '../../../types/material.types';
import * as styles from './quiz-block.module.css';

interface QuizBlockProps {
    block: QuizBlockType;
}

export const QuizBlock: React.FC<QuizBlockProps> = ({ block }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleOptionChange = (option: string) => {
        if (block.content.type === 'single') {
            setSelectedAnswers([option]);
        } else if (block.content.type === 'multiple') {
            if (selectedAnswers.includes(option)) {
                setSelectedAnswers(selectedAnswers.filter(a => a !== option));
            } else {
                setSelectedAnswers([...selectedAnswers, option]);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const checkAnswer = () => {
        let correct = false;
        if (block.content.type === 'input') {
            correct = userInput.trim().toLowerCase() === (block.content.correctAnswer as string).toLowerCase();
        } else {
            const correctAnswers = Array.isArray(block.content.correctAnswer) 
                ? block.content.correctAnswer 
                : [block.content.correctAnswer];
            
            correct = selectedAnswers.length === correctAnswers.length &&
                selectedAnswers.every(answer => correctAnswers.includes(answer));
        }
        setIsCorrect(correct);
        setIsSubmitted(true);
    };

    const reset = () => {
        setSelectedAnswers([]);
        setUserInput('');
        setIsSubmitted(false);
        setIsCorrect(false);
    };

    return (
        <div className={styles.quizBlock}>
            <div className={styles.question}>{block.content.question}</div>
            
            <div className={styles.answers}>
                {block.content.type === 'input' ? (
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="Введите ваш ответ..."
                        className={styles.inputAnswer}
                        disabled={isSubmitted}
                    />
                ) : block.content.options?.map((option, index) => (
                    <label key={index} className={styles.option}>
                        <input
                            type={block.content.type === 'single' ? 'radio' : 'checkbox'}
                            checked={selectedAnswers.includes(option)}
                            onChange={() => handleOptionChange(option)}
                            disabled={isSubmitted}
                        />
                        <span>{option}</span>
                    </label>
                ))}
            </div>

            {!isSubmitted ? (
                <button 
                    onClick={checkAnswer}
                    className={styles.submitButton}
                    disabled={block.content.type === 'input' ? !userInput : selectedAnswers.length === 0}
                >
                    Проверить
                </button>
            ) : (
                <div className={styles.result}>
                    <div className={isCorrect ? styles.correct : styles.incorrect}>
                        {isCorrect ? 'Правильно!' : 'Неправильно'}
                    </div>
                    {block.content.explanation && (
                        <div className={styles.explanation}>
                            {block.content.explanation}
                        </div>
                    )}
                    <button onClick={reset} className={styles.resetButton}>
                        Попробовать снова
                    </button>
                </div>
            )}
        </div>
    );
}; 