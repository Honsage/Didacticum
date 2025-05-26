interface NavigationItem {
    path: string;
    label: string;
}

export const MAIN_NAVIGATION: NavigationItem[] = [
    {
        path: '/viewer',
        label: 'Просмотреть материал'
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
        path: '/signup',
        label: 'Регистрация'
    }
]; 