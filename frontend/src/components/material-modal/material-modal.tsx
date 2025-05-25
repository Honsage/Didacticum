import React from 'react';
import { Material } from '../../types/material.types';
import closeIcon from '../../assets/icons/close.svg';
import * as styles from './material-modal.module.css';

interface MaterialModalProps {
    material: Material;
    showAuthor?: boolean;
    onClose: () => void;
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

const MaterialModal: React.FC<MaterialModalProps> = ({
    material,
    showAuthor = true,
    onClose,
    onView,
    onEdit,
    onDelete
}) => {
    const { metadata } = material;
    
    const getDifficultyLabel = (difficulty?: string) => {
        switch (difficulty) {
            case 'beginner':
                return 'Начальный';
            case 'intermediate':
                return 'Средний';
            case 'advanced':
                return 'Продвинутый';
            default:
                return 'Не указан';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'lecture':
                return 'Лекция';
            case 'test':
                return 'Тест';
            case 'practice':
                return 'Практика';
            default:
                return type;
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <img 
                    src={closeIcon} 
                    alt="Закрыть" 
                    className={styles.closeIcon}
                    onClick={onClose}
                />

                <div className={styles.header}>
                    <h2 className={styles.title}>{metadata.title}</h2>
                    {showAuthor && metadata.author && (
                        <p className={styles.author}>
                            {metadata.author.name}, {metadata.author.role}
                        </p>
                    )}
                </div>

                <div className={styles.divider} />

                <div className={styles.content}>
                    <p className={styles.description}>{metadata.description}</p>
                    
                    <div className={styles.characteristics}>
                        <div className={styles.characteristic}>
                            <span className={styles.label}>Тип:</span>
                            <span className={styles.value}>{getTypeLabel(metadata.type)}</span>
                        </div>
                        <div className={styles.characteristic}>
                            <span className={styles.label}>Продолжительность:</span>
                            <span className={styles.value}>{metadata.duration} мин</span>
                        </div>
                        <div className={styles.characteristic}>
                            <span className={styles.label}>Уровень:</span>
                            <span className={styles.value}>
                                {getDifficultyLabel(metadata.difficulty)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.actions}>
                        {onEdit && (
                            <button 
                                className={`${styles.button} ${styles.editButton}`}
                                onClick={onEdit}
                            >
                                Редактировать
                            </button>
                        )}
                        {onDelete && (
                            <button 
                                className={`${styles.button} ${styles.deleteButton}`}
                                onClick={onDelete}
                            >
                                Удалить
                            </button>
                        )}
                        {onView && (
                            <button 
                                className={`${styles.button} ${styles.viewButton}`}
                                onClick={onView}
                            >
                                Просмотр
                            </button>
                        )}
                    </div>
                    <button 
                        className={`${styles.button} ${styles.closeButton}`}
                        onClick={onClose}
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MaterialModal; 