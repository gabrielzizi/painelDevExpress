import { withNavigationWatcher } from './contexts/navigation';


import { navigation } from './app-navigation'

export let routes: any[] = [];

navigation.forEach(navigation => {
    navigation.items.forEach(item => {
        const obj = {
            path: item.path,
            element: item.element
        }

        routes.push(obj);
    })
});

console.log(routes);

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
