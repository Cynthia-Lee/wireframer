import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button, Icon } from 'react-materialize';
import ControlList from './ControlList';

class EditScreen extends Component {
    state = {
        name: this.props.wireframe.name,
        user: this.props.wireframe.user,
        width: this.props.wireframe.width,
        height: this.props.wireframe.height,
        disableDimensionChange: true
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
    handleState = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }
    */

    handleDimensionChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }), function () { this.checkDimensions() });
    }

    checkDimensions = () => {
        console.log(this.state.width);
        if (this.state.width < 1 || this.state.width > 5000 || this.state.height < 1 || this.state.height > 5000) {
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
        const wireframe = this.props.wireframe;
        wireframe.width = this.state.width;
        wireframe.height = this.state.height;


        // update the store
        const fireStore = getFirestore();
        fireStore.collection('wireframeList').doc(this.props.wireframe.id).update({
            width: wireframe.width,
            height: wireframe.height
        });

        /*
        // Non-integer dimension or integers smaller than 1 or 
        // larger than 5000 should be disregarded and should not update the diagram. 
        if (wireframe.width < 1 || wireframe.width > 5000 || wireframe.height < 1 || wireframe.height > 5000) {
            // invalid, disreguard
        } else {
            // update the store
            const fireStore = getFirestore();
            fireStore.collection('wireframeList').doc(this.props.wireframe.id).update({
                width: wireframe.width,
                height: wireframe.height
            });
        }
        */
    }

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
            {this.initializeItems()}
        </div>
    }

    initializeItems = () => {
        const wireframe = this.props.wireframe;
        var i = 0;
        var divItems = [];
        var d;
        for (i = 0; i < wireframe.items.length; i++) {
            d = wireframe.items[i];
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
                    <div className="wireframe_options row">
                        <div className="input-field edit_name">
                            <label className="active" htmlFor="email" id="name_prompt">Name</label>
                            <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={wireframe.name} />
                        </div>
                        <div className="input-field edit_size">
                            <label className="active" htmlFor="email" id="size_prompt">Width x Height</label>
                            <input className="active" type="number" name="width" id="width" onChange={this.handleDimensionChange} value={this.state.width} />
                            <input className="active" type="number" name="height" id="height" onChange={this.handleDimensionChange} value={this.state.height} />
                            <button className="update_dimensions_button button" onClick={this.changeDimensions} disabled={this.state.disableDimensionChange}>
                                Update
                            </button>
                        </div>
                    </div>
                    <ControlList createItem={this.createItem} />
                </div>
                <div className="edit_wireframe col s8 white">
                    {this.initializeWireframe()}
                </div>
                <div className="edit_options_right col s2">
                    <div className="edit_toolbar row red">
                        <div className="col" onClick={""}><i className="edit_toolbar_icon material-icons">zoom_in</i></div>
                        <div className="col" onClick={""}><i className="edit_toolbar_icon material-icons">zoom_out</i></div>
                        <div className="col">Save</div>
                        <div className="col">Close</div>
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