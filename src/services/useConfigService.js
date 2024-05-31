import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { firebaseDatabase } from "../configs/firebase";

export const useConfigService = () => {
  const [config, setConfig] = useState({})
  let query = ref(firebaseDatabase, 'configuracoes')

  useEffect(() => {
    let unsubscribe = onValue(query, 
      (snapshot) => setConfig(snapshot.val()))
    
      return () => unsubscribe()
  }, [])

  return config
}