import React from 'react';
import * as styles from './material-card-profile.module.css';
import editIcon from '../../assets/icons/edit.svg';
import trashIcon from '../../assets/icons/trashcan.svg';
import trashOpenIcon from '../../assets/icons/trashcan-open.svg';
import addIcon from '../../assets/icons/add.svg';

interface MaterialCardProfileProps {
    variant: 'material' | 'create';
    title?: string;
    duration?: string;
    type?: string;
    onEdit?: () => void;
    onDelete?: () => void;
    onCreate?: () => void;
}

const MaterialCardProfile: React.FC<MaterialCardProfileProps> = ({
    variant,
    title,
    duration,
    type = 'Лекция',
    onEdit,
    onDelete,
    onCreate
}) => {
    if (variant === 'create') {
        return (
            <div 
                className={`${styles.card} ${styles.createCard}`}
                onClick={onCreate}
                role="button"
                tabIndex={0}
            >
                <img src={addIcon} alt="Create" className={styles.addIcon} />
                <span className={styles.createText}>Создать материал</span>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <span className={styles.type}>{type}</span>
                    <span className={styles.marker}>•</span>
                    {duration && <span className={styles.duration}>{duration}</span>}
                </div>
                <div className={styles.actions}>
                    {onEdit && (
                        <button onClick={onEdit} className={styles.actionButton}>
                            <img src={editIcon} alt="Edit" />
                        </button>
                    )}
                    {onDelete && (
                        <button onClick={onDelete} className={`${styles.actionButton} ${styles.deleteButton}`}>
                            <img src={trashIcon} alt="Delete" className={styles.trashDefault} />
                            <img src={trashOpenIcon} alt="Delete" className={styles.trashHover} />
                        </button>
                    )}
                </div>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
            </div>
        </div>
    );
};

export default MaterialCardProfile; 