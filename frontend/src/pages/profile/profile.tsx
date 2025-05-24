import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';
import { useDispatch } from '../../hooks/useDispatch';
import { useProfile } from '../../hooks/useProfile';
import { logout } from '../../store/slices/user.slice';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import MaterialCardProfile from '../../components/material-card-profile/material-card-profile';
import MaterialCard from '../../components/material-card/material-card';
import defaultAvatar from '../../assets/icons/default-avatar.svg';
import editIcon from '../../assets/icons/edit.svg';
import { DEMO_MATERIALS } from '../../constants/demo/materials';
import { PROFILE_MATERIALS } from '../../constants/demo/profile-materials';
import * as styles from './profile.module.css';

type TabType = 'materials' | 'favorites';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState<TabType>('materials');
    const { profile, isLoading } = useProfile();
    
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleCreateMaterial = () => {
        // TODO: Implement material creation
        console.log('Create material');
    };

    const handleEditMaterial = (id: string) => {
        // TODO: Implement material editing
        console.log('Edit material', id);
    };

    const handleDeleteMaterial = (id: string) => {
        // TODO: Implement material deletion
        console.log('Delete material', id);
    };

    const handleEditProfile = () => {
        // TODO: Implement profile editing
        console.log('Edit profile');
    };

    if (isLoading) {
        return <div>Loading...</div>; // Можно заменить на компонент загрузки
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
                        {activeTab === 'materials' && profile.role === 'teacher' && (
                            <div className={styles.materialsGrid}>
                                <MaterialCardProfile
                                    variant="create"
                                    onCreate={handleCreateMaterial}
                                />
                                {PROFILE_MATERIALS.map((material) => (
                                    <MaterialCardProfile
                                        key={material.id}
                                        variant="material"
                                        title={material.title}
                                        type={material.type}
                                        duration={`${material.duration} мин`}
                                        onEdit={() => handleEditMaterial(material.id)}
                                        onDelete={() => handleDeleteMaterial(material.id)}
                                    />
                                ))}
                            </div>
                        )}
                        {activeTab === 'favorites' && (
                            <div className={styles.favoritesGrid}>
                                {DEMO_MATERIALS.map((material) => (
                                    <MaterialCard
                                        key={material.id}
                                        material={material}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProfilePage; 