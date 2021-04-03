import React from 'react';

const Loader = (props) =>{
    console.log("''''''''",props.error)
    

    
    
    if (props.error == 404 || props.error =="Network Error"){
        return(
            <h1 className="text-center">Data Not Found</h1>
        )

    }
    else if(props.error == 403 || props.error == "Request failed with status code 403"){
       
        return(
            <h1 className="text-center">Maximum limit of Github Api reached</h1>)
    }
    
    else if(props.error === '1000'){
        return(
            <h1 className="text-center">Page Not Found</h1>)
    }

    return(
        <h1 className="text-center">Loading ...</h1>
    )
}

export default Loader