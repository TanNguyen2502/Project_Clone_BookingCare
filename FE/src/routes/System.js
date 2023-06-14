import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageUser from '../AdminPage/ManageUser/ManageUser';
import Header from '../AdminPage/Header/Header';
import AddDoctor from '../AdminPage/AddDoctor/AddDoctor';
import AddSpecialty from '../AdminPage/AddSpecialty/AddSpecialty';
import AddClinic from '../AdminPage/AddClinic/AddClinic';
import ManageSchedule from '../AdminPage/ManageSchedule/ManageSchedule';
import ManagePatient from '../AdminPage/ManagePatient/ManagePatient';

class System extends Component {
    render() {

        const { systemMenuPath } = this.props;

        return (
            <>
                { <Header /> }
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-redux" component={ManageUser} />
                            <Route path="/system/manage-doctor" component={AddDoctor} />
                            <Route path="/system/manage-schedule" component={ManageSchedule} />
                            <Route path="/system/manage-patient" component={ManagePatient} />
                            <Route path="/system/manage-specialty" component={AddSpecialty} />
                            <Route path="/system/manage-clinic" component={AddClinic} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />)}} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
