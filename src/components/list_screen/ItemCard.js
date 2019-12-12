import React from 'react';
import { Icon, Button } from 'react-materialize';
import { getFirestore } from 'redux-firestore';

class ItemCard extends React.Component {

    updateItemIds() {
        var itemList = this.props.todoList.items;
        for (var i = 0; i < itemList.length; i++) {
            itemList[i].id = i;
            // console.log(itemList[i]);
        }
    }

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

    render() {
        const { item } = this.props;
        if (item.completed) {
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
        } else {
            return (
                <div className="list_item_card card z-depth-0 todo-list-link yellow lighten-4">
                    <div className="card-content grey-text text-darken-3 row">
                        <div className="col s4">
                            <div className="list_item_card_title card-title">{item.description}</div>
                            <div className="card-assigned">Assigned to: {item.assigned_to}</div>
                        </div>
                        <div className="card-due col s3">{item.due_date}</div>
                        <div className="card-completed col s3">
                            <div className='list_item_card_not_completed'>Pending</div>
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
}
export default ItemCard;