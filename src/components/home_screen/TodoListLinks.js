import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';

class TodoListLinks extends React.Component {
    updateTime = (wireframeList) => {
        var currentDate = new Date();
        var timestamp = currentDate.getTime();
        const fireStore = getFirestore();
        fireStore.collection('wireframeLists').doc(wireframeList.id).update({
            time: timestamp
        });
    }

    render() {
        const wireframeLists = this.props.wireframeLists;
        console.log(wireframeLists);
        return (
            <div className="todo-lists section">
                {wireframeLists && wireframeLists.map(wireframeList => (
                    <Link to={'/wireframeList/' + wireframeList.id} onClick={() => this.updateTime(wireframeList)} key={wireframeList.id}>
                        <TodoListCard wireframeList={wireframeList} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframeLists: state.firestore.ordered.wireframeLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);