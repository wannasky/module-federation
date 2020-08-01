import {lazy} from "react";

const Wrap = lazy(() => import('../views/wrap'));
const RealTimeEvent = lazy(() => import('../views/realTimeEvent'));
const HistoryEvent = lazy(() => import('../views/historyEvent'));

const routes = [

    {
        path: '/hato',
        component: Wrap,
        routes: [
            {
                path: '/hato/realtime',
                exact: true,
                component: RealTimeEvent
            },
            {
                path: '/hato/history',
                exact: true,
                component: HistoryEvent
            }
        ]
    }

]

export default routes;
