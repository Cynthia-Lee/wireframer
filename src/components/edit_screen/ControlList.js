import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ControlCard from './ControlCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

class ControlList extends React.Component {
    render() {
        const wireframe = this.props.wireframe;
        const items = this.props.items;
        const createItem = this.props.createItem;
        const options = ["container", "label", "button", "textfield"];
        return (
            <div className="control_list_container row">
                <div className="control_list">
                    {options && options.map(function (type) {
                        // item.id = items.indexOf(item);
                        // console.log(item.id);
                        return (
                            <ControlCard type={type} createItem={createItem} items={items} wireframe={wireframe} />
                        );
                    })
                    }
                </div>
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