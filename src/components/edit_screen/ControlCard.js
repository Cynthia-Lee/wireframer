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
        // const { item } = this.props;
        return (
            <div className="list_item_card card z-depth-0 todo-list-link light-green lighten-4">
                <div className="card-content grey-text text-darken-3 row">
                    <div className="col s4">
                        <div className="list_item_card_title card-title">{item.description}</div>
                        <div className="card-assigned">Assigned to: {item.assigned_to}</div>
                    </div>
                    <div className="card-due col s3">{item.due_date}</div>
                    <div className="card-completed col s3">
                        <div className='list_item_card_completed'>Completed</div>
                    </div>

                    <div className="col s2">
                        <Button
                            floating
                            fab={{ direction: 'left' }}
                            className="red"
                            large
                            icon={<Icon>more_horiz</Icon>}
                        >
                            {this.props.todoList.items.indexOf(item) == 0 ? <Button floating disabled icon={<Icon>arrow_upward</Icon>} onClick={this.moveUpItem} className="blue" /> : <Button floating icon={<Icon>arrow_upward</Icon>} onClick={this.moveUpItem} className="blue" />}
                            {this.props.todoList.items.indexOf(item) == this.props.todoList.items.length - 1 ? <Button floating disabled icon={<Icon>arrow_downward</Icon>} onClick={this.moveDownItem} className="green" /> : <Button floating icon={<Icon>arrow_downward</Icon>} onClick={this.moveDownItem} className="green" />}
                            <Button floating icon={<Icon>delete</Icon>} onClick={this.deleteItem} className="yellow darken-1" />
                        </Button>
                    </div>

                </div>
            </div>
        );
    }
}
export default ControlCard;