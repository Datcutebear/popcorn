import {useState, useEffect} from 'react'
function UseScrollY() {
    const [scrollY, setScrollY ] = useState()
    const handleScrollY = () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop
        setScrollY(scrollY)
    }
    useEffect(()=> {
        handleScrollY()
        window.addEventListener('scroll', handleScrollY)
        return () => {
            window.removeEventListener('scroll', handleScrollY)
        }
    },[])
   return ([scrollY])
}
export default UseScrollY