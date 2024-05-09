export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  return <span>{id}</span>
}
