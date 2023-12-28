import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';

import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';

import MenuHomeHeader from './MenuHomeHeader';
import HomeMenuSearchSpecialty from './HomeMenuSearchSpecialty';
import { emitter } from '../../utils/emitter';
import { Alert } from 'reactstrap';

class HomeHeader extends Component {
    constructor() {
        super();

        this.state = {
            showMenuSearchSpecialty: false,
            previewImgURL: [],
        };
    }

    componentDidMount() {
        let imageBase64 = '';
        if (this.props && this.props.userInfo && this.props.userInfo.image) {
            imageBase64 = new Buffer(this.props.userInfo.image, 'base64').toString('binary');
        }

        this.setState({
            previewImgURL: imageBase64,
        });
    }

    handleClickShowHomeMenuSearchSpecialty = () => {
        this.setState({
            showMenuSearchSpecialty: !this.state.showMenuSearchSpecialty,
        });
    };

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //fire redux event: action
    };

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userInfo !== this.props.userInfo) {
            let imageBase64 = '';
            if (this.props.userInfo.image) {
                imageBase64 = new Buffer(this.props.userInfo.image, 'base64').toString('binary');
            }

            this.setState({
                previewImgURL: imageBase64,
            });
        }
    }

    render() {
        let language = this.props.language;
        // let {userInfo}=this.props;
        // let { user } = this.state;

        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div
                                className="header-logo"
                                onClick={() => {
                                    this.returnToHome();
                                }}
                            ></div>
                        </div>
                        <div className="center-content">
                            <div class="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.speciality" />
                                    </b>
                                </div>
                                <div class="subs-title sub-menu">
                                    <div class="sub-menu-item">Option 1</div>
                                    <div class="sub-menu-item">Option 2</div>
                                    <div class="sub-menu-item">Option 3</div>
                                </div>
                            </div>

                            <div class="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.health-facility" />
                                    </b>
                                </div>
                                <div class="subs-title sub-menu">
                                    <div class="sub-menu-item">Option </div>
                                    <div class="sub-menu-item">Option </div>
                                    <div class="sub-menu-item">Option </div>
                                </div>
                            </div>
                            <div class="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.select-room" />
                                    </b>
                                </div>
                                <div class="subs-title sub-menu">
                                    <div class="sub-menu-item">Option </div>
                                    <div class="sub-menu-item">Option </div>
                                    <div class="sub-menu-item">Option </div>
                                </div>
                            </div>
                            <div class="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.doctor" />
                                    </b>
                                </div>
                                <div class="subs-title sub-menu">
                                    <div class="sub-menu-item">Option </div>
                                    <div class="sub-menu-item">Option </div>
                                    <div class="sub-menu-item">Option </div>
                                </div>
                            </div>
                            <div class="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.fee" />
                                    </b>
                                </div>
                                <div class="subs-title sub-menu">
                                    <div class="sub-menu-item">Option </div>
                                    <div class="sub-menu-item">Option </div>
                                    <div class="sub-menu-item">Option </div>
                                </div>
                            </div>
                            <div class="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.check-health" />
                                    </b>
                                </div>
                                <div class="subs-title sub-menu">
                                    <div class="sub-menu-item">Option </div>
                                    <div class="sub-menu-item">Option </div>
                                    <div class="sub-menu-item">Option </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div class="dropdown">
                                <div class="support">
                                    <i class="fas fa-question-circle"></i>
                                    <FormattedMessage id="homeheader.support" />
                                    <div class="language-dropdown">
                                        <div class={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                            <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>Việt Nam</span>
                                        </div>
                                        <div class={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                            <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>English</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="avatar-profile mx-10"
                                style={{
                                    backgroundImage: `url(${this.state.previewImgURL ? this.state.previewImgURL : ''})`,
                                }}
                            ></div>

                            <div className="menu-home-header">
                                <MenuHomeHeader />
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="content-up position-relative">
                            <div
                                class="position-absolute"
                                style={{
                                    bottom: '40%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                }}
                            >
                                <div className="title1">
                                    <FormattedMessage id="banner.title1" />
                                </div>
                                <div className="title2">
                                    <FormattedMessage id="banner.title2" />
                                </div>
                            </div>
                        </div>
                        <div className="search" onClick={() => this.handleClickShowHomeMenuSearchSpecialty()}>
                            <i className="fas fa-search"></i>
                            <FormattedMessage id="banner.search">
                                {(placeholder) => <input type="text" placeholder={placeholder} />}
                            </FormattedMessage>

                            {this.state.showMenuSearchSpecialty && (
                                <HomeMenuSearchSpecialty showMenuSearchSpecialty={this.state.showMenuSearchSpecialty} />
                            )}
                        </div>
                    </div>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
