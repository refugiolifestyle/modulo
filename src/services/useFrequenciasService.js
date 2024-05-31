import { onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { firebaseDatabase } from "../configs/firebase"

export const useFrequenciasService = () => {
  const [frequencias, setFrequencias] = useState();
  const query = ref(firebaseDatabase, 'frequencias')

  useEffect(async () => {
    let unsubscribe = onValue(query,
      (snapshot) => setFrequencias(snapshot.val() || []))
    
      return () => unsubscribe()
  }, [])

  return {
    frequencias
  }
}