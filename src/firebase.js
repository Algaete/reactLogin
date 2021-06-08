import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAOcNt90LZHpliqqZuBK_wSVSD9P7ED6Nw",
    authDomain: "crud-udemy-react-81361.firebaseapp.com",
    projectId: "crud-udemy-react-81361",
    storageBucket: "crud-udemy-react-81361.appspot.com",
    messagingSenderId: "98360494604",
    appId: "1:98360494604:web:3901491c0657c1bb0c3c29"
  };
  // Initialize Firebase
  app.initializeApp(firebaseConfig);

  const db = app.firestore()
  const auth = app.auth()
  // exportar nuestras conecciones i biblioteca a otras partes del prpoyecto
  export {db, auth}