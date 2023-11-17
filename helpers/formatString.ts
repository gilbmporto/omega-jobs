export default function formatJobTypeString(str: string) {
  return (
    str
      // Primeiro, insere um espaço antes de todas as letras maiúsculas.
      .replace(/([A-Z])/g, " $1")
      // Em seguida, remove qualquer espaço no início da string.
      .trim()
      // Por fim, transforma a primeira letra de cada palavra em maiúscula.
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  )
}
