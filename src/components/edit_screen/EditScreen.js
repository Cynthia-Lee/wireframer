import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button, Icon } from 'react-materialize';
import ControlList from './ControlList';

class EditScreen extends Component {
    /* 
    "key": 1,
    "user": "6Ky2ocJRtPW6270wXJbLZAwRamH3",
    "name": "Wireframe Name",
    "width": 400,
    "height": 700,
    "items": []
    */
    state = {
        // initial data from database
        key: this.props.wireframe.key,
        user: this.props.wireframe.user,
        name: this.props.wireframe.name,
        width: this.props.wireframe.width,
        height: this.props.wireframe.height,
        items: this.props.wireframe.items,

        checkWidth: this.props.wireframe.width,
        checkHeight: this.props.wireframe.height,
        disableDimensionChange: true,
        zoom: 1
    }
    // seperating state and database wireframe
    // state will hold current changes, not changing database wireframe
    // only will change database wireframe after click "Save"

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        /*
        // update the store
        const fireStore = getFirestore();
        fireStore.collection('wireframeList').doc(this.props.wireframe.id).update({
            [target.id]: target.value,
        });
        */
    }

    handleDimensionChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }), function () { this.checkDimensions() });
    }

    checkDimensions = () => {
        if (this.state.checkWidth < 1 || this.state.checkWidth > 5000 || this.state.checkHeight < 1 || this.state.checkHeight > 5000) {
            this.setState({
                disableDimensionChange: true
            });
        } else {
            this.setState({
                disableDimensionChange: false
            });
        }
    }

    changeDimensions = () => {
        this.setState({
            width: this.state.checkWidth,
            height: this.state.checkHeight
        });

        // console.log(this.state.width);
        // console.log(this.state.height);

        /*
        // update the store
        const fireStore = getFirestore();
        fireStore.collection('wireframeList').doc(this.props.wireframe.id).update({
            width: wireframe.width,
            height: wireframe.height
        });
        */
    }

    zoomIn = () => {
        // console.log("Zoomed in 2x");
        this.setState({
            zoom: this.state.zoom * 2
        });
        //}, function () { console.log(this.state.zoom); });
    }

    zoomOut = () => {
        this.setState({
            zoom: this.state.zoom * 0.5
        });
    }

    /*
    confirmDeleteList = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframeList').doc(this.props.wireframe.id).delete();
        this.props.history.push('/'); // go to home screen
    }
    */

    initializeWireframe = () => {
        // const wireframe = this.props.wireframe;
        return <div className="sandbox_wireframe" style={{
            height: this.state.height + "px",
            width: this.state.width + "px",
            transform: "scale(" + this.state.zoom + ")"
        }}>
            {this.initializeItems()}
        </div>
    }

    initializeItems = () => {
        // const wireframe = this.props.wireframe;
        var i = 0;
        var divItems = [];
        var d;
        for (i = 0; i < this.state.items.length; i++) {
            d = this.state.items[i];
            d["position"] = "absolute";
            divItems.push(this.createItem(d));
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
        var pad = "";
        // console.log(data["position"]);
        var pos = data["position"] ? data["position"] : "";
        var textAlign = data["textAlign"] ? data["textAlign"] : "";
        if (type == "button") { 
            textAlign = "center"; 
        } else {
            textAlign = "left";
        }
        if (type == "textfield") { pad = "5px"; }
        return <div className={type} style={{
            height: data["height"] + "px",
            width: data["width"] + "px",
            fontSize: data["font-size"] + "px",
            backgroundColor: data["background-color"],
            color: data["font-color"],
            borderStyle: "solid",
            borderColor: data["border-color"],
            borderWidth: data["border-thickness"],
            borderRadius: data["border-radius"],
            // position: "absolute",
            position: pos, 
            textAlign: textAlign,
            left: data["posX"],
            top: data["posY"],
            paddingLeft: pad
        }}>
            {data["text"]}
        </div>
    }

    save = () => {
        // update the store
        // save data from state to wireframe in the database
        // key, user
        // name, width, height, items
        const fireStore = getFirestore();
        fireStore.collection('wireframeList').doc(this.props.wireframe.id).update({
            name: this.state.name,
            width: this.state.width,
            height: this.state.height,
            items: this.state.items
        });
    }

    render() {
        const auth = this.props.auth;
        // const wireframe = this.props.wireframe;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            // left col = small tool bar, control list
            // middle = wireframe
            // right col = control properties (current)
            <div className="edit_container row">
                <div className="edit_options_left col s2">
                    <div className="wireframe_options row">
                        <div className="input-field edit_name">
                            <label className="active" htmlFor="email" id="name_prompt">Name</label>
                            <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={this.state.name} />
                        </div>
                        <div className="input-field edit_size">
                            <label className="active" htmlFor="email" id="size_prompt">Width x Height</label>
                            <input className="active" type="number" name="checkWidth" id="checkWidth" onChange={this.handleDimensionChange} value={this.state.checkWidth} />
                            <input className="active" type="number" name="checkHeight" id="checkHeight" onChange={this.handleDimensionChange} value={this.state.checkHeight} />
                            <button className="update_dimensions_button button" onClick={this.changeDimensions} disabled={this.state.disableDimensionChange}>
                                Update
                            </button>
                        </div>
                    </div>
                    <ControlList createItem={this.createItem} />
                </div>
                <div className="wireframe_container col s8 white">
                    {this.initializeWireframe()}
                </div>
                <div className="edit_options_right col s2">
                    <div className="edit_toolbar row">
                        <div className="zoom_toolbar_button col" onClick={this.zoomIn}><i className="edit_toolbar_icon material-icons">zoom_in</i></div>
                        <div className="zoom_toolbar_button col" onClick={this.zoomOut}><i className="edit_toolbar_icon material-icons">zoom_out</i></div>
                        <button className="toolbar_button col" onClick={this.save}>Save</button>
                        <button className="toolbar_button col">Close</button>
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