import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import HeadingBlock from '../../components/blocks/heading-block/heading-block';
import TextBlock from '../../components/blocks/text-block/text-block';
import CodeBlock from '../../components/blocks/code-block/code-block';
import LatexBlock from '../../components/blocks/latex-block/latex-block';
import ImageBlock from '../../components/blocks/image-block/image-block';
import { materialsService } from '../../services/storage/materials.service';
import { ContentBlock, Material } from '../../types/material.types';
import * as styles from './viewer.module.css';

const ViewerPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [material, setMaterial] = useState<Material | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMaterial = async () => {
            if (!id) {
                setError('ID материала не указан');
                setLoading(false);
                return;
            }

            try {
                const loadedMaterial = await materialsService.getMaterialById(id);
                if (!loadedMaterial) {
                    setError('Материал не найден');
                } else {
                    setMaterial(loadedMaterial);
                }
            } catch (err) {
                setError('Ошибка при загрузке материала');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadMaterial();
    }, [id]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error || !material) {
        return <div>{error}</div>;
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