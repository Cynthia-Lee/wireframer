import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button } from 'react-materialize';

const ItemSortCriteria = {
    SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
    SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
    SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
    SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
    SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
    SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
};

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        currentItemSortCriteria: "default"
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        // update the store
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({
            [target.id]: target.value,
        });
    }

    addItem = () => {
        var itemList = this.props.todoList.items;
        // var itemKey = this.createItemKey();
        this.props.history.push('/todolist/' + this.props.todoList.id + '/' + itemList.length); // go to new item screen
    }

    confirmDeleteList = () => {
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).delete();
        this.props.history.push('/'); // go to home screen
    }

    /**
    * This method compares two items for the purpose of sorting according to what
    * is currently set as the current sorting criteria.
    * 
    */
    compare = (item1, item2) => {
        // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_DECREASING)) {
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
        // SORT BY ITEM DESCRIPTION
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)) {
            if (item1.description < item2.description)
                return -1;
            else if (item1.description > item2.description)
                return 1;
            else
                return 0;
        }
        // SORT BY DUE DATE
        else if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)) {
            let date1 = item1.due_date;
            let date2 = item2.due_date;
            if (date1 < date2)
                return -1;
            else if (date1 > date2)
                return 1;
            else
                return 0;
        }
        // SORT BY COMPLETED
        else {
            if (item1.completed < item2.completed)
                return -1;
            else if (item1.completed > item2.completed)
                return 1;
            else
                return 0;
        }
    }

    isCurrentItemSortCriteria = (testCriteria) => {
        return this.state.currentItemSortCriteria === testCriteria;
    }

    sortList = () => {
        const fireStore = getFirestore();
        fireStore.collection("todoLists").doc(this.props.todoList.id).update({
            sortCriteria: this.state.currentItemSortCriteria
        });
        // update the store
        let itemList = this.props.todoList.items.sort(this.compare);
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({
            items: itemList
        });
    }

    sortDescription = () => {
        // update the state
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
            this.setState({
                currentItemSortCriteria: ItemSortCriteria.SORT_BY_TASK_DECREASING
            }, function () { this.sortList() });
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            this.setState({
                currentItemSortCriteria: ItemSortCriteria.SORT_BY_TASK_INCREASING
            }, function () { this.sortList() });
        }
    }

    sortDueDate = () => {
        // update the state
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)) {
            this.setState({
                currentItemSortCriteria: ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING
            }, function () { this.sortList() });
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            this.setState({
                currentItemSortCriteria: ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING
            }, function () { this.sortList() });
        }
    }

    sortCompleted = () => {
        // update the state
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
            this.setState({
                currentItemSortCriteria: ItemSortCriteria.SORT_BY_STATUS_DECREASING
            }, function () { this.sortList() });
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            this.setState({
                currentItemSortCriteria: ItemSortCriteria.SORT_BY_STATUS_INCREASING
            }, function () { this.sortList() });
        }
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="list_container container white">
                <div className="list_screen_header row">
                    <div className="list_screen_title grey-text text-darken-3 col">Todo List</div>

                    <Modal className="delete_list_modal" header="Delete List?"
                        actions={
                            <div class="delete_list_modal_footer">
                                <div className="confirm_delete_button modal-close waves-effect waves-light green btn-flat" onClick={this.confirmDeleteList}><i className="material-icons left">check</i>Yes</div>
                                <div className="modal-close waves-effect waves-light red btn-flat"><i className="material-icons left">close</i>No</div>
                            </div>
                        }
                        trigger={<div className="right col" onClick={this.deleteList}><i className="medium material-icons">delete_forever</i></div>
                        } options={{ dismissible: false }}>
                        <div class="delete_list_modal_content">
                            <p>Are you sure you want to delete the list?</p>
                            <p>The list will not be retreivable.</p>
                        </div>
                    </Modal>

                </div>
                <div className="list_input">
                    <div className="input-field">
                        <label className="active" htmlFor="email" id="name_prompt">Name</label>
                        <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="password" id="owner_prompt">Owner</label>
                        <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                    </div>
                </div>
                <div className="card_headers card card-content z-depth-0 row">
                    <div className="col s4"><span className="clickable_sort" onClick={this.sortDescription}>Task</span></div>
                    <div className="col s3"><span className="clickable_sort" onClick={this.sortDueDate}>Due Date</span></div>
                    <div className="col s3"><span className="clickable_sort" onClick={this.sortCompleted}>Status</span></div>
                </div>
                <ItemsList todoList={todoList} />
                <div className="list_item_add_card card-content grey-text text-darken-3">
                    <div className="item_add_btn waves-effect waves-light btn" onClick={this.addItem}><i className="add_icon material-icons">add_circle_outline</i></div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    todoList.id = id;

    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ListScreen);