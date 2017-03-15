import React, {PropTypes} from 'react';
import withRouter from 'react-router/lib/withRouter';

import FlexContainer from '../common/FlexContainer';
import RegisterForm from './RegisterForm';
import RegisterFormMobile from './RegisterFormMobile';

import Mobile from '../../utils/Mobile';

import withResize from '../common/withResize';

class Register extends React.Component {

    render() {
	    const styles = this.getStyles();

	    return (
            <FlexContainer style={styles.container}>
                {this.getRegisterForm()}
            </FlexContainer>
        );
    }

    getRegisterForm = () => {
        if (this.isMobile()) {
            return (
                <RegisterFormMobile handleLogin={this.handleLogin}/>
            );
        } else {
            return (
                <RegisterForm handleLogin={this.handleLogin}/>
            );
        }
    }

	getStyles = () => {
		return {
			container: {
				backgroundColor: this.isMobile() ? "white" : "#E0E0E0"
			}
		};
	}

    isMobile = () => Mobile.is() || this.props.width < 480;

	handleLogin = event => this.props.router.push('/login');
}

export default withRouter(withResize(Register));