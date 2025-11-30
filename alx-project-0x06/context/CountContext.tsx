import { createContext, useContext,  useState, ReactNode } from "react"

interface CountContextProps {
  count: number
  increment: () => void
  decrement: () => void
}

// 1. Create the Context
export const CountContext = createContext<CountContextProps | undefined>(undefined)

// 2. Create the Provider Component
export const CountProvider = ({ children }: { children: ReactNode}) => {

  const [count, setCount] = useState<number>(0)

  // Use functional updates to ensure consistency
  const increment = () => setCount((prevCount) => prevCount + 1)
  const decrement = () => setCount((prevCount) => prevCount > 0 ? prevCount - 1 : 0)

  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CountContext.Provider>
  )
}

// 3. Create the Custom Hook for easy consumption
export const useCount = () => {
  const context = useContext(CountContext)

  if (!context) {
    // This throws an error if the hook is used outside the provider
    throw new Error("useCount must be used within a CountProvider")
  }

  return context
}