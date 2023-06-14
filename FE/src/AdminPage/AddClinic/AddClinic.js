import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './AddClinic.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../utils';
import { createNewClinic } from '../../services';

const mdParser = new MarkdownIt;

class AddClinic extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            address: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            name: '',
            imageBase64: ''
        }
    }

    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state);
        if(res && res.errCode === 0){
            alert('Thêm phòng khám thành công!');
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else{
            alert('Thêm phòng khám thất bại...')
        }
    }

    render(){
        return(
            <div className="manage-specialty-container">
                <div className="ms-title"> Thêm phòng khám </div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label> Tên phòng khám </label>
                        <input  className="form-control" 
                                type="text" 
                                value={this.state.name} 
                                onChange={(event) => this.handleOnchangeInput(event, 'name')} />
                    </div>
                    <div className="col-6 form-group">
                        <label> Ảnh phòng khám </label>
                        <input  className="form-control-fle" 
                                type="file" 
                                onChange={(event) => this.handleOnChangeImage(event)} />
                    </div>
                    <div className="col-6 form-group">
                        <label> Địa chỉ phòng khám </label>
                        <input  className="form-control" 
                                type="text" 
                                onChange={(event) => this.handleOnchangeInput(event, 'address')} />
                    </div>
                    <div className="col-12">
                        <MdEditor   style={{ height: '300px' }} 
                                    renderHTML={text => mdParser.render(text)}  
                                    onChange={this.handleEditorChange} 
                                    value={this.state.descriptionMarkdown} />
                    </div>
                    <div className="col-12">
                        <button className="btn-save-specialty"
                                onClick={() => this.handleSaveNewClinic()}> 
                            Save
                        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddClinic);
