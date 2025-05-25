import { Material } from '../../types/material.types';
import { LEARNING_MATERIALS } from '../../constants/demo/materials';

const DB_NAME = 'didacticum';
const DB_VERSION = 2;
const MATERIALS_STORE = 'materials';

class MaterialsService {
    private db: IDBDatabase | null = null;

    async init(): Promise<void> {
        if (this.db) return;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                reject(new Error('Failed to open database'));
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                
                if (db.objectStoreNames.contains(MATERIALS_STORE)) {
                    db.deleteObjectStore(MATERIALS_STORE);
                }
                
                const store = db.createObjectStore(MATERIALS_STORE, { keyPath: 'metadata.id' });
                
                store.createIndex('title', 'metadata.title', { unique: false });
                store.createIndex('type', 'metadata.type', { unique: false });
                store.createIndex('authorId', 'metadata.author.id', { unique: false });
                store.createIndex('createdAt', 'metadata.createdAt', { unique: false });
                
                store.transaction.oncomplete = () => {
                    const materialStore = db.transaction(MATERIALS_STORE, 'readwrite')
                        .objectStore(MATERIALS_STORE);
                    
                    LEARNING_MATERIALS.forEach(material => {
                        materialStore.add(material);
                    });
                };
            };
        });
    }

    private getStore(mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
        if (!this.db) {
            throw new Error('Database not initialized');
        }
        return this.db.transaction(MATERIALS_STORE, mode).objectStore(MATERIALS_STORE);
    }

    async getAllMaterials(): Promise<Material[]> {
        await this.init();
        return new Promise((resolve, reject) => {
            const request = this.getStore().getAll();
            
            request.onerror = () => reject(new Error('Failed to get materials'));
            request.onsuccess = () => resolve(request.result);
        });
    }

    async getMaterialById(id: string): Promise<Material | null> {
        await this.init();
        return new Promise((resolve, reject) => {
            const request = this.getStore().get(id);
            
            request.onerror = () => reject(new Error('Failed to get material'));
            request.onsuccess = () => resolve(request.result || null);
        });
    }

    async searchMaterials(query: string): Promise<Material[]> {
        await this.init();
        return new Promise((resolve, reject) => {
            const store = this.getStore();
            const titleIndex = store.index('title');
            const materials: Material[] = [];
            
            const request = titleIndex.openCursor();
            
            request.onerror = () => reject(new Error('Failed to search materials'));
            request.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest).result;
                
                if (cursor) {
                    const material = cursor.value as Material;
                    if (material.metadata.title.toLowerCase().includes(query.toLowerCase()) ||
                        material.metadata.tags?.some(tag => 
                            tag.toLowerCase().includes(query.toLowerCase())
                        )) {
                        materials.push(material);
                    }
                    cursor.continue();
                } else {
                    resolve(materials);
                }
            };
        });
    }

    async createMaterial(material: Material): Promise<void> {
        await this.init();
        return new Promise((resolve, reject) => {
            const request = this.getStore('readwrite').add(material);
            
            request.onerror = () => reject(new Error('Failed to create material'));
            request.onsuccess = () => resolve();
        });
    }

    async updateMaterial(material: Material): Promise<void> {
        await this.init();
        return new Promise((resolve, reject) => {
            const request = this.getStore('readwrite').put(material);
            
            request.onerror = () => reject(new Error('Failed to update material'));
            request.onsuccess = () => resolve();
        });
    }

    async deleteMaterial(id: string): Promise<void> {
        await this.init();
        return new Promise((resolve, reject) => {
            const request = this.getStore('readwrite').delete(id);
            
            request.onerror = () => reject(new Error('Failed to delete material'));
            request.onsuccess = () => resolve();
        });
    }

    async getMaterialsByAuthor(authorId: string): Promise<Material[]> {
        await this.init();
        return new Promise((resolve, reject) => {
            const store = this.getStore();
            const authorIndex = store.index('authorId');
            const request = authorIndex.getAll(authorId);
            
            request.onerror = () => reject(new Error('Failed to get materials by author'));
            request.onsuccess = () => resolve(request.result);
        });
    }
}

export const materialsService = new MaterialsService(); 