import React, { useEffect, useReducer, useState } from 'react';
import firebase from 'firebase'
import FirebaseConfig, { VapidKey } from '../data/FirebaseConfig';
import axios from 'axios'

interface IFirebaseState {
  database: firebase.firestore.Firestore | null,
  auth: firebase.auth.Auth | null,
  storage: firebase.storage.Storage | null,
  messaging: firebase.messaging.Messaging | null,
  uploadFile: (file: Blob) => Promise<string>,
  sendNotification: (text: string) => void
}

const initialState: IFirebaseState = {
  database: null,
  auth: null,
  storage: null,
  messaging: null,
  sendNotification: () => undefined,
  uploadFile: () => Promise.resolve('')
}

export const FirebaseContext = React.createContext<IFirebaseState>(initialState);

type TFirebaseActionTypes = 'APP_INITIALIZED'

interface FirebaseActions {
  type: TFirebaseActionTypes
  payload: any
}

type TReducerHandler = {
  [key in TFirebaseActionTypes]: (action: FirebaseActions) => IFirebaseState
}

function reducer(state: IFirebaseState, action: FirebaseActions): IFirebaseState {
  const reducerHandler: TReducerHandler = {
    APP_INITIALIZED: action => {
      return {
        ...state,
        database: action.payload.db,
        auth: action.payload.auth,
        storage: action.payload.storage,
        messaging: action.payload.messaging
      }
    }
  }
  return reducerHandler[action.type](action)
}

const FirebaseState: React.FC = ({ children }) => {

  const [initialized, setInitialized] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [token, setToken] = useState('')

  useEffect(() => {
    if (initialized) {
      return
    }

    if (firebase.apps.length) {
      return
    }

    setInitialized(true)
    firebase.initializeApp(FirebaseConfig)
    dispatch({ type: 'APP_INITIALIZED', payload: { db: firebase.firestore(), auth: firebase.auth(), storage: firebase.storage(), messaging: firebase.messaging() } })
  }, [initialized])

  useEffect(() => {
    if (!state.messaging) {
      return
    }

    state.messaging.getToken({ vapidKey: VapidKey }).then(
      token => {
        console.log(token)
        setToken(token)
      })

    const unsubscribe = state.messaging.onMessage(data => {
      var notification = new Notification(data.notification.title, {
        body: data.notification.body,
      });
    })

    return () => {
      unsubscribe()
    }
  }, [state.messaging])

  const uploadFile = async (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!state.storage) {
        reject('Storage not initialized')
        return
      }
      const fileName = new Date().getTime()
      state.storage.ref(`${fileName}.png`).put(file).then(async snapshot => {
        resolve(await snapshot.ref.getDownloadURL())
      }).catch(e => {
        reject(e)
      })
    })
  }

  const sendNotification = async (text: string) => {
    // axios.post('https://fcm.googleapis.com//v1/projects/educat-queue/messages:send',
    //   {
    //     "message": {
    //       "notification": {
    //         "title": "Nova ocorrência criada",
    //         "body": text
    //       }
    //     }
    //   }, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `bearer
    //     }
    //   })
  }

  const value = {
    database: state.database || null,
    auth: state.auth || null,
    storage: state.storage || null,
    messaging: state.messaging || null,
    sendNotification,
    uploadFile
  }

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
}

export default FirebaseState;