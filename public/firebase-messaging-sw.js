importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDCxcBI46IitJg_Ph_Esu69hWH6T2r1SFg",
    authDomain: "educat-queue.firebaseapp.com",
    databaseURL: "https://educat-queue.firebaseio.com",
    projectId: "educat-queue",
    storageBucket: "educat-queue.appspot.com",
    messagingSenderId: "329752041857",
    appId: "1:329752041857:web:a51f5d2bdd2d3de5b97080"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
    // notification.
});