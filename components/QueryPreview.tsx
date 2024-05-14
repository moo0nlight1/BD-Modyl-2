export const QueryPreview = ({children}: {children: string}) => {
  return (
    <div>
      <p className="text-primary font-mono text-sm border inline-block px-2 py-1 rounded-lg">{children}</p>
    </div>
  )
}