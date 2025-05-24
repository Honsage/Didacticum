import { Material } from '../../types/material.types';

export const DEMO_MATERIALS: Material[] = [
    {
        id: '1',
        title: 'Введение в квантовую механику и основы...',
        author: {
            name: 'Р. Фейнман',
            position: 'профессор'
        },
        description: 'Основные принципы квантовой физики с объяснением волновых функций и принципа неопределенности...',
        type: 'lecture',
        duration: 90
    },
    {
        id: '2',
        title: 'Комбинаторика и теория графов',
        author: {
            name: 'В.А. Лесов',
            position: 'доцент'
        },
        description: 'Самостоятельная работа по основам комбинаторики и теории графов для самопроверки.',
        type: 'test',
        duration: 30
    },
    {
        id: '3',
        title: 'Изучение библиотеки React',
        author: {
            name: 'А.В. Васильев',
            position: 'преподаватель'
        },
        description: 'Изучение основ библиотеки React. Практика написания функциональных компонентов и взаимодействия с Redux хранилищем.',
        type: 'practice',
        duration: 120
    }
]; 