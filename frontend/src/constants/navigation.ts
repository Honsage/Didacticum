interface NavigationItem {
    path: string;
    label: string;
}

export const MAIN_NAVIGATION: NavigationItem[] = [
    {
        path: '/materials',
        label: 'Материалы'
    },
    {
        path: '/authors',
        label: 'Авторы'
    },
    {
        path: '/about',
        label: 'О проекте'
    }
];

export const AUTH_NAVIGATION: NavigationItem[] = [
    {
        path: '/login',
        label: 'Войти'
    },
    {
        path: '/register',
        label: 'Регистрация'
    }
]; 