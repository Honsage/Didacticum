import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import HeadingBlock from '../../components/blocks/heading-block/heading-block';
import TextBlock from '../../components/blocks/text-block/text-block';
import CodeBlock from '../../components/blocks/code-block/code-block';
import LatexBlock from '../../components/blocks/latex-block/latex-block';
import ImageBlock from '../../components/blocks/image-block/image-block';
import { QuizBlock } from '../../components/blocks/quiz-block/quiz-block';
import { VideoBlock } from '../../components/blocks/video-block/video-block';
import { AUTH_NAVIGATION } from '../../constants/navigation';
import { useDispatch } from '../../hooks/useDispatch';
import { useSelector } from '../../hooks/useSelector';
import { logout } from '../../store/slices/user.slice';
import { materialsService } from '../../services/storage/materials.service';
import { readFromFile } from '../../utils/ilm.utils';
import { ContentBlock, Material } from '../../types/material.types';
import * as styles from './viewer.module.css';
import * as headerStyles from '../../components/header/header.module.css';

const ViewerPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [material, setMaterial] = useState<Material | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const dispatch = useDispatch();
    const { profile, auth } = useSelector(state => state.user);
    const isAuthenticated = !!auth.token && !!auth.expiresAt && Date.now() < auth.expiresAt;

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        const loadMaterial = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                const loadedMaterial = await materialsService.getMaterialById(id);
                setMaterial(loadedMaterial);
                setError(null);
            } catch (err) {
                console.error('Ошибка при загрузке материала:', err);
                setError('Не удалось загрузить материал');
            } finally {
                setLoading(false);
            }
        };

        loadMaterial();
    }, [id]);

    const handleFileUpload = useCallback(async (file: File) => {
        if (!file.name.endsWith('.ilm')) {
            setError('Пожалуйста, выберите файл с расширением .ilm');
            return;
        }

        try {
            setLoading(true);
            const loadedMaterial = await readFromFile(file);
            setMaterial(loadedMaterial);
            setError(null);
        } catch (err) {
            console.error('Ошибка при чтении файла:', err);
            setError('Не удалось прочитать файл. Убедитесь, что это корректный .ilm файл');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(file);
            // Очищаем input для возможности повторной загрузки того же файла
            event.target.value = '';
        }
    }, [handleFileUpload]);

    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileUpload(file);
        }
    }, [handleFileUpload]);

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
            case 'quiz':
                return <QuizBlock key={block.id} block={block} />;
            case 'video':
                return <VideoBlock key={block.id} block={block} />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <Header 
                rightContent={
                    <div className={headerStyles.auth}>
                        {isAuthenticated ? (
                            <>
                                <span className={headerStyles.userName}>
                                    {profile?.firstName}
                                </span>
                                <Link 
                                    to="/profile" 
                                    className={headerStyles.userAvatar}
                                    title="Перейти в профиль"
                                >
                                    {profile?.firstName?.charAt(0).toUpperCase()}
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className={headerStyles.logoutButton}
                                >
                                    Выйти
                                </button>
                            </>
                        ) : (
                            AUTH_NAVIGATION.map(item => (
                                <Link 
                                    key={item.path}
                                    to={item.path} 
                                    className={`${headerStyles.authLink} ${
                                        item.path === '/signup' ? headerStyles.register : ''
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))
                        )}
                    </div>
                }
            />
            
            <main className={styles.main}>
                <div className={styles.content}>
                    {loading ? (
                        <div className={styles.loading}>Загрузка...</div>
                    ) : error ? (
                        <div className={styles.error}>{error}</div>
                    ) : !material && !id ? (
                        <div 
                            className={`${styles.uploadSection} ${isDragging ? styles.dragging : ''}`}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <h2>Загрузите материал для просмотра</h2>
                            <p>Перетащите файл .ilm сюда или нажмите для выбора</p>
                            <label className={styles.uploadButton}>
                                Выбрать файл
                                <input
                                    type="file"
                                    accept=".ilm"
                                    onChange={handleInputChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                    ) : material ? (
                        <>
                            <div className={styles.header}>
                                {material.metadata.author && (
                                    <p className={styles.author}>{material.metadata.author.name}</p>
                                )}
                                <h1 className={styles.title}>{material.metadata.title}</h1>
                                <div className={styles.metablock}>
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
                                    {material.metadata.description && (
                                        <p className={styles.description}>{material.metadata.description}</p>
                                    )}
                                </div>
                            </div>
                            <div className={styles.blocks}>
                                {material.blocks?.map(renderBlock)}
                            </div>
                        </>
                    ) : (
                        <div className={styles.error}>Материал не найден</div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ViewerPage; 