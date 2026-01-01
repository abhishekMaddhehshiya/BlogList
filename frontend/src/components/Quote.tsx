export const Quote = ({ quote }: { quote: string }) => {
  return (
    <div >
      <p className="text-xl md:text-2xl font-medium text-gray-900 text-center max-w-lg">
        {quote}
      </p>
    </div>
  )
}
