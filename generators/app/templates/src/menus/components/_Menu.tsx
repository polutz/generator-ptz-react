import { IMenu } from 'ptz-menu-domain';
import React from 'react';
import Relay from 'react-relay';
import MenuItem from './MenuItem';

interface IMenuProps {
    menu: IMenu;
}

const Menu: React.StatelessComponent<IMenuProps> = ({ menu }) => {

    const menuItems = menu.items.map((menuItem, i) => <MenuItem menuItem={menuItem} key={i} />);

    return (
        <nav>
            <label htmlFor="cb-menu">{menu.label}</label>
            <input type="checkbox" name="cb-menu" id="cb-menu" />
            <ul>
                {menuItems}
            </ul>
        </nav>
    );
};

export default Relay.createContainer(Menu, {
    fragments: {
        menu: () => Relay.QL`
            fragment on Menu {
                label,
                items{
                    label,
                    link,
                    subItems{
                        label,
                        link
                    }
                }
            }
        `
    }
});
