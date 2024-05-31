import { get, ref } from "firebase/database"
import { useEffect, useMemo, useState } from "react"
import { firebaseDatabase } from "../configs/firebase"

const sorter = new Intl
  .Collator('pt-BR', { numeric: true, usage: "sort" });

export const useRedesCelulasService = () => {
  const [celulas, setCelulas] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    let celulasFirebase = await get(ref(firebaseDatabase, 'celulas'))
    setCelulas(celulasFirebase.val())
    setLoading(false)
  }, [])

  let redes = celulas
    .map(c => `Rede ${c.rede}`)
    .filter((r, i, a) => a.indexOf(r) === i)
    .sort(sorter.compare)

  function buscarCelulasPorRede(rede) {
    return celulas
      .filter(c => c.rede === rede)
  }

  return {
    loading,
    redes,
    celulas,
    buscarCelulasPorRede
  }
}