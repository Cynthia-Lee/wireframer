import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks'
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {

    handleNewWireframe = () => {
        // adding new list to the firestore
        const fireStore = getFirestore();

        // new Date().getTime();
        var currentDate = new Date();
        var timestamp = currentDate.getTime();

        // "user", "name", "width", "height", items
        fireStore.collection('wireframeList').add({
            user: this.props.auth.uid,
            name: "",
            width: "500",
            height: "500",
            items: [],
            time: timestamp
        }).then(ref => {
            this.props.history.push('/wireframe/' + ref.id); // go to new list screen
        });
    }

    /*
    confirmDeleteList = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframeList').doc(this.props.wireframe.id).delete();
        this.props.history.push('/'); // go to home screen
    }
    */

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <WireframeLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            Wireframer
                        </div>

                        <div className="home_new_list_container">
                            <button className="home_new_list_button" onClick={this.handleNewWireframe}>
                                Create a New Wireframe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'wireframeList', orderBy: ['time', 'desc'] },
    ]),
)(HomeScreen);