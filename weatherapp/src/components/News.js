
import { useEffect } from "react";
const News=()=>{
    useEffect(() => {
        document.title = 'News';
      }, []);
    return (<p>Hello World!</p>)

}

export default News