import { IMenuItem } from 'ptz-menu-domain';
import React from 'react';

interface IMenuItemProps {
    menuItem: IMenuItem;
}

function getSubItems(menuItem: IMenuItem) {
    if (!menuItem.subItems || menuItem.subItems.length === 0)
        return null;

    const subItems = menuItem.subItems.forEach(subItem => <MenuItem menuItem={subItem} />);
    return <ul>{subItems}</ul>;
}

const MenuItem: React.StatelessComponent<IMenuItemProps> = ({ menuItem }) => {
    return (
        <li>
            <a href={menuItem.link} className="active">{menuItem.label}</a>
            {getSubItems(menuItem)}
        </li>
    );
};

export default MenuItem;
