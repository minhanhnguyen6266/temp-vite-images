import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()
//B1:  tạo context

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia('prefers-color-scheme:dark').matches

  const storedDarkMode = localStorage.getItem('darkTheme') === 'true'
  return storedDarkMode || prefersDarkMode
}

export const AppProvider = ({ children }) => {
  // B2: tạo provider để bao bọc những nơi cần bao bọc truyền dữ liệu
  // children là những component con của AppProvider
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode())
  const [searchTerm, setSearchTerm] = useState('cat')

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme)
  }, [isDarkTheme])

  return (
    <AppContext.Provider
      value={{ toggleDarkTheme, isDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
    //B3: Truyền toggleDarkTheme, isDarkTheme đến những component con
  )
}

export const useGlobalContext = () => useContext(AppContext)
// B4: export ra hook và chỉ cần gọi  useGlobalContext là lấy được dữ liệu greeting đã truyền
