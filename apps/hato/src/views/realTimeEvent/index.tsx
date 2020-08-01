import React, {useContext, useEffect} from 'react';
// @ts-ignore
import {UserContext} from "@shared/library";

const App: React.FC = () => {

    const context = useContext<any>(UserContext);

    useEffect(() => {
        context.setUser({...context.user, count: context.user.count + 1})
    }, []);

    return <div>
        <p>实时事件页面</p>
        <p>姓名：{context.user?.name}，角色: {context.user?.role}</p>
    </div>
};

export default App;
