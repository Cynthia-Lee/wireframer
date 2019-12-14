import React from 'react';
import { Icon, Button } from 'react-materialize';
import { getFirestore } from 'redux-firestore';

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
        container["width"] = 300;
        container["height"] = 200;
        return container;
    }

    createLabel() {
        var label = this.createControl();
        label["type"] = "label";
        label["border-thickness"] = 0;
        label["width"] = 300;
        label["height"] = 24;
        return label;
    }

    createButton() {
        var button = this.createControl();
        button["type"] = "button";
        button["text"] = "Submit";
        button["border-thickness"] = 2;
        button["border-radius"] = 2;
        button["font-size"] = 20;
        button["background-color"] = "grey";
        button["width"] = 100;
        button["height"] = 40;
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
        textfield["width"] = 100;
        textfield["height"] = 40;
        return textfield;
    }

    controlCard = (item) => {
        var itemOptions = ["container", "label", "button", "textfield"];
        if (item == itemOptions[0]) {
            //return this.props.createItem(this.createContainer());
        } else if (item == itemOptions[1]) {
            // return <div className="purple">second</div>
            // return this.props.createItem(this.createLabel());
        } else if (item == itemOptions[2]) {
            // return this.props.createItem(this.createButton());
        } else if (item == itemOptions[3]) {
            // return this.props.createItem(this.createTextfield());
        }
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

    /*
    moveDownItem = e => {
        e.preventDefault();
        const { item } = this.props;
        var itemList = this.props.todoList.items;
        var itemIndex = itemList.indexOf(item); // swap
        let temp = itemList[itemIndex + 1];
        itemList[itemIndex + 1] = item;
        itemList[itemIndex] = temp;
        // update the store
        item.id = itemIndex + 1;
        temp.id = itemIndex;
        // this.updateItemIds();
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({
            items: itemList,
        });
    }

    moveUpItem = e => {
        e.preventDefault();
        const { item } = this.props;
        var itemList = this.props.todoList.items;
        var itemIndex = itemList.indexOf(item); // swap
        let temp = itemList[itemIndex - 1];
        itemList[itemIndex - 1] = item;
        itemList[itemIndex] = temp;
        // update the store
        item.id = itemIndex - 1;
        temp.id = itemIndex;
        // this.updateItemIds();
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({
            items: itemList,
        });
    }
    */

    render() {
        const item = this.props.item;
        return (
            <div className="control_card">
                {this.controlCard(item)}  
            </div>
        );
    }
}
export default ControlCard;