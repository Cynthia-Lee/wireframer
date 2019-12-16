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

    deleteWireframe = (wireframe) => {
        const wrireframeList = this.props.wireframeList;
        
    }

    render() {
        const wireframeList = this.props.wireframeList;
        const userId = this.props.auth.uid;
        // console.log(wireframeList);
        if (wireframeList) {
            var userWireframeList = wireframeList.filter(function (w) {
                return userId == w.user;
            });
        }
        // {wireframeList && wireframeList.map(wireframe => (
        
        return (
            <div className="todo-lists section">
                {userWireframeList && userWireframeList.map(wireframe => (
                    <div className="row">
                        <div className="col s10">
                            <Link to={'/wireframe/' + wireframe.id} onClick={() => this.updateTime(wireframe)} key={wireframe.id}>
                                <WireframeCard wireframe={wireframe} />
                            </Link>
                        </div>
                        <div className="card_delete_button col s2" onClick={() => this.deleteWireframe(wireframe)}><i className="edit_toolbar_icon card_delete_button material-icons">clear</i></div>
                    </div>
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