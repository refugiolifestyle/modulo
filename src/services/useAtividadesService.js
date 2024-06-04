import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { firebaseDatabase } from "../configs/firebase";

export const TIPOS_ATIVIDADES = [
  'Prova',
  'Atividade'
]

export const SITUACAO_ATIVIDADES = [
  'Aberta',
  'Fechada'
]

export const useAtividadesService = () => {
  const [atividades, setAtividades] = useState([])
  let query = ref(firebaseDatabase, 'atividades')

  useEffect(() => {
    let unsubscribe = onValue(query, 
      (snapshot) => setAtividades(snapshot.val()))
    
      return () => unsubscribe()
  }, [])

  return {
    atividades
  }
}