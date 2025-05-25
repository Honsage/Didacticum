import { Material } from '../../types/material.types';


export const LEARNING_MATERIALS: Material[] = [
    {
        metadata: {
            id: '1',
            title: 'Введение в TypeScript',
            type: 'lecture',
            author: {
                id: 'author1',
                name: 'Иван Петров',
                role: 'Разработчик'
            },
            description: 'Изучение основ TypeScript. Практика написания классов и взаимодействия с ними.',
            duration: 40,
            version: '1.0.0',
            createdAt: '2024-03-15T10:00:00Z',
            updatedAt: '2024-03-15T10:00:00Z',
            tags: ['TypeScript', 'JavaScript', 'Программирование'],
            language: 'ru',
            difficulty: 'beginner'
        },
        blocks: [
            {
                id: 'h1',
                type: 'heading',
                order: 1,
                content: {
                    text: 'Что такое TypeScript?',
                    level: 1
                }
            },
            {
                id: 'text1',
                type: 'text',
                order: 2,
                content: {
                    text: 'TypeScript - это язык программирования, разработанный Microsoft, который добавляет статическую типизацию к JavaScript.',
                    format: 'plain'
                }
            },
            {
                id: 'code1',
                type: 'code',
                order: 3,
                content: {
                    code: 'let message: string = "Hello, TypeScript!";\nconsole.log(message);',
                    language: 'typescript',
                    highlightedLines: [1]
                }
            },
            {
                id: 'quiz1',
                type: 'quiz',
                order: 4,
                content: {
                    question: 'Какой тип данных используется в TypeScript для обозначения строки?',
                    type: 'single',
                    options: ['String', 'string', 'str', 'text'],
                    correctAnswer: 'string',
                    explanation: 'В TypeScript строковый тип обозначается ключевым словом string (в нижнем регистре)'
                }
            }
        ]
    },
    {
        metadata: {
            id: '2',
            title: 'Математические формулы в LaTeX',
            type: 'lecture',
            author: {
                id: 'author2',
                name: 'Мария Сидорова',
                role: 'Доцент'
            },
            description: 'Рассмотрим, как использовать LaTeX для записи формул.',
            duration: 15,
            version: '1.0.0',
            createdAt: '2024-03-14T15:30:00Z',
            updatedAt: '2024-03-14T15:30:00Z',
            tags: ['LaTeX', 'Математика', 'Формулы'],
            language: 'ru',
            difficulty: 'intermediate'
        },
        blocks: [
            {
                id: 'h1',
                type: 'heading',
                order: 1,
                content: {
                    text: 'Квадратные уравнения в LaTeX',
                    level: 1
                }
            },
            {
                id: 'text1',
                type: 'text',
                order: 2,
                content: {
                    text: 'Рассмотрим, как записать формулу квадратного уравнения в LaTeX.',
                    format: 'plain'
                }
            },
            {
                id: 'latex1',
                type: 'latex',
                order: 3,
                content: {
                    formula: 'ax^2 + bx + c = 0',
                    displayMode: true
                }
            },
            {
                id: 'latex2',
                type: 'latex',
                order: 4,
                content: {
                    formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
                    displayMode: true
                }
            }
        ]
    },

    {
        metadata: {
            id: '3',
            title: 'Введение в квантовую механику и основы волновой функции',
            description: 'Основные принципы квантовой физики с объяснением волновых функций и принципа неопределенности.',
            type: 'lecture',
            duration: 45,
            author: {
                id: 'author1',
                name: 'А. Фейнман',
                role: 'Профессор'
            },
            version: '1.0.0',
            createdAt: '2024-03-14T15:30:00Z',
            updatedAt: '2024-03-14T15:30:00Z',
            tags: ['Квантовая физика', 'Физика', 'Волновая функция'],
            language: 'ru',
            difficulty: 'advanced'
        },
        blocks: []
    },
    {
        metadata: {
            id: '4',
            title: 'Комбинаторика и теория графов',
            description: 'Самостоятельная работа по основам комбинаторики и теории графов для математиков.',
            type: 'test',
            duration: 60,
            author: {
                id: 'author2',
                name: 'В.А. Носов',
                role: 'Доцент'
            },
            version: '2',
            createdAt: '2024-03-11T15:30:00Z',
            updatedAt: '2024-03-11T15:30:00Z',
            tags: ['Комбинаторика', 'Теория графов', 'Математика'],
            language: 'ru',
            difficulty: 'beginner'
        },
        blocks: []        
    }
]; 