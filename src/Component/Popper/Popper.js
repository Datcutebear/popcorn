

import './Popper.css'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
const Popper = ({children}) => {

    return (
        <div className='warrper'>
                {children}
        </div>
    )
}
export default Popper