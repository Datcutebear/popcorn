import {animateScroll as scroll} from 'react-scroll'
import UseScrollY from './UseScrollY';
import { UpCircleOutlined } from '@ant-design/icons';
import './ScrollToTop.css'

function ScrollToTop() {
    const ScrollToTop = () => {
        scroll.scrollToTop()
     }
     const [scrollY] = UseScrollY()
    return (
        <>
              <UpCircleOutlined 
                  className='gototop'
                    onClick = {() => ScrollToTop()}
                    style = {{
                      visibility: `${scrollY > 900 ? 'visible' : 'hidden'}`
                   }}  
                />
        </>
    )
}
export default ScrollToTop