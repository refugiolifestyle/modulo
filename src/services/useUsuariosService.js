import { child, onValue, ref, set, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { firebaseDatabase } from "../configs/firebase";

export const useUsuariosService = () => {
  const query = ref(firebaseDatabase, 'usuarios')
  const [usuarios, setUsuarios] = useState({})

  useEffect(() => {
    let unsubscribe = onValue(query, (snapshot) => {
      let snapData = Object.values(snapshot.val() || {})
      setUsuarios(snapData)
    })

    return () => unsubscribe()
  }, [])

  async function liberarUsuario(user) {
    let usuarioRef = child(query, `${user.uid}/active`)
    await set(usuarioRef, true)
  }

  async function adicionarUsuario(user) {
    let usuarioRef = child(query, user.uid)
    await set(usuarioRef, {
      displayName: user.displayName,
      email: user.email,
      active: false
    })
   }

  async function removerUsuario(uid) {
    let usuarioRef = child(query, uid)
    await remove(usuarioRef)
  }

  return {
    usuarios,
    liberarUsuario,
    adicionarUsuario,
    removerUsuario
  }
}