import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';
import { getFirestore } from 'redux-firestore';

class WireframeLinks extends React.Component {
    updateTime = (wireframe) => {
        var currentDate = new Date();
        var timestamp = currentDate.getTime();
        const fireStore = getFirestore();
        fireStore.collection('wireframeList').doc(wireframe.id).update({
            time: timestamp
        });
    }

    render() {
        const wireframeList = this.props.wireframeList;
        console.log(wireframeList);
        return (
            <div className="todo-lists section">
                {wireframeList && wireframeList.map(wireframe => (
                    <Link to={'/wireframe/' + wireframe.id} onClick={() => this.updateTime(wireframe)} key={wireframe.id}>
                        <WireframeCard wireframe={wireframe} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframeList: state.firestore.ordered.wireframeList,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireframeLinks);