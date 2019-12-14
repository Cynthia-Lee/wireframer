/*
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map(function (item) {
                    // console.log(item);
                    // console.log(items.indexOf(item));
                    item.id = items.indexOf(item);
                    // console.log(item.id);
                    return (
                        <Link to={'/todoList/' + todoList.id + '/' + item.id} key={item.key}>
                            <ItemCard todoList={todoList} item={item} />
                        </Link>
                    );
                })
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
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
)(ItemsList);
*/