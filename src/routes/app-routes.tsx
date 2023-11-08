import { withNavigationWatcher } from '../contexts/navigation';

import { navigation } from '../app-navigation'

export let routes: any[] = [];

const userRole = 'contabilidade';

navigation.forEach(navigation => {
    if (userRole === navigation.role) {
        console.log(navigation.role)
        navigation.items.forEach(item => {
            const obj = {
                path: item.path,
                element: item.element
            }

            routes.push(obj);
        })
    }
});

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
