import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';
import { getFirestore } from 'redux-firestore';
import { Modal} from 'react-materialize';

class WireframeLinks extends React.Component {
    updateTime = (wireframe) => {
        var currentDate = new Date();
        var timestamp = currentDate.getTime();
        const fireStore = getFirestore();
        fireStore.collection('wireframeList').doc(wireframe.id).update({
            time: timestamp
        });
    }

    confirmDeleteList = (wireframe) => {
        const fireStore = getFirestore();
        fireStore.collection('wireframeList').doc(wireframe.id).delete();
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

                        <Modal className="delete_list_modal" header="Delete Wireframe?"
                            actions={
                                <div class="delete_list_modal_footer">
                                    <div className="confirm_delete_button modal-close waves-effect waves-light green btn-flat" onClick={() => this.confirmDeleteList(wireframe)}><i className="material-icons left">check</i>Yes</div>
                                    <div className="modal-close waves-effect waves-light red btn-flat"><i className="material-icons left">close</i>No</div>
                                </div>
                            }
                            trigger={<div className="card_delete_button col s2" onClick={""}><i className="edit_toolbar_icon card_delete_button material-icons">clear</i></div>} 
                            options={{ dismissible: false }}>
                            <div class="delete_list_modal_content">
                                <p>Are you sure you want to delete the wireframe?</p>
                                <p>The wireframe will not be retreivable.</p>
                            </div>
                        </Modal>

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