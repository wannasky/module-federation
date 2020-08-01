import React, {lazy, Suspense, useState} from 'react';
import {HashRouter as Router, Redirect, Route} from "react-router-dom";
import Container from "./component/container";
import Home from './views/home';
import Loading from "./component/loading";
// @ts-ignore
import {UserContext} from "@shared/library";
import './App.scss';


// @ts-ignore
const HatoRoutes = lazy(() => import('hato/Routes'));
// @ts-ignore
const NangkaRoutes = lazy(() => import('nangka/Routes'));

const App: React.FC = () => {

    const [user, setUser] = useState<any>(null);
    const context = {user, setUser};

    return <Router>
        <UserContext.Provider value={context}>
            <Container>
                <Route path="/" exact render={() => <Redirect to="/home"/>} />
                <Route path="/home" component={Home} />
                <Suspense fallback={<Loading/>}>
                    <HatoRoutes/>
                    <NangkaRoutes/>
                </Suspense>
            </Container>
        </UserContext.Provider>

    </Router>
}

export default App;
