import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar/AppBar';
import Drawer from 'material-ui/Drawer/Drawer';
import Card from 'material-ui/Card/Card';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import withRouter from 'react-router/lib/withRouter';

import Mobile from '../../utils/Mobile';
import DashboardContainer from '../common/Container';
import withResize from '../common/withResize';
import DrawerHeader from './DrawerHeader';
import AppBarMenu from './AppBarMenu';


class Dashboard extends React.Component {
    static propTypes = {
        children: PropTypes.any
    };

    state = {
        open: this.isMobile() ? false : true
    };

    render() {
    	const styles = this.getStyles();

        return (
            <DashboardContainer backgroundColor="#E0E0E0">
                <AppBar
	                title='My Awesome App'
                    onLeftIconButtonTouchTap={this.handleMenuTouch}
                    iconElementRight={this.getIconElementRight()}
                />
                <Drawer
                    open={this.state.open}
	                containerStyle={styles.drawerStyle}
	                onRequestChange={this.handleMenuDrawer}
                    docked={this.isMobile() ? false : true}
                >
	                {this.shouldRenderDrawerHeader()}
                    <List>
                        <ListItem primaryText='Account' value='account' onTouchTap={this.handleMenuItemTouch}/>
                    </List>
                </Drawer>
                <Card style={styles.cardStyle} containerStyle={styles.cardContainerStyle}>
                    {this.props.children}
                </Card>
            </DashboardContainer>
        );
    }

    getIconElementRight = () => {
    	return (
    		<AppBarMenu isMobile={this.isMobile()}/>
	    );
    }

    shouldRenderDrawerHeader = () => {
    	if (Mobile.is() || this.props.width < 480) {
    		return (
			    <DrawerHeader/>
		    );
	    }

	    return false;
    }

    getStyles = () => {
    	let { width } = this.props;
    	let { open } = this.state;

    	return {
		    cardStyle: {
			    marginTop: this.isMobile() < 480 ? '0px' : '20px',
			    marginBottom: this.isMobile() < 480 ? '0px' : '20px',
			    marginRight: this.isMobile() ? '0px' : '20px',
			    marginLeft:  this.isMobile() ? '0' : open && width > 992 ? '280px' : '20px',
			    height: this.isMobile() ? 'calc(100vh - 64px)' : 'calc(100vh - 104px)',
		    },
		    cardContainerStyle: {
			    padding: '20px',
			},
		    drawerStyle: {
	    		marginTop: this.isMobile() ? '0px' : '64px'
		    }
	    }
    }

    isMobile = () => Mobile.is() || this.props.width < 480;

	handleMenuTouch = event => this.setState({ open: !this.state.open });

	handleMenuDrawer = open => this.setState({ open });

	handleMenuItemTouch = event => {
		this.props.router.push('/dashboard/profile');

		if (this.isMobile()) {
			this.handleMenuTouch(event);
		}
	}
}

export default withRouter(withResize(Dashboard));