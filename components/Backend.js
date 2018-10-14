import firebase from 'firebase';
class Backend {
  uid = '';
  messagesRef = null;

  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB1qe0KV6DE997ZSajTQLj8h9aOwrUKjHc',
      authDomain: 'ioss-4912d.firebaseapp.com',
      databaseURL: 'https://ioss-4912d.firebaseio.com',
      storageBucket: 'ioss-4912d.appspot.com',
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase.auth().signInAnonymously().catch(e => {
          alert(e.message);
        });
      }
    });
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  loadMessage(cb) {
    this.messagesRef = firebase.database().ref('messages');
    this.messagesRef.off();
    const onReceive = data => {
      const message = data.val();
      cb({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  sendMessage(msg) {
    for (let i = 0; i < msg.length; i++) {
      this.messagesRef.push({
        text: msg[i].text,
        user: msg[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();
