/*
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

class ControlList extends React.Component {
    render() {
        const wireframe = this.props.wireframe;
        // const items = todoList.items;
        return (
            <div className="todo-lists section">
                {items && items.map(function (item) {
                    item.id = items.indexOf(item);
                    // console.log(item.id);
                    return (
                        <ItemCard todoList={todoList} item={item} />
                    );
                })
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const wireframe = ownProps.wireframe;
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
)(ControlList);
*/