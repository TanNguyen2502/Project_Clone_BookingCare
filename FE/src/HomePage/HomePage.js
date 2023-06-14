import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Specialty from './Specialty/Specialty';
import MedicalFacility from './MedicalFacility/MedicalFacility';
import OutStandingDoctor from './OutStandingDoctor/OutStandingDoctor';
import About from './About/About';
import Footer from './Footer/Footer';
import './HomePage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
    render(){
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
        };
        return(
            <div>
                <Header isShowBanner = { true } />
                <Specialty settings = { settings } />
                <MedicalFacility settings = { settings } />
                <OutStandingDoctor settings = { settings } />
                <About />
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);