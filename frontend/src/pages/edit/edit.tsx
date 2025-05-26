import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Material, ContentBlock } from '../../types/material.types';
import { materialsService } from '../../services/storage/materials.service';
import { BlockManager } from '../../components/edit-blocks/block-manager';
import { createBlock } from '../../utils/block-factory';
import { useSelector } from '../../hooks/useSelector';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import * as styles from './edit.module.css';

export const EditPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { profile } = useSelector(state => state.user);
    const [material, setMaterial] = useState<Material | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMaterial = async () => {
            // Проверяем авторизацию
            if (!profile) {
                setError('Необходимо войти в систему');
                setLoading(false);
                navigate('/login');
                return;
            }

            if (id) {
                try {
                    const loadedMaterial = await materialsService.getMaterialById(id);
                    
                    // Проверяем существование материала
                    if (!loadedMaterial) {
                        setError('Материал не найден');
                        setLoading(false);
                        return;
                    }

                    // Проверяем права на редактирование
                    if (loadedMaterial.metadata.author.id !== profile.id) {
                        setError('У вас нет прав на редактирование этого материала');
                        setLoading(false);
                        navigate('/');
                        return;
                    }

                    setMaterial(loadedMaterial);
                } catch (error) {
                    console.error('Failed to load material:', error);
                    setError('Ошибка при загрузке материала');
                }
            } else {
                // Проверяем роль для создания нового материала
                if (profile.role !== 'teacher') {
                    setError('Только преподаватели могут создавать материалы');
                    setLoading(false);
                    navigate('/');
                    return;
                }

                setMaterial({
                    metadata: {
                        id: crypto.randomUUID(),
                        title: '',
                        description: '',
                        type: 'lecture',
                        duration: 0,
                        createdAt: new Date().toISOString(),
                        author: {
                            id: profile.id,
                            name: `${profile.lastName} ${profile.firstName}`,
                            role: profile.role
                        }
                    },
                    blocks: []
                });
            }
            setLoading(false);
        };

        loadMaterial();
    }, [id, profile, navigate]);

    const handleSave = async () => {
        if (!material || !profile) return;

        // Дополнительная проверка прав перед сохранением
        if (id && material.metadata.author.id !== profile.id) {
            setError('У вас нет прав на редактирование этого материала');
            return;
        }

        try {
            if (id) {
                await materialsService.updateMaterial(material);
            } else {
                await materialsService.createMaterial(material);
            }
            navigate(`/profile`);
        } catch (error) {
            console.error('Failed to save material:', error);
            setError('Ошибка при сохранении материала');
        }
    };

    const handlePreview = async () => {
        if (!material || !profile) return;
        
        // Дополнительная проверка прав перед предпросмотром
        if (id && material.metadata.author.id !== profile.id) {
            setError('У вас нет прав на редактирование этого материала');
            return;
        }

        try {
            if (id) {
                await materialsService.updateMaterial(material);
            } else {
                await materialsService.createMaterial(material);
            }
            navigate(`/viewer/${material.metadata.id}`);
        } catch (error) {
            console.error('Failed to save material:', error);
            setError('Ошибка при сохранении материала');
        }
    };

    const handleBlocksChange = (blocks: ContentBlock[]) => {
        if (!material || !profile) return;
        
        // Проверка прав перед изменением блоков
        if (id && material.metadata.author.id !== profile.id) {
            setError('У вас нет прав на редактирование этого материала');
            return;
        }

        setMaterial({
            ...material,
            blocks
        });
    };

    const handleAddBlock = (type: ContentBlock['type']) => {
        if (!material || !profile) return;
        
        // Проверка прав перед добавлением блока
        if (id && material.metadata.author.id !== profile.id) {
            setError('У вас нет прав на редактирование этого материала');
            return;
        }
        
        const newBlock = createBlock(type);
        const blocks = [...(material.blocks || [])];
        newBlock.order = blocks.length;
        blocks.push(newBlock);
        
        setMaterial({
            ...material,
            blocks
        });
    };

    if (loading) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    if (error || !material) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <>
            <Header />
            <div className={styles.editPage}>
                <aside className={styles.leftSidebar}>
                    <h2>Инструменты</h2>
                    <hr />
                    <div className={styles.toolButtons}>
                        <button onClick={() => handleAddBlock('heading')}>
                            <i className="fas fa-heading"></i>
                            Заголовок
                        </button>
                        <button onClick={() => handleAddBlock('text')}>
                            <i className="fas fa-paragraph"></i>
                            Параграф
                        </button>
                        <button onClick={() => handleAddBlock('image')}>
                            <i className="fas fa-image"></i>
                            Изображение
                        </button>
                        <button onClick={() => handleAddBlock('latex')}>
                            <i className="fas fa-square-root-alt"></i>
                            LaTeX
                        </button>
                        <button onClick={() => handleAddBlock('quiz')}>
                            <i className="fas fa-question-circle"></i>
                            Тест
                        </button>
                        <button onClick={() => handleAddBlock('video')}>
                            <i className="fas fa-video"></i>
                            Видео
                        </button>
                    </div>
                </aside>

                <main className={styles.mainContent}>
                    <input
                        type="text"
                        value={material.metadata.title}
                        onChange={(e) => setMaterial({
                            ...material,
                            metadata: { ...material.metadata, title: e.target.value }
                        })}
                        placeholder="Заголовок материала"
                        className={styles.titleInput}
                    />
                    <textarea
                        value={material.metadata.description}
                        onChange={(e) => setMaterial({
                            ...material,
                            metadata: { ...material.metadata, description: e.target.value }
                        })}
                        placeholder="Введите краткое описание данного материала..."
                        className={styles.descriptionInput}
                    />
                    <BlockManager
                        blocks={material.blocks || []}
                        onChange={handleBlocksChange}
                    />
                </main>

                <aside className={styles.rightSidebar}>
                    <button className={styles.actionButton}>
                        <i className="fas fa-upload"></i>
                        Загрузить файл
                    </button>
                    <button className={styles.actionButton}>
                        <i className="fas fa-download"></i>
                        Сохранить файл
                    </button>
                    <button 
                        className={styles.actionButton}
                        onClick={handleSave}
                    >
                        <i className="fas fa-save"></i>
                        Сохранить изменения
                    </button>
                    <button 
                        className={styles.actionButton}
                        onClick={handlePreview}
                    >
                        <i className="fas fa-eye"></i>
                        Просмотр
                    </button>
                </aside>
            </div>
            <Footer />
        </>
    );
}; 