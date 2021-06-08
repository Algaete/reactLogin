import React from 'react';
import {auth} from '../firebase';
import { withRouter } from 'react-router-dom';

export const Admin = (props) => {

    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        if(auth.currentUser){
            console.log('Existe un usuario')
            setUser(auth.currentUser)
        }else{
            console.log('No existe un usuario')
            props.history.push('/login')
        }
    }, [])

    return (
        <div>
            <h2>Ruta protegida</h2>
        </div>
    )
}


export default withRouter(Admin)