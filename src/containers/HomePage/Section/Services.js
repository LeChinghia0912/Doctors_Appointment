import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Services.scss';

const Services = ({ isLoggedIn, language }) => {
    const servicesData = [
        { icon: 'fa-hospital-alt', messageId: 'banner.child1' },
        { icon: 'fa-mobile-alt', messageId: 'banner.child2' },
        { icon: 'fa-procedures', messageId: 'banner.child3' },
        { icon: 'fa-flask', messageId: 'banner.child4' },
        { icon: 'fa-user-md', messageId: 'banner.child5' },
        { icon: 'fa-briefcase-medical', messageId: 'banner.child6' },
    ];

    return (
        <div className="content-down py-30">
            <div className="options">
                {servicesData.map((service, index) => (
                    <div className="option-child" key={index}>
                        <div className="icon-child">
                            <i className={`fas ${service.icon}`}></i>
                        </div>
                        <div className="text-child">
                            <FormattedMessage id={service.messageId} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Services);
