import React, { Suspense } from 'react';
import {renderRoutes, RouteConfig} from "react-router-config";
// @ts-ignore
import Loading from "tembin/Loading";


const App: React.FC<RouteConfig> = (props) => {
    return <div className="page-hato">
        <Suspense fallback={<Loading/>}>
            {renderRoutes(props.route.routes)}
        </Suspense>
    </div>
};

export default App;
