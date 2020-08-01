import React, { Suspense } from "react";
import {HashRouter as Router} from "react-router-dom";
import {renderRoutes} from 'react-router-config';
import routes from './config/routes';
// @ts-ignore
import Loading from "tembin/Loading";


const Routes: React.FC = () => {

    return <Router>
        <Suspense fallback={<Loading/>}>
            <switch>{renderRoutes(routes)}</switch>
        </Suspense>
    </Router>
};

export default Routes;
