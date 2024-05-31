import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { firebaseDatabase } from "../configs/firebase";

export const useAlunosService = () => {
  const [alunos, setAlunos] = useState()
  const query = ref(firebaseDatabase, 'alunos')

  useEffect(() => {
    let unsubscribe = onValue(query, (snapshot) => {
      let snapData = Object.values(snapshot.val() || {})
      setAlunos(snapData)
    })

    return () => unsubscribe()
  }, [])

  return {
    alunos
  }
}