import { Material, ContentBlock } from '../types/material.types';

/**
 * Сериализует материал в формат ILM
 */
export const serializeToILM = (material: Material): string => {
    return JSON.stringify(material, null, 2);
};

/**
 * Десериализует ILM файл в материал
 */
export const deserializeFromILM = (content: string): Material => {
    try {
        const material = JSON.parse(content);
        
        // Валидация структуры материала
        if (!material.metadata || !material.metadata.id || !material.metadata.title) {
            throw new Error('Некорректная структура файла ILM: отсутствуют обязательные поля метаданных');
        }

        // Валидация блоков
        if (material.blocks) {
            if (!Array.isArray(material.blocks)) {
                throw new Error('Некорректная структура файла ILM: blocks должен быть массивом');
            }

            // Проверяем каждый блок на наличие обязательных полей
            material.blocks.forEach((block: ContentBlock, index: number) => {
                if (!block.id || !block.type || !block.content) {
                    throw new Error(`Некорректная структура блока ${index}: отсутствуют обязательные поля`);
                }
            });
        }

        return material;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Ошибка при чтении файла ILM: ${error.message}`);
        }
        throw new Error('Ошибка при чтении файла ILM');
    }
};

/**
 * Сохраняет материал в файл .ilm с возможностью выбора места сохранения
 */
export const saveToFile = async (material: Material) => {
    try {
        // Проверяем поддержку File System Access API
        if (!('showSaveFilePicker' in window)) {
            // Fallback для браузеров без поддержки File System Access API
            const content = serializeToILM(material);
            const blob = new Blob([content], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `${material.metadata.title.toLowerCase().replace(/\s+/g, '_')}.ilm`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            URL.revokeObjectURL(url);
            return;
        }

        // Используем современный File System Access API
        const handle = await (window as any).showSaveFilePicker({
            suggestedName: `${material.metadata.title.toLowerCase().replace(/\s+/g, '_')}.ilm`,
            types: [{
                description: 'Interactive Learning Material',
                accept: {
                    'application/json': ['.ilm']
                }
            }]
        });

        const writable = await handle.createWritable();
        await writable.write(serializeToILM(material));
        await writable.close();
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            // Пользователь отменил выбор места сохранения
            return;
        }
        throw error;
    }
};

/**
 * Читает файл .ilm
 */
export const readFromFile = (file: File): Promise<Material> => {
    return new Promise((resolve, reject) => {
        if (!file.name.endsWith('.ilm')) {
            reject(new Error('Неверный формат файла. Ожидается файл с расширением .ilm'));
            return;
        }

        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const material = deserializeFromILM(content);
                resolve(material);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = () => {
            reject(new Error('Ошибка при чтении файла'));
        };
        
        reader.readAsText(file);
    });
}; 