import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
import { ContentBlock, Material } from '../../types/material.types';
import * as styles from './viewer.module.css';
import * as headerStyles from '../../components/header/header.module.css';

const ViewerPage: React.FC = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const [material, setMaterial] = useState<Material | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { profile, auth } = useSelector(state => state.user);

    const isAuthenticated = !!auth.token && !!auth.expiresAt && Date.now() < auth.expiresAt;

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

    const handleLogout = () => {
        dispatch(logout());
    };

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
                    <header className={styles.header}>
                        {material.metadata.author && (
                            <p className={styles.author}>
                                {material.metadata.author.name}
                            </p>
                        )}
                        <h1 className={styles.title}>{material.metadata.title}</h1>
                    </header>

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
                        <div className={styles.description}>
                            {material.metadata.description}
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