import { Routes, Route, Navigate } from 'react-router-dom';
import appInfo from './app-info';
import routes from './routes/app-routes';
import { SideNavOuterToolbar as SideNavBarLayout } from './layouts';

export default function Content() {
  return (
    <SideNavBarLayout title={appInfo.title}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}
        <Route
          path='*'
          element={<Navigate to='/clientes' />}
        />
      </Routes>

    </SideNavBarLayout>
  );
}

