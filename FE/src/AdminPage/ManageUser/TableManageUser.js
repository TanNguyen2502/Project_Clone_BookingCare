import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../Redux/store/actions";
import './TableManageUser.css';
import ReactPaginate from "react-paginate";

class TableManageUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            usersRedux: [],
            PER_PAGE: 5,
            currentPage: 0
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listUsers !== this.props.listUsers){ 
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAusersRedux(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditFromParentKey(user);
    }

    handlePageClick(selectedPage) {
        this.setState({
            currentPage: selectedPage.selected
        })
    }
    
    render() {

        let arrUsers = this.state.usersRedux;
        const offset = this.state.currentPage * this.state.PER_PAGE;
        const pageCount = Math.ceil(arrUsers.length / this.state.PER_PAGE);

        return (
            <>
                <table id="TableManageUser"> 
                    <tbody>
                        <tr>
                            <th> Email </th>
                            <th> First name </th>
                            <th> Last name </th>
                            <th> Address </th>
                            <th> Actions </th>
                        </tr>
                        { arrUsers && arrUsers.length > 0 && 
                        arrUsers.slice(offset, offset + this.state.PER_PAGE).map((item, index) => {
                            return(
                                <tr key={index}>  
                                    <td> {item.email} </td> 
                                    <td> {item.firstName} </td> 
                                    <td> {item.lastName} </td> 
                                    <td> {item.address} </td> 
                                    <td>
                                        <button className="btn-edit"
                                                onClick={() => this.handleEditUser(item)}> 
                                            <i className="fas fa-pencil-alt"> </i>
                                        </button>
                                        <button className="btn-delete"
                                                onClick={() => this.handleDeleteUser(item)}>
                                            <i className="fas fa-trash"> </i> 
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    pageCount={pageCount}
                    onPageChange={(selected) => this.handlePageClick(selected)}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAusersRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
