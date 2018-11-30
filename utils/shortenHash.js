export default function shortenHash(hash) {
  return (
    hash
      .slice(0, 8)
      .concat(['...'])
      .concat(
        hash
          .slice(hash.length - 4)
      )
  )
}