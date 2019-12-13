import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button } from 'react-materialize';

class EditScreen extends Component {
    state = {
        name: '',
        user: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        // update the store
        const fireStore = getFirestore();
        fireStore.collection('wireframeList').doc(this.props.wireframe.id).update({
            [target.id]: target.value,
        });
    }

    /*
    addItem = () => {
        var itemList = this.props.todoList.items;
        // var itemKey = this.createItemKey();
        this.props.history.push('/todolist/' + this.props.todoList.id + '/' + itemList.length); // go to new item screen
    }
    */

    /*
    confirmDeleteList = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframeList').doc(this.props.wireframe.id).delete();
        this.props.history.push('/'); // go to home screen
    }
    */

    initializeWireframe = () => {
        const wireframe = this.props.wireframe;
        return <div className="sandbox_wireframe" style={{
            height: wireframe.height + "px",
            width: wireframe.width + "px",
            position: "relative"
        }}>
            {wireframe.width}x{wireframe.height}
            {this.initializeItems()}
        </div>
    }

    initializeItems = () => {
        const wireframe = this.props.wireframe;
        var i = 0;
        var divItems = [];
        for (i = 0; i < wireframe.items.length; i++) {
            divItems.push(this.createItem(wireframe.items[i]));
        }
        return divItems;
    }

    createItem = (data) => {
        /*
            "key": 0,
            "type": "container",
            "text": "testing1234",
            "font-size": 12,
            "background-color": "blue",
            "font-color": "red",
            "border-color": "yellow",
            "border-thickness": 3,
            "border-radius": 2, 
            "width": 100,
            "height": 300,
            "posX": 22,
            "posY": 30
        */
        var type = data["type"];
        return <div className={{type}} style={{
            height: data["height"] + "px",
            width: data["width"] + "px",
            fontSize: data["font-size"] + "px",
            backgroundColor: data["background-color"],
            color: data["font-color"],
            borderStyle: "solid",
            borderColor: data["border-color"],
            borderWidth: data["border-thickness"],
            borderRadius: data["border-radius"],
            position: "absolute",
            left: data["posX"],
            top: data["posY"]
        }}>
            {data["text"]}
        </div>
    }

    render() {
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        // console.log(wireframe.name);
        return (
            // left col = small tool bar, control list
            // middle = wireframe
            // right col = control properties (current)
            <div className="edit_container row">
                <div className="edit_options_left col s2">
                    <div className="edit_name row red">
                        Name: {wireframe.name}
                    </div>
                    <div className="control_list row brown">
                        list
                    </div>
                </div>
                <div className="edit_wireframe col s8 green">
                    {this.initializeWireframe()}
                </div>
                <div className="edit_options_right col s2">
                    <div className="edit_toolbar row red">
                        tool
                    </div>
                    <div className="edit_control_properties row purple">
                        properties
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { wireframeList } = state.firestore.data;
    const wireframe = wireframeList ? wireframeList[id] : null;
    wireframe.id = id;

    return {
        wireframe,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'wireframeList' },
    ]),
)(EditScreen);