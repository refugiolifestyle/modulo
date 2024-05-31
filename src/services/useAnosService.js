export const useAnosService = () => {
  let anos = []
  let currentYear = 2024;

  do {
    anos.push(currentYear.toString())
    currentYear++
  } while ((new Date()).getFullYear() > currentYear)

  return anos
}