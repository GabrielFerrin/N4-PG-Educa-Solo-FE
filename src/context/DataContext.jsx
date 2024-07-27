import { createContext, useState } from "react"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  
  return (
    <DataContext.Provider value={{ theme, setTheme }}>
      {children}
    </DataContext.Provider>
  )
}

DataProvider.propTypes = null