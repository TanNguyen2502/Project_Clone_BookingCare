import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.css';
import DatePicker from '../../components/DatePicker';
import { getAllPatientForDoctor, postSendRemedy } from '../../services';
import moment from 'moment';
import { LANGUAGES } from '../../utils';
import RemedyModal from '../RemedyModal/RemedyModal';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }

    async componentDidMount(){
        this.getDataPatient()
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            // doctorId: user.id,
            date: formatedDate
        })
        if(res && res.errCode === 0){
            this.setState({
                dataPatient: res.data
            })
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        });
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        });
        if(res && res.errCode === 0){
            this.setState({
                isShowLoading: false
            })
            alert('Gửi hóa đơn thành công!');
            this.closeRemedyModal();
            await this.getDataPatient();
        } else{
            this.setState({
                isShowLoading: false
            });
            alert('Gửi hóa đơn thất bại!');
            console.log('error send remedy:', res);
        }
    }

    render(){

        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;

        return(
            <>
                <LoadingOverlay active={this.state.isShowLoading} 
                                spinner
                                text='Loading...'>
                <div className='manage-patient-container'>
                    <div className='m-p-title'> Quản lý bệnh nhân khám bệnh </div>
                    <div className="manage-patient-body row">
                        <div className='col-4 form-group'>
                            <label> Chọn ngày khám </label>
                            <DatePicker value={this.state.currentDate} 
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control" />
                        </div>
                        <div className="col-12 table-manage-patient">
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th> STT </th>
                                        <th> Thời gian </th>
                                        <th> Họ và tên </th>
                                        <th> Địa chỉ </th>
                                        <th> Giới tính </th>
                                        <th> Actions </th>
                                    </tr>
                                    { dataPatient && dataPatient.length > 0 ? 
                                        dataPatient.map((item, index) => {
                                            let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                            let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                            return(
                                                <tr key={index}>
                                                    <td> {index + 1} </td>
                                                    <td> {time} </td>
                                                    <td> {item.patientData.firstName} </td>
                                                    <td> {item.patientData.address} </td>
                                                    <td> {gender} </td>
                                                    <td>
                                                        <button className="mp-btn-confirm" 
                                                                onClick={() => this.handleBtnConfirm(item)}> 
                                                            Xác nhận
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    :
                                        <tr> 
                                            <td colSpan="6" style={{ textAlign: "center" }}> No Data </td> 
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <RemedyModal    isOpenModal={isOpenRemedyModal}
                                dataModal={dataModal} 
                                closeRemedyModal={this.closeRemedyModal} 
                                sendRemedy={this.sendRemedy} />
                </LoadingOverlay>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
