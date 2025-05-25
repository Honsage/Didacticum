import React from 'react';
import { Link } from 'react-router-dom';
import { Material, MaterialType } from '../../types/material.types';
import * as styles from './material-card.module.css';

interface MaterialCardProps {
    material: Material;
}

const getTypeLabel = (type: MaterialType): string => {
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

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
    return (
        <div /*to={`/material/${material.metadata.id}`}*/ className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>{material.metadata.title}</h3>
                <div className={styles.author}>
                    <span className={styles.authorName}>{material.metadata.author.name}</span>
                    <span className={styles.authorPosition}>{material.metadata.author.role}</span>
                </div>
            </div>
            
            <div className={styles.body}>
                <div className={styles.separator} />
                <p className={styles.description}>{material.metadata.description}</p>
            </div>

            <div className={styles.footer}>
                <span className={styles.footerContent}>
                    <span className={styles.type}>{getTypeLabel(material.metadata.type)}</span>
                    <span className={styles.bullet}>•</span>
                    <span className={styles.duration}>{material.metadata.duration} мин</span>
                </span>
            </div>
        </div>
    );
};

export default MaterialCard; 