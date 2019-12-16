import React from 'react'
import { connect } from 'react-redux';
import wireframeJson from './TestWireframerData.json'
import { getFirestore } from 'redux-firestore';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframeList').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('wireframeList').doc(doc.id).delete();
            })
        });

        console.log(this.props.users);
    }

    handleReset = () => {
        const fireStore = getFirestore();
        var currentDate = new Date();
        var timestamp = currentDate.getTime(); // timestamp for most recent list
        wireframeJson.wireframeList.forEach(wireframeJson => {
            fireStore.collection('wireframeList').add({
                    user: wireframeJson.user,
                    name: wireframeJson.name,
                    height: wireframeJson.height,
                    width: wireframeJson.width,
                    items: wireframeJson.items,
                    time: timestamp
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase,
        user: state.firebase.ordered.users
    };
}

export default compose(connect(mapStateToProps), firestoreConnect([{collection: "users"}]))(DatabaseTester);