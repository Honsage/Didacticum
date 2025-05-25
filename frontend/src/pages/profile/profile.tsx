import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from '../../hooks/useDispatch';
import { useProfile } from '../../hooks/useProfile';
import { logout } from '../../store/slices/user.slice';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import MaterialCardProfile from '../../components/material-card-profile/material-card-profile';
import MaterialCard from '../../components/material-card/material-card';
import MaterialModal from '../../components/material-modal/material-modal';
import defaultAvatar from '../../assets/icons/default-avatar.svg';
import editIcon from '../../assets/icons/edit.svg';
import { materialsService } from '../../services/storage/materials.service';
import { Material } from '../../types/material.types';
import * as styles from './profile.module.css';

type TabType = 'materials' | 'favorites';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState<TabType>('materials');
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { profile, isLoading } = useProfile();
    
    useEffect(() => {
        const loadMaterials = async () => {
            if (!profile) return;

            try {
                let loadedMaterials: Material[];
                if (activeTab === 'materials' && profile.role === 'teacher') {
                    loadedMaterials = await materialsService.getMaterialsByAuthor(profile.id);
                } else {
                    // TODO: Implement favorites loading
                    loadedMaterials = await materialsService.getAllMaterials();
                }
                setMaterials(loadedMaterials);
            } catch (err) {
                setError('Ошибка при загрузке материалов');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadMaterials();
    }, [activeTab, profile]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleCreateMaterial = () => {
        navigate('/edit');
    };

    const handleMaterialClick = (material: Material) => {
        setSelectedMaterial(material);
    };

    const handleModalClose = () => {
        setSelectedMaterial(null);
    };

    const handleViewMaterial = () => {
        if (selectedMaterial) {
            navigate(`/viewer/${selectedMaterial.metadata.id}`);
        }
    };

    const handleEditMaterial = () => {
        if (selectedMaterial) {
            navigate(`/edit/${selectedMaterial.metadata.id}`);
        }
    };

    const handleDeleteMaterial = async () => {
        if (selectedMaterial) {
            try {
                await materialsService.deleteMaterial(selectedMaterial.metadata.id);
                setMaterials(prevMaterials => 
                    prevMaterials.filter(m => m.metadata.id !== selectedMaterial.metadata.id)
                );
                setSelectedMaterial(null);
            } catch (err) {
                console.error('Ошибка при удалении материала:', err);
                setError('Ошибка при удалении материала');
            }
        }
    };

    const handleEditProfile = () => {
        // TODO: Implement profile editing
        console.log('Edit profile');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        navigate('/login');
        return null;
    }

    const rightContent = (
        <div className={styles.headerButtons}>
            <Link to="/" className={styles.headerLink}>
                На главную
            </Link>
            <button onClick={handleLogout} className={styles.headerButton}>
                Выйти
            </button>
        </div>
    );

    return (
        <div className={styles.container}>
            <Header rightContent={rightContent} />
            
            <main className={styles.main}>
                <div className={styles.profileCard}>
                    <div className={styles.profileHeader}>
                        <div className={styles.userInfo}>
                            <img src={defaultAvatar} alt="Avatar" className={styles.avatar} />
                            <div className={styles.userDetails}>
                                <h2 className={styles.userName}>
                                    {`${profile.lastName} ${profile.firstName} ${profile.middleName || ''}`}
                                </h2>
                                <p className={styles.userEmail}>{profile.email}</p>
                            </div>
                        </div>
                        <button onClick={handleEditProfile} className={styles.editButton}>
                            <img src={editIcon} alt="Edit profile" />
                        </button>
                    </div>

                    <div className={styles.tabs}>
                        {profile.role === 'teacher' && (
                            <button
                                className={`${styles.tab} ${activeTab === 'materials' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('materials')}
                            >
                                Мои материалы
                            </button>
                        )}
                        <button
                            className={`${styles.tab} ${activeTab === 'favorites' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('favorites')}
                        >
                            Избранное
                        </button>
                    </div>

                    <div className={styles.content}>
                        {error && (
                            <div className={styles.error}>{error}</div>
                        )}
                        
                        {loading ? (
                            <div className={styles.loading}>Загрузка...</div>
                        ) : (
                            <>
                                {activeTab === 'materials' && profile.role === 'teacher' && (
                                    <div className={styles.materialsGrid}>
                                        <MaterialCardProfile
                                            variant="create"
                                            onCreate={handleCreateMaterial}
                                        />
                                        {materials.map((material) => (
                                            <div
                                                key={material.metadata.id}
                                                onClick={() => handleMaterialClick(material)}
                                                className={styles.cardWrapper}
                                            >
                                                <MaterialCardProfile
                                                    variant="material"
                                                    title={material.metadata.title}
                                                    type={material.metadata.type === 'lecture' ? 'Лекция' : 
                                                          material.metadata.type === 'test' ? 'Тест' : 'Практика'}
                                                    duration={`${material.metadata.duration} мин`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {activeTab === 'favorites' && (
                                    <div className={styles.favoritesGrid}>
                                        {materials.map((material) => (
                                            <MaterialCard
                                                key={material.metadata.id}
                                                material={material}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>

            {selectedMaterial && (
                <MaterialModal
                    material={selectedMaterial}
                    showAuthor={false}
                    onClose={handleModalClose}
                    onView={handleViewMaterial}
                    onEdit={handleEditMaterial}
                    onDelete={handleDeleteMaterial}
                />
            )}

            <Footer />
        </div>
    );
};

export default ProfilePage; 