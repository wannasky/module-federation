import React, {useContext, useEffect} from "react";
// @ts-ignore
import {UserContext, UserContextProps} from "@shared/library";

const App: React.FC = () => {

    const context = useContext<UserContextProps>(UserContext);

    useEffect(() => {
        context.setUser(Object.assign({name: 'wannasky', role: 'admin', count: 0}, context.user || {}));
    }, []);

    return <div className="page-home">
        <p>首页概览页面</p>
        <p>设置用户信息到shared. 更新次数：{context.user?.count}</p>
    </div>
};

export default App;
