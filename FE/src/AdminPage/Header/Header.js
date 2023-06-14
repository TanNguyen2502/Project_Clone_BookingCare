import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../Redux/store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.css';
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from 'react-intl';

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            menuApp: []
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    componentDidMount(){
        let menu = [];
        menu = adminMenu;
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { language } = this.props;

        return (
            <div className="header-container">
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='languages'>
                    <span   className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}> VI 
                    </span>
                    <span   className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
                            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}> EN 
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);