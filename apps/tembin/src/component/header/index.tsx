import React, {useCallback, useEffect, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import "./index.scss";
import {RouteComponentProps} from "react-router";

interface Menu {
    name: string;
    link: string;
    subs?: [Menu];
}

const Header: React.FC<RouteComponentProps> = (props) => {

    // 这个数据可以通过API获取，可配合权限进行管理
    const menus = [
        {
            name: '首页',
            link: '/home'
        },
        {
            name: '事件管理',
            link: '/hato',
            subs: [
                {
                    name: '实时事件',
                    link: '/hato/realtime'
                },
                {
                    name: '历史事件',
                    link: '/hato/history'
                }
            ]
        },
        {
            name: '订单管理',
            link: '/nangka',
            subs: [
                {
                    name: '创建订单',
                    link: '/nangka/create'
                },
                {
                    name: '历史订单',
                    link: '/nangka/history'
                }
            ]
        }
    ];

    const [subMenus, setSubMenus] = useState<Menu[]>([]);
    const [levelOneMenu, setLevelOneMenu] = useState<string>('');
    const [levelTwoMenu, setLevelTwoMenu] = useState<string>('');

    const getLevelOneMenu = useCallback(() => {
        let menu = menus.find(item => {
            return props.history.location.pathname.includes(item.link);
        });

        let flatSubMenu = menus.map(item => item.subs || []).flat(1);
        let subMenu = flatSubMenu.find(item => {
            return props.history.location.pathname.includes(item.link);
        });

        if (menu) {
            setLevelOneMenu(menu.name);
        } else {
            setLevelOneMenu('');
        }

        if(subMenu){
            setLevelTwoMenu(subMenu.name);
        }else{
            setLevelTwoMenu('');
        }

    }, [props.history]);

    useEffect(() => {
        return props.history.listen(() => {
            getLevelOneMenu();
        });
    }, [getLevelOneMenu]);


    useEffect(() => {
        if(levelOneMenu){
            const menu = menus.find(item => item.name === levelOneMenu);
            setSubMenus(menu!.subs ? menu!.subs : []);
        }
    }, [levelOneMenu]);

    useEffect(() => {
        getLevelOneMenu();
    }, []);


    return <div className="header">
        <div className="menus-level-one">
            <ul>
                {menus.map((item, index) => {
                    return <li key={index} className={item.name === levelOneMenu ? 'active' : ''}>
                        <Link to={item.subs && item.subs.length ? item.subs[0].link : item.link}>{item.name}</Link>
                    </li>
                })}
            </ul>
        </div>
        {
            subMenus.length ? <div className="menus-level-two">
                <ul>
                    {subMenus.map((item, index) => {
                        return <li key={index} className={item.name === levelTwoMenu ? 'active' : ''}>
                            <Link to={item.link}>{item.name}</Link>
                        </li>
                    })}
                </ul>
            </div> : null
        }
    </div>
};

export default withRouter(Header);
