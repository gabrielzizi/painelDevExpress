import React from "react";
import { Route, RouteProps } from 'react-router-dom'


type RoutesPropsData = RouteProps & { role?: string };

const PrivateRoutes: React.FC<RoutesPropsData> = ({ role, ...rest }) => {
    return <Route { ...rest } />
}

export default PrivateRoutes;