import React from 'react';
// import { Icon, Button } from 'react-materialize';
// import { getFirestore } from 'redux-firestore';

class ControlCard extends React.Component {
    
    createControl() {
        var control = {
            "key": "",
            "type": "",
            "text": "",
            "fontSize": 14,
            "backgroundColor": "",
            "fontColor": "black",
            "borderColor": "black",
            "borderWidth": "",
            "borderRadius": "", 
            "width": "",
            "height": "",
            "x": 0,
            "y": 0
        }
        return control;
    }

    createContainer() {
        var container = this.createControl();
        container["type"] = "container";
        container["borderWidth"] = 2;
        container["backgroundColor"] = "white";
        container["width"] = 140;
        container["height"] = 80;
        return container;
    }

    createLabel() {
        var label = this.createControl();
        label["type"] = "label";
        label["text"] = "Prompt for Input:";
        label["borderWidth"] = 0;
        label["width"] = 110;
        label["height"] = 24;
        return label;
    }

    createButton() {
        var button = this.createControl();
        button["type"] = "button";
        button["text"] = "Submit";
        // button["textAlign"] = "center";
        button["borderWidth"] = 2;
        button["borderRadius"] = 2;
        button["fontSize"] = 20;
        button["backgroundColor"] = "grey";
        button["width"] = 110;
        button["height"] = 30;
        return button;
    }

    createTextfield() {
        var textfield = this.createControl();
        textfield["type"] = "textfield";
        textfield["text"] = "Input";
        textfield["borderWidth"] = 2;
        textfield["borderRadius"] = 2;
        textfield["fontSize"] = 14;
        textfield["fontColor"] = "gray";
        textfield["backgroundColor"] = "white";
        textfield["width"] = 180;
        textfield["height"] = 24;
        return textfield;
    }

    addItem = (type) => {
        // console.log(type);
        var itemList = this.props.items;
        // console.log(itemList);
        // var itemKey = this.createItemKey();
        var itemOptions = ["container", "label", "button", "textfield"];
        var data;
        if (type == itemOptions[0]) {
            data = this.createContainer();
        } else if (type == itemOptions[1]) {
            data = this.createLabel();
        } else if (type == itemOptions[2]) {
            data = this.createButton();
        } else if (type == itemOptions[3]) {
            data = this.createTextfield();
        } else {
            return "";
        }

        itemList.push(data);
        this.props.updateItems(itemList);
        /*
        this.setState({
            items: itemList
        });
        */
    }

    createItem = (data) => {
        var type = data["type"];
        var pad = "";
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
            fontSize: data["fontSize"] + "px",
            backgroundColor: data["backgroundColor"],
            color: data["fontColor"],
            borderStyle: "solid",
            borderColor: data["borderColor"],
            borderWidth: data["borderWidth"],
            borderRadius: data["borderRadius"],
            // position: "absolute",
            position: pos, 
            textAlign: textAlign,
            left: data["x"],
            top: data["y"],
            paddingLeft: pad
        }}>
            {data["text"]}
        </div>
    }

    controlCard = (type) => {
        var controlOptions = ["container", "label", "button", "textfield"];
        var control;
        var prompt = "";
        if (type == controlOptions[0]) {
            control = this.createItem(this.createContainer());
            prompt = "Container";
        } else if (type == controlOptions[1]) {
            control = this.createItem(this.createLabel());
            prompt = "Label";
        } else if (type == controlOptions[2]) {
            control = this.createItem(this.createButton());
            prompt = "Button";
        } else if (type == controlOptions[3]) {
            control = this.createItem(this.createTextfield());
            prompt = "Textfield";
        } else {
            return "";
        }
        return (<div className="control_card">
            <div className="preview_control">
                {control}
            </div>
            <div className="control_prompt">{prompt}</div>
            <button className="button" onClick={() => this.addItem(type)}>
                Add {prompt}
            </button>
        </div>);
    }
    
    /*
    updateItemIds() {
        var itemList = this.props.todoList.items;
        for (var i = 0; i < itemList.length; i++) {
            itemList[i].id = i;
            // console.log(itemList[i]);
        }
    }
    */

    /*
    deleteItem = e => {
        e.preventDefault();
        const { item } = this.props;
        var itemList = this.props.todoList.items;
        itemList.splice(itemList.indexOf(item), 1); // remove item from list
        // update the store
        this.updateItemIds();
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({
            items: itemList,
        });
    }
    */

    render() {
        const type = this.props.type;
        return (
            this.controlCard(type)
        );
    }
}
export default ControlCard;