import {lazy} from "react";

const Wrap = lazy(() => import('../views/wrap'));
const CreateOrder = lazy(() => import('../views/createOrder'));
const HitoryOrder = lazy(() => import('../views/historyOrder'));

const routes = [

    {
        path: '/nangka',
        component: Wrap,
        routes: [
            {
                path: '/nangka/create',
                exact: true,
                component: CreateOrder
            },
            {
                path: '/nangka/history',
                exact: true,
                component: HitoryOrder
            }
        ]
    }

]

export default routes;
