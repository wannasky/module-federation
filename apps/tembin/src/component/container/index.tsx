import React from 'react';
import Header from "../header";
import './index.scss';


const Container: React.FC = ({children, ...restProps}) => {

    return <div className="wrapper">
        <Header {...restProps}/>
        <div className="body">{children}</div>
    </div>
};


export default Container;
