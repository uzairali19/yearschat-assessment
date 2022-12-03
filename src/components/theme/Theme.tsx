import { Select } from './select'
import { Toggle } from './toggle'

interface ThemeProps {
    themeType: 'select' | 'toggle'
    theme: string
    setTheme: (theme: string) => void
}

const Theme: React.FC<ThemeProps> = ({ themeType,theme,setTheme }) => {
    return (
        <>
            {themeType === 'select' && <Select theme={theme} setTheme={setTheme}  />}
            {themeType === 'toggle' && <Toggle theme={theme} setTheme={setTheme} />}
        </>
    )
}

export default Theme;
