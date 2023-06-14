import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import social from '../../assets/images/Screenshot (73).png'

class About extends Component {
    render(){
        return(
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói gì về BookingCare
                </div>
                <div className="section-about-content"> 
                    <div className="content-left">
                        <iframe width="100%" height="400px" 
                                src="https://www.youtube.com/embed/FyDQljKtWnI" 
                                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" 
                                frameBorder="0" allow="accelerometer; 
                                autoplay; clipboard-write; encrypted-media; gyroscope; 
                                picture-in-picture; web-share" allowFullScreen>
                        </iframe>
                    </div>
                    <div className = "content-right">
                        <img src = { social } />
                    </div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
