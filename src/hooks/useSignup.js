import { useState, useEffect } from 'react'
import { authTools, storageTools, firestoreTools } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, profilePicture) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await authTools.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // upload user profile picture
      const uploadPath = `users/${res.user.uid}/${profilePicture.name}`
      const imageResult = await storageTools.ref(uploadPath).put(profilePicture);
      const imageUrl = await imageResult.ref.getDownloadURL();


      // add display name to user
      await res.user.updateProfile({ displayName, photoURL: imageUrl })

      // create user document
      await firestoreTools.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imageUrl,
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}