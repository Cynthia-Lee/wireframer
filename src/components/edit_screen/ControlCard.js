import React from 'react';
// import { Icon, Button } from 'react-materialize';
// import { getFirestore } from 'redux-firestore';

class ControlCard extends React.Component {
    
    createControl() {
        var control = {
            "key": "",
            "type": "",
            "text": "",
            "font-size": 14,
            "background-color": "",
            "font-color": "black",
            "border-color": "black",
            "border-thickness": "",
            "border-radius": "", 
            "width": "",
            "height": "",
            "posX": 0,
            "posY": 0
        }
        return control;
    }

    createContainer() {
        var container = this.createControl();
        container["type"] = "container";
        container["border-thickness"] = 2;
        container["background-color"] = "white";
        container["width"] = 140;
        container["height"] = 80;
        return container;
    }

    createLabel() {
        var label = this.createControl();
        label["type"] = "label";
        label["text"] = "Prompt for Input:";
        label["border-thickness"] = 0;
        label["width"] = 110;
        label["height"] = 24;
        return label;
    }

    createButton() {
        var button = this.createControl();
        button["type"] = "button";
        button["text"] = "Submit";
        // button["textAlign"] = "center";
        button["border-thickness"] = 2;
        button["border-radius"] = 2;
        button["font-size"] = 20;
        button["background-color"] = "grey";
        button["width"] = 110;
        button["height"] = 30;
        return button;
    }

    createTextfield() {
        var textfield = this.createControl();
        textfield["type"] = "textfield";
        textfield["text"] = "Input";
        textfield["border-thickness"] = 2;
        textfield["border-radius"] = 2;
        textfield["font-size"] = 14;
        textfield["font-color"] = "gray";
        textfield["background-color"] = "white";
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

    controlCard = (type) => {
        var controlOptions = ["container", "label", "button", "textfield"];
        var control;
        var prompt = "";
        if (type == controlOptions[0]) {
            control = this.props.createItem(this.createContainer());
            prompt = "Container";
        } else if (type == controlOptions[1]) {
            control = this.props.createItem(this.createLabel());
            prompt = "Label";
        } else if (type == controlOptions[2]) {
            control = this.props.createItem(this.createButton());
            prompt = "Button";
        } else if (type == controlOptions[3]) {
            control = this.props.createItem(this.createTextfield());
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