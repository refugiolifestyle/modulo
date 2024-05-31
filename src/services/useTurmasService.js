import { onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { firebaseDatabase } from "../configs/firebase"

export const useTurmasService = () => {
  const [turmas, setTurmas] = useState();
  const query = ref(firebaseDatabase, 'turmas')

  useEffect(async () => {
    let unsubscribe = onValue(query, (snapshot) => {
      let snapData = Object.values(snapshot.val() || {})
      setTurmas(snapData)
    })

    return () => unsubscribe()
  }, [])

  const turmasAbertas = (turmas || [])
    .filter(turma => turma.aberta)

  return {
    turmas,
    turmasAbertas
  }
}