import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.css';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../Redux/store/actions';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../utils';
import DatePicker from '../../components/DatePicker';
import moment from 'moment';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../services';

class ManageSchedule extends Component {

    constructor(props){
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount(){
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data = this.props.allScheduleTime;
            if(data && data.length >0){
                data = data.map(item => ({
                    ...item, isSelected: false
                }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if(!currentDate){
            alert('Chọn ngày không hợp lệ!');
            return;
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            alert('Chọn bác sĩ không hợp lệ!');
            return;
        }
        let formatedDate = new Date(currentDate).getTime();
        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            } else{
                alert('Chọn khung giờ không hợp lệ!');
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        })
        if(res && res.errCode === 0){
            alert('Lưu thành công!');
        } else{
            alert('Lưu thất bại!');
        }
    }

    render(){

        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate -1));

        return(
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container"> 
                    <div className="row">
                        <div className = "col-6 form-group">
                            <label> <FormattedMessage id="manage-schedule.choose-doctor" /> </label>
                            <Select value={this.state.selectedDoctor} 
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors} />
                        </div>
                        <div className="col-6 form-group">
                            <label> <FormattedMessage id="manage-schedule.choose-date" /> </label>
                            <DatePicker value={this.state.currentDate} 
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control" 
                                        minDate={yesterday} />
                        </div>
                        <div className="col-12 pick-hour-container">
                            { rangeTime && rangeTime.length > 0 && 
                                rangeTime.map((item, index) => {
                                    return(
                                        <button className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                                key={index}
                                                onClick={() => this.handleClickBtnTime(item)}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary btn-save-schedule"
                                    onClick={() => this.handleSaveSchedule()}>
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
