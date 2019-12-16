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

    getAdmins = () => {
        if (this.props.users) {
            let people = this.props.users;
            var i;
            // console.log(this.props.users);
            // console.log(this.props.auth.uid); // find in users
            var i;
            var admins = [];
            for (i = 0; i < people.length; i++) {
                if (people[i]["admin"] == 1) {
                    admins.push(people[i]);
                    // console.log(person);
                }
            }
            // console.log(admins);
            return admins;
        }
    }

    checkAdmin() {
        let admins = this.getAdmins();
        if (this.props.auth && admins) {
            var i;
            for (i = 0; i < admins.length; i++) {
                if (this.props.auth.uid == admins[i]["id"]) {
                    return true;
                }
            }
            return false;
        }
    }

    render() {
        if (this.props.auth && this.checkAdmin()) { // user is an admin
            // console.log(this.checkAdmin());
            return (
                <div>
                    <button onClick={this.handleClear}>Clear Database</button>
                    <button onClick={this.handleReset}>Reset Database</button>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase,
        users: state.firestore.ordered.users
    };
}

export default compose(
    connect(mapStateToProps), 
    firestoreConnect([
        {collection: "users"}
    ]),
)(DatabaseTester);