import React, {useRef, useEffect} from 'react'


const Video = props => {
    const item = props.item;
    const iframeRef = useRef();
    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9/16 + 'px';
        iframeRef.current.setAttribute('height',height);
    }, [])
    return (
        <div className="video">
            <iframe ref={iframeRef} src ={`https://www.youtube.com/embed/${item.key}`} width="100%"></iframe>
        </div>
    )
}

export default Video