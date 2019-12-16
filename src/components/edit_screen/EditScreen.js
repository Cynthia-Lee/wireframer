import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button, Icon } from 'react-materialize';
import ControlList from './ControlList';
import { Rnd } from "react-rnd";

class EditScreen extends Component {
    constructor(props) {
        super(props);
        this.processCtrlD = this.processCtrlD.bind(this);
        this.processDelete = this.processDelete.bind(this);
    }

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
        zoom: 1,

        currElement: "",
        text: "",
        fontSize: "",
        backgroundColor: "",
        fontColor: "",
        borderColor: "",
        borderWidth: "",
        borderRadius: "",

        showModal: false
    }
    // seperating state and database wireframe
    // state will hold current changes, not changing database wireframe
    // only will change database wireframe after click "Save"

    processCtrlD(event) {
        if (event.ctrlKey && event.keyCode === 68) { // control & D
            event.preventDefault(); // do not trigger browser bookmark
            if (this.state.currElement) {
                var copy = {};
                // console.log(this.state.currElement);
                for (var key in this.state.currElement) {
                    copy[key] = this.state.currElement[key];
                }
                copy["x"] = copy["x"] + 100;
                copy["y"] = copy["y"] + 100;
                // console.log(copy);
                this.state.items.push(copy);
                this.setState({
                    currElement: copy
                });
            }
        }
    }

    processDelete(event) {
        if (event.keyCode === 46) { // delete key
            if (this.state.currElement) {
                const items = this.state.items;
                items.splice((items.indexOf(this.state.currElement)), 1);
                this.setState({
                    currElement: ""
                });
            }
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.processCtrlD, false);
        document.addEventListener("keydown", this.processDelete, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.processCtrlD, false);
        document.addEventListener("keydown", this.processDelete, false);
    }

    updateItems = (data) => {
        this.setState({
            items: data
        });
    }

    checkEdited = () => {
        // let sameItems = JSON.stringify(this.props.wireframe.items) == JSON.stringify(this.state.items);
        if ((this.props.wireframe.width != this.state.width) | (this.props.wireframe.height != this.state.height)) {
            return true;
        }
        let sameItems = (this.props.wireframe.items.length == this.state.items.length);
        if (!sameItems) {return true}
        var i;
        for (i = 0; i < this.props.wireframe.items.length; i++) {
            let a = this.props.wireframe.items[i];
            let b = this.state.items[i];
            for (var key in a) {
                if (a[key] != b[key]) {
                    return true;
                }
            }
        }
        return false;
    }

    handleClose = () => {
        // console.log(this.checkEdited());
        // show modal // if it was edited, prompt the modal
        this.setState({
            showModal: this.checkEdited()
        });
        if (!this.checkEdited()) { 
            this.close();
        }
    }

    confirmClose = () => {
        this.close();
    }

    cancelClose = () => {
        this.setState({
            showModal: false
        });
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleDimensionChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }), function () { this.checkDimensions() });
    }

    handleClick = (e) => {
        const { target } = e;
        // console.log(target);
        // console.log(target.id);
        if (target.id != "control") {
            this.setState({
                currElement: "",
                text: "",
                fontSize: "",
                backgroundColor: "",
                fontColor: "",
                borderColor: "",
                borderWidth: "",
                borderRadius: ""
            });
        } else {
            // console.log("CONTROL");
        }
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
    }

    handlePropChange = (e, prop) => {
        // value={this.state.currElement.backgroundColor} // in the div
        let ele = this.state.currElement;
        // this.state.currElement.backgroundColor = e.target.value
        // ele.backgroundColor = e.target.value; 
        // this.setState({currElement: ele}); // set the currElement
        if (prop == "text") {
            ele.text = e.target.value; 
        } else if (prop == "fontSize") {
            ele.fontSize = e.target.value; 
        } else if (prop == "backgroundColor") {
            ele.backgroundColor = e.target.value; 
        } else if (prop == "fontColor") {
            ele.fontColor = e.target.value; 
        } else if (prop == "borderColor") {
            ele.borderColor = e.target.value; 
        } else if (prop == "borderWidth") {
            ele.borderWidth = e.target.value; 
        } else if (prop == "borderRadius") {
            ele.borderRadius = e.target.value; 
        }
        this.setState({currElement: ele});
    }

    initializeProperties = () => {
        const element = this.state.currElement;
        if (element) {
            var divList = [];
            // var properties = Object.keys(this.state.currElement);
            var properties = ["text", "fontSize", "backgroundColor", "fontColor", "borderColor", "borderWidth", "borderRadius"];
            if (element.type == "container") {
                properties.splice(0, 2); // containers do not have text
                properties.splice(1, 1); // remove fontColor
            }
            // container, label, button, textfield
            var i;
            for (i = 0; i < properties.length; i++) {
                var prompt;
                var promptField;
                if (properties[i] == "text") {
                    prompt = ""; // text input
                    promptField = <input type="text" className={properties[i] + "_prop_field"} name="text" id="text" value={this.state.currElement.text} onChange={(e) => this.handlePropChange(e, "text")}></input>;
                } else if (properties[i] == "fontSize") {
                    prompt = "Font Size:"; // number input
                    promptField = <input type="number" className={properties[i] + "_prop_field"} name="fontSize" id="fontSize" value={this.state.currElement.fontSize} onChange={(e) => this.handlePropChange(e, "fontSize")}></input>;
                } else if (properties[i] == "backgroundColor") {
                    prompt = "Background Color:"; // color picker
                    promptField = <input type="color" className={properties[i] + "_prop_field"} name="backgroundColor" id="backgroundColor" value={this.state.currElement.backgroundColor} onChange={(e) => this.handlePropChange(e, "backgroundColor")}></input>;
                } else if (properties[i] == "fontColor") {
                    prompt = "Font Color:"; // color picker
                    promptField = <input type="color" className={properties[i] + "_prop_field"} name="fontColor" id="fontColor" value={this.state.currElement.fontColor} onChange={(e) => this.handlePropChange(e, "fontColor")}></input>;
                } else if (properties[i] == "borderColor") {
                    prompt = "Border Color:"; // color picker
                    promptField = <input type="color" className={properties[i] + "_prop_field"} name="borderColor" id="borderColor" value={this.state.currElement.borderColor} onChange={(e) => this.handlePropChange(e, "borderColor")}></input>;
                } else if (properties[i] == "borderWidth") {
                    prompt = "Border Thickness:"; // number input
                    promptField = <input type="number" className={properties[i] + "_prop_field"} name="borderWidth" id="borderWidth" value={this.state.currElement.borderWidth} onChange={(e) => this.handlePropChange(e, "borderWidth")}></input>;
                } else if (properties[i] == "borderRadius") {
                    prompt = "Border Radius:"; // number input
                    promptField = <input type="number" className={properties[i] + "_prop_field"} name="borderRadius" id="borderRadius" value={this.state.currElement.borderRadius} onChange={(e) => this.handlePropChange(e, "borderRadius")}></input>;
                }
                var div = <div className={properties[i] + "_prop"}>
                    <div className={properties[i] + "_prop_prompt"}>{prompt}</div>
                    {promptField}
                </div>
                divList.push(div);
            }

            return divList;
        }
    }

    initializeWireframe = () => {
        return <div className="sandbox_wireframe" id="sandbox_wireframe" onClick={this.handleClick} style={{
            height: this.state.height + "px",
            width: this.state.width + "px",
            // transform: "scale(" + this.state.zoom + ")"
        }}>
            {this.initializeItems()}
        </div>
    }

    initializeItems = () => {
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

    handleControlMove = () => {
        this.setState(state => ({
            name: this.state.name
        }), function () { document.getElementById("sandbox_wireframe").click() });
        // document.getElementById(){"sandbox_wireframe"}.click()
    }

    createItem = (data) => {
        /*
            "key": 0,
            "type": "container",
            "text": "testing1234",
            "fontSize": 12,
            "backgroundColor": "blue",
            "fontColor": "red",
            "borderColor": "yellow",
            "borderWidth": 3,
            "borderRadius": 2, 
            "width": 100,
            "height": 300,
            "x": 22,
            "y": 30
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

        const style = {
            // height: data["height"] + "px",
            // width: data["width"] + "px",
            fontSize: data["fontSize"] + "px",
            backgroundColor: data["backgroundColor"],
            color: data["fontColor"],
            borderStyle: "solid",
            borderColor: data["borderColor"],
            borderWidth: data["borderWidth"] + "px",
            borderRadius: data["borderRadius"] + "px",
            position: pos,
            textAlign: textAlign,
            // left: data["x"],
            // top: data["y"],
            paddingLeft: pad
        }

        var element = <Rnd
            id="control"
            style={style}
            /*
            default={{
                x: data["x"],
                y: data["y"],
                width: data["width"],
                height: data["height"]
            }}
            */
            bounds="parent"
            size={{ width: data["width"], height: data["height"] }}
            position={{ x: data.x, y: data.y }}
            onDragStop={(e, d) => {
                data.x = d.x;
                data.y = d.y;
                this.handleControlMove();
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                data.width = ref.style.width;
                data.height = ref.style.height;
                // change position
                data.x = position.x;
                data.y = position.y;
                this.handleControlMove();
            }}
            onClick={(e, d) => {
                // most recently clicked?
                // data
                this.setState({
                    currElement: data,
                    text: data.text,
                    fontSize: data.fontSize,
                    backgroundColor: data.backgroundColor,
                    fontColor: data.fontColor,
                    borderColor: data.borderColor,
                    borderWidth: data.borderWidth,
                    borderRadius: data.borderRadius
                });
            }}
        >
            {data["text"]}
        </Rnd>

        return element;
    }

    zoomIn = () => {
        // console.log("Zoomed in 2x");
        this.setState({
            zoom: this.state.zoom * 2
        });
    }

    zoomOut = () => {
        this.setState({
            zoom: this.state.zoom * 0.5
        });
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

    close = () => {
        this.props.history.goBack();
    }

    render() {
        const auth = this.props.auth;
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
                    <ControlList createItem={this.createItem} items={this.state.items} updateItems={this.updateItems} />
                </div>

                <div className="wireframe_container col s8 white">
                    {this.initializeWireframe()}
                </div>
                <div className="edit_options_right col s2">
                    <div className="edit_toolbar row">
                        <div className="zoom_toolbar_button col" onClick={this.zoomIn}><i className="edit_toolbar_icon material-icons">zoom_in</i></div>
                        <div className="zoom_toolbar_button col" onClick={this.zoomOut}><i className="edit_toolbar_icon material-icons">zoom_out</i></div>
                        <button className="toolbar_button col" onClick={this.save}>Save</button>
                        <button className="toolbar_button col" onClick={this.handleClose}>Close</button>
                        
                        <Modal className="close_wireframe_modal" header="Close Wireframe?"
                            actions={
                                <div class="close_wireframe_modal">
                                    <div className="confirm_close_button modal-close waves-effect waves-light green btn-flat" onClick={this.confirmClose}><i className="material-icons left">check</i>Yes</div>
                                    <div className="modal-close waves-effect waves-light red btn-flat" onClick={this.cancelClose}><i className="material-icons left">close</i>No</div>
                                </div>
                            }
                            // trigger={<button className="toolbar_button col" onClick={this.handleClose}>Close</button>} 
                            open={this.state.showModal}
                            options={{ dismissible: false }}>
                            <div class="close_wireframe_modal_content">
                                <p>Are you sure you want to close this wireframe?</p>
                                <p>Your recent changes will not be saved.</p>
                            </div>
                        </Modal>


                    </div>
                    <div className="control_properties_container row">
                        <div className="control_properties">
                            <div className="properties_title">Properties</div>
                            {this.initializeProperties()}
                        </div>
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