import React from 'react'
import {auth, db} from '../firebase'
import {withRouter} from 'react-router-dom'

export const Login = (props) => {

    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(null)
    const [esRegistro, setEsRegistro] = React.useState(true)

    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()){
            //console.log('Ingrese email')
            setError('Ingrese Email')
            return
        }
        if(!pass.trim()){
            //console.log('Ingrese password')
            setError('Ingrese Password')
            return
        }
        if(pass.length < 6){
            //console.log('Password mayor a 6 caracteres')
            setError('Password de 6 carácteres o más')
            return
        }

        setError(null)

        if(esRegistro){
            registrar()
        }else{
            login()
        }
        //console.log('pasando todas las validaciones')
    }

    const login = React.useCallback(async() => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user)
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')
        } catch (error) {
            if(error.code === 'auth/invalid-email'){
                setError('Email no valido...')
            }
            if(error.code === 'auth/user-not-found'){
                setError('Usuario no encontrado...')
            }
            if(error.code === 'auth/wrong-password'){
                setError('Contraseña incorrecta')
            }
            //console.log(error)
        }
    }, [email, pass, props.history])

    const registrar = React.useCallback(async() => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user)
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')
        } catch (error) {
            //console.log(error)
            if(error.code === 'auth/invalid-email'){
                setError('Email no valido')
            }
            if(error.code === 'auth/email-already-in-use'){
                setError('Email ya esta registrado')
            }
            
        }
    }, [email, pass, props.history])

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de usuarios' : 'Login de acceso'
                }
            </h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <input 
                            className="form-control mb-2" 
                            type="email" 
                            placeholder="Ingrese email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input 
                            className="form-control mb-2" 
                            type="password"                             
                            placeholder="Ingrese un password"
                            onChange={e => setPass(e.target.value)}
                            value={pass}
                        />
                        <div className="d-grid gap-2">
                            <button className="btn btn-dark btn-lg btn-block" type="submit">
                                {
                                    esRegistro ? 'Registrarse' : 'Acceder'
                                }
                            </button>
                            <button 
                                className="btn btn-info btn-sm btn-block"
                                onClick={() => setEsRegistro(!esRegistro)}
                                type="button"
                            >
                                {
                                    esRegistro ? '¿Ya estas registrado?' : '¿No tienes cuenta?'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default withRouter(Login)