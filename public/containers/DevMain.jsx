import React,{PropTypes} from 'react';
import DevNavbar from '../components/DevNavbar.jsx';
import DevSidebar from '../components/DevSidebar.jsx';
import DevBody from '../components/DevBody.jsx';
import '../css/style.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions'
import axios from 'axios';
import {apihost} from '../constants/global';
// import Pusher from 'pusher';
import Pusher from 'pusher-js';
import {toastr} from 'react-redux-toastr';

var pusher, channel1,channel2;

class DevMain extends React.Component {
    constructor(props){
        super(props);
        this.getPost = this.getPost.bind(this);
    };
    componentWillMount() {
        var _this = this;
        axios.get(apihost + '/login').then(function(response){
            if(response.data.status === "fail") {
                _this.context.router.push('/');
            } else {
                axios.get(apihost + '/post').then(function (response) {
                    if(response.data.status === "fail") {
                        _this.context.router.push('/');
                    } else {
                        _this.props.actions.getRequests(response.data.content,response.data.length);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }).catch(function (error) {
            console.log(error);
        });

    };
    componentDidMount() {
        var _this = this;
        pusher = new Pusher('dbcd20122522e32d0f31', {
            encrypted: true
        });

        channel1 = pusher.subscribe('request-channel');
        channel1.bind('request-event', function(data) {
            if(data.message === "update") {
                _this.getPost();
            }
        });
        channel2 = pusher.subscribe('logout-channel');
        channel2.bind('logout-event', function(data) {
            if(data.message === "logout") {
                _this.logOut();
                toastr.info("Session expired.","Please log in again");
            }
        });
    };
    componentWillUnmount() {
        // alert("hello");
        pusher.unsubscribe('request-channel');
        pusher.unsubscribe('logout-channel');
    };
    getPost() {
        var _this = this;
        axios.get(apihost + '/post').then(function (response) {
            if(response.data.status === "fail") {
                _this.context.router.push('/');
            } else {
                _this.props.actions.getRequests(response.data.content,response.data.length);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    logOut() {
        var _this = this;
        axios.get(apihost + '/logout').then(function (response) {
            console.log(response);
            _this.context.router.push('/');
            //error handling needed here
        }).catch(function (error) {
            console.log(error);
        });
        this.props.actions.logout();
    };
    render() {
        return (
            <div>
                <DevNavbar {...this.props} handleLogout={this.logOut.bind(this)}/>
                <div id="DevMainstyle">
                    <DevSidebar {...this.props}/>
                    <DevBody {...this.props} />
                </div>
            </div>

        )
    }
}




const mapStateToProps = state => ({
    showModal: state.showModal,
    userInfo: state.userInfo,
    requestsInfo: state.requestsInfo
})

DevMain.propTypes = {
    showModal: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    requestsInfo: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})
DevMain.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default connect(mapStateToProps,mapDispatchToProps)(DevMain);
