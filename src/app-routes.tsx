import { HomePage, ProfilePage, actionDates } from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
    {
        path: '/actionsDate',
        element: actionDates
    },
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/home',
        element: HomePage
    }
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
