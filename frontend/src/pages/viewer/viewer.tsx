import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import HeadingBlock from '../../components/blocks/heading-block/heading-block';
import TextBlock from '../../components/blocks/text-block/text-block';
import CodeBlock from '../../components/blocks/code-block/code-block';
import LatexBlock from '../../components/blocks/latex-block/latex-block';
import ImageBlock from '../../components/blocks/image-block/image-block';
import { LEARNING_MATERIALS } from '../../constants/demo/materials';
import { ContentBlock } from '../../types/material.types';
import * as styles from './viewer.module.css';

const ViewerPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const material = LEARNING_MATERIALS.find(m => m.metadata.id === id);

    if (!material) {
        return <div>Материал не найден</div>;
    }

    const renderBlock = (block: ContentBlock) => {
        switch (block.type) {
            case 'heading':
                return <HeadingBlock key={block.id} block={block} />;
            case 'text':
                return <TextBlock key={block.id} block={block} />;
            case 'code':
                return <CodeBlock key={block.id} block={block} />;
            case 'latex':
                return <LatexBlock key={block.id} block={block} />;
            case 'image':
                return <ImageBlock key={block.id} block={block} />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <Header 
                rightContent={
                    <Link to="/" className={styles.homeLink}>
                        На главную
                    </Link>
                }
            />
            
            <main className={styles.main}>
                <div className={styles.content}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>{material.metadata.title}</h1>
                        {material.metadata.author && (
                            <p className={styles.author}>
                                {material.metadata.author.name}, {material.metadata.author.role}
                            </p>
                        )}
                    </header>

                    <div className={styles.metadata}>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Тип:</span>
                            <span className={styles.metaValue}>
                                {material.metadata.type === 'lecture' ? 'Лекция' : 
                                 material.metadata.type === 'test' ? 'Тест' : 'Практика'}
                            </span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Продолжительность:</span>
                            <span className={styles.metaValue}>{material.metadata.duration} мин</span>
                        </div>
                    </div>

                    <div className={styles.blocks}>
                        {material.blocks?.map(block => renderBlock(block))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ViewerPage; 