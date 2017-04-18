import React from 'react';
import Relay from 'react-relay';
import Menu from '../../menus/components/Menu';

class Header extends React.Component<any, any> {
    render() {
        const { app, menu } = this.props;

        return (
            <header>
                <a href="/">
                    <h1>{app.title}</h1>
                    <p>{app.subTitle}</p>
                </a>
                <Menu menu={menu} />
            </header>
        );
    }
}

export default Relay.createContainer(Header, {
    fragments: {
        app: () => Relay.QL`
            fragment on App {
                title,
                subTitle
            }
        `,
        menu: () => Relay.QL`
            fragment on Menu {
                ${Menu.getFragment('menu')}
            }
        `
    }
});
