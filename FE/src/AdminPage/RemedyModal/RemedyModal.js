import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './RemedyModal.css';
import { Modal, Button, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import { CommonUtils } from '../../utils';

class RemedyModal extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
        }
    }

    async componentDidMount(){
        if(this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.dataModal !== prevProps.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }

    render(){

        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;

        return(
            <Modal  isOpen={isOpenModal} 
                    className={'booking-modal-container'} 
                    size='md'
                    centered >
                    <div className="modal-header">
                        <h5 className="modal-title"> Gửi hóa đơn khám bệnh thành công! </h5>
                        <button type="button" className="close" aria-label='close' onClick={closeRemedyModal}>
                            <span aria-hidden="true"> x </span>
                        </button>
                    </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label> Email bệnh nhân </label>
                            <input  className='form-control'
                                    type="email"
                                    onChange={(event) => { this.handleOnchangeEmail(event)}}
                                    value={this.state.email} />
                        </div>
                        <div className="col-6 form-group">
                            <label> Chọn file đơn thuốc </label>
                            <input  className='form-control-file'
                                    type="file"
                                    onChange={(event) => this.handleOnChangeImage(event)} />
                        </div>
                    </div> 
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {this.handleSendRemedy()}}> Send </Button> 
                    {' '}
                    <Button color="secondary" onClick={closeRemedyModal}> Cancel </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
return {};
};

const mapDispatchToProps = dispatch => {
return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);