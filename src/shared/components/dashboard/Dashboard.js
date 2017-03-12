import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar/AppBar';
import Drawer from 'material-ui/Drawer/Drawer';
import Card from 'material-ui/Card/Card';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import withRouter from 'react-router/lib/withRouter';

import Mobile from '../../utils/Mobile';
import DashboardContainer from '../common/Container';
import withResize from '../common/withResize';


class Dashboard extends React.Component {
    static propTypes = {
        children: PropTypes.any
    };

    state = {
        open: Mobile.is() || this.props.width < 480 ? false : true
    };

    render() {
    	const styles = this.getStyles();

        return (
            <DashboardContainer backgroundColor="#E0E0E0">
                <AppBar
	                title='My Awesome App'
                    onLeftIconButtonTouchTap={this.handleMenuTouch}
                    iconElementRight={<FlatButton label='logout' onTouchTap={this.handleLogout}/>}
                />
                <Drawer
                    open={this.state.open}
	                containerStyle={styles.drawerStyle}
	                onRequestChange={this.handleMenuDrawer}
                    docked={Mobile.is() || this.props.width < 480 ? false : true}
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

    shouldRenderDrawerHeader = () => {
    	if (Mobile.is() || this.props.width < 480 ) {
    		const styles = this.getStyles();

    		return (
			    <div style={styles.headerStyle}>
				    <div style={styles.headerTextStyle}>
					    <span>Hello</span>
				    </div>
			    </div>
		    )
	    }

	    return false;
    }

    getStyles = () => {
    	return {
	    	headerStyle: {
			    height: '175px',
			    width: 'auto',
			    backgroundColor: "#673AB7"
		    },
		    headerTextStyle: {
	    		padding: '20px',
			    color: 'white'
		    },
		    cardStyle: {
			    marginTop: Mobile.is() || this.props.width < 480 ? '0px' : '20px',
			    marginBottom: Mobile.is() || this.props.width < 480 ? '0px' : '20px',
			    marginRight: Mobile.is() || this.props.width < 480 ? '0px' : '20px',
			    marginLeft:  Mobile.is() || this.props.width < 480 ? '0' : this.state.open && this.props.width > 992 ? '280px' : '20px',
	    //TODO review these prop
			    height: Mobile.is() || this.props.width < 480 ? '91%' : '86%'
		    },
		    cardContainerStyle: {
			    padding: '20px',
			},
		    drawerStyle: {
	    		marginTop: Mobile.is() || this.props.width < 480 ? '0px' : '64px'
		    }
	    }
    }

	handleLogout = event => this.props.router.push('/login');

	handleMenuTouch = event => this.setState({ open: !this.state.open });

	handleMenuDrawer = open => this.setState({ open });

	handleMenuItemTouch = event => {
		this.props.router.push('/dashboard/account');

		if (Mobile.is() || this.props.width < 480) {
			this.handleMenuTouch(event);
		}
	}
}

export default withRouter(withResize(Dashboard));