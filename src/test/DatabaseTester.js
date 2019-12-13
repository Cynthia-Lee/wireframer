import React from 'react'
import { connect } from 'react-redux';
import wireframeJson from './TestWireframerData.json'
import { getFirestore } from 'redux-firestore';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframeLists').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('wireframeLists').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        var currentDate = new Date();
        var timestamp = currentDate.getTime(); // timestamp for most recent list
        wireframeJson.wireframeLists.forEach(wireframeJson => {
            fireStore.collection('wireframeLists').add({
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
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);