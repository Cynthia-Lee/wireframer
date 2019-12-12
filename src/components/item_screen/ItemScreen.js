/*
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ItemScreen extends Component {
    state = {
        description: this.props.item.description,
        assigned_to: this.props.item.assigned_to,
        due_date: this.props.item.due_date,
        completed: this.props.item.completed
    }

    handleChange = (e) => {
        const { target } = e;

        if (target.id == "completed") {
            this.setState(state => ({
                ...state,
                [target.id]: target.checked
            }));
        } else {
            this.setState(state => ({
                ...state,
                [target.id]: target.value,
            }));
        }
    }

    createItemKey() {
        var i;
        for (i = 0; i < this.props.todoList.items.length; i++) {
            if ((this.props.todoList.items.find(function (item) { return item.key == i })) == null) { // true if found
                return i;
            }
        }
        return i;
    }

    editItem = () => {
        const { item } = this.props;
        var itemList = this.props.todoList.items;

        if (item.key == undefined) {
            item.key = this.createItemKey();
            // item.key = item.id; // key
        }

        item.description = this.state.description;
        item.assigned_to = this.state.assigned_to;
        item.due_date = this.state.due_date;
        item.completed = this.state.completed;

        itemList[item.id] = item;

        // update the store
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({
            items: itemList,
        });
        this.props.history.goBack();
    }

    cancelEditItem = () => {
        this.props.history.goBack();
    }

    render() {
        // const todoList = this.props.todoList;
        // const { item } = this.props;

        return (
            <div id="todo_item" className="container white">
                <div id="todo_item_content" className="">
                    <h5 id="item_heading" className="grey-text text-darken-3 list_screen_header">Item</h5>
                    <div className="item_input">
                        <div className="input-field">
                            <label id="description_prompt" className="active">Description:</label>
                            <input className="active" type="text" name="description" id="description" onChange={this.handleChange} value={this.state.description} />
                        </div>

                        <div className="input-field">
                            <label id="assigned_to_prompt" className="active">Assigned To:</label>
                            <input className="active" type="text" name="assigned_to" id="assigned_to" onChange={this.handleChange} value={this.state.assigned_to} />
                        </div>

                        <div className="input-field">
                            <label id="due_date_prompt" className="active">Due Date:</label>
                            <input className="active" type="date" name="due_date" id="due_date" onChange={this.handleChange} value={this.state.due_date} />
                        </div>

                        <label className="checkbox_field row">
                            <input type="checkbox" className="col filled-in" name="completed" id="completed" onChange={this.handleChange} checked={this.state.completed} />
                            <span className="col" id="completed_prompt">Completed</span>
                        </label>

                        <div className="item_screen_buttons row">
                            <div className="col">
                                <a className="waves-effect waves-light btn" onClick={this.editItem}><i className="material-icons left">mode_edit</i>Submit</a>
                            </div>
                            <div className="col">
                                <a className="waves-effect waves-light btn" onClick={this.cancelEditItem}><i className="material-icons left">close</i>Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    todoList.id = id;

    const { itemId } = ownProps.match.params;
    // console.log(itemId);
    var check = todoList.items[itemId];
    // console.log(check);
    const item = check == undefined ?
        {
            "description": "",
            "due_date": "",
            "assigned_to": "",
            "completed": false
        } : todoList.items[itemId];
    // console.log(item);
    item.id = itemId;

    return {
        item,
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemScreen);
*/