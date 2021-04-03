import react,{useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import Loader from './loader'
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { FcSearch } from "react-icons/fc";
import { Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import "../css/user.css"

const MyData = ()=>{

    const [username,setUsername] = useState("")
    const [userSeacrchedData,setUserSearchedData] = useState({})
    const [loader,setLoader] = useState(false)
    const [errorCode,setErrorCode] = useState("200")
    const [clicked,setClicked] = useState(0)
    const [reposArray,setresposArray] = useState([])
    const [languagesArray,setlanguagesArray] = useState({language:"",name:"",key:[],value:[]})
    const [modal,setModal] = useState(false)
    const [modal2,setModal2] = useState(false)
    const [loadingAnime,setLoadingAnime] = useState(true)

    useEffect(()=>{
            setUsername("zadfab")
            getData()
        return(
            console.clear()
        )
    },[])

    useEffect(()=>{
        getData()
    },[clicked])

    const getData = async()=>{
        setErrorCode("200")
       
    const userData = await axios(
       {
           method: 'GET',
           url:`https://api.github.com/users/${username}`,
       }

    
   ).then(async(response)=>{
       setUserSearchedData(response.data)
                const repos_info = await axios({
                    method: 'GET',
                    url:`https://api.github.com/users/${username}/repos`
                }).then((response)=>{
                    setresposArray(response.data)
                }).catch((error)=>{
                    console.log(error)
                })
               
                setLoader(true)
   }).catch((error)=>{
    setLoader(false)
       try{
   
    setErrorCode(error.response.status)
    setLoader(false)
}
    catch{
        setErrorCode("404")
        setLoader(false)
    }
   })
    }

    const getLanguages = async(link,repoName) =>{
        await axios({
            method: "GET",
            url:link
        }).then((response) =>{
            
            let keyArray = []
            let itemArray = []
            for (let key in response.data) {
                let value = response.data[key];
                keyArray.push(key);
                itemArray.push(value);
              }
            setlanguagesArray(()=>{return(
                {language:response.data,name:repoName,key:keyArray,value:itemArray}
            )})
            setLoadingAnime(false)
        }
        
        ).catch((error) =>{
            setlanguagesArray({language:"Data not found",name:"404",key:[],value:[]})
        })
    }

    return (
        <>
       
      
        <div className="row">
           <div className="container-fluid col-12 col-md-12 text-center my-5">
        <h1 >Search your user name</h1><NavLink to="/"><span className="float-right mb-5 mr-3"> <Button variant="contained" color="primary">
        Go back
      </Button></span></NavLink>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-12 col-md-4  form-group input-group">
                <input className="form-control text-center " type="search" placeholder="Your username" value={username} onChange={(e)=>{return(setUsername(e.target.value))}}/>
                <Button variant="contained" color="disable" onClick={()=>{return(setLoader(false),setClicked((prev)=>{return(prev+1)}))}}>
        <FcSearch/>
      </Button>
            </div>
        </div>
        {loader ? 
        <div className="row">
           
                <div className=" col-12  col-md-5  my-5">
                    <img src={userSeacrchedData.avatar_url} alt="User_image" />
                </div>
                <div className=" col-12 col-md-5  my-5 text-capitalize text-left">
                    <div className='row'>
                        <div className="col-6">
                                <h1  >Name</h1>   
                        </div>
                        <div className="col-6">
                        <h1>{userSeacrchedData.name}</h1>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className="col-6">
                                <h1  >Location</h1>   
                        </div>
                        <div className="col-6">
                        <h1>{userSeacrchedData.location}</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-6">
                                <h1  >Bio</h1>   
                        </div>
                        <div className="col-6">
                        <h1>{userSeacrchedData.bio}</h1>
                        </div>
                    </div>
                    
                    <div className='row mt-5'>
                        <div className="col-6">
                                <h1  >Date Joined</h1>   
                        </div>
                        <div className="col-6">
                        <h1>{userSeacrchedData.created_at?(userSeacrchedData.created_at).toString().split('T')[0]:""}</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-6">
                                <h1  >Email</h1>   
                        </div>
                        <div className="col-6">
                        <h1>{userSeacrchedData.email??"No email "}</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-6">
                                <h1  >Follower</h1>   
                        </div>
                        <div className="col-6">
                        <h1>{userSeacrchedData.followers}</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-6">
                                <h1  >Following</h1>   
                        </div>
                        <div className="col-6">
                        <h1>{userSeacrchedData.following}</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-6">
                                <h1  >Public Reposetries</h1>   
                        </div>
                        <div className="col-2">
                        <h1>{userSeacrchedData.public_repos}</h1>
                        </div>
                        <div className="col-4">
                        <Button variant="contained" color="primary" onClick={()=>{setModal(true)}}>
                            View Reposetries
                        </Button>  
                        </div>
                    </div>
                    <div className='row '>
                        <div className="col-6">
                                <h1  >Type</h1>   
                        </div>
                        <div className="col-6">
                        <h1>{userSeacrchedData.type}</h1>
                        </div>
                    </div>
                    
                </div>
                
                {/* Modal */}


                <Modal size="xl" show={modal} onHide={()=>{setModal(false)}}>
                    <Modal.Header closeButton>
                            <Modal.Title className="text-capitalize">{userSeacrchedData.login} Reposetries {reposArray.length>=30?`(Limited to ${reposArray.length} repos)`:""}</Modal.Title>
                    </Modal.Header>
                    
                    
                            <Modal.Body>
                                {reposArray.length >0?
                            <table style={{"borderSpacing": "15px"}}>
                                    <tr>
                                        <th>Sr.no.</th>
                                        <th>Repo name</th>
                                        <th>Language Used</th>
                                        <th>Date Created</th>
                                        <th>Updated at</th>
                                        <th>Size</th>
                                        <th>Link</th>
                                        <th>All Languages used in project</th>
                                    </tr>
                                {reposArray.map((item,index)=>{
                                return(
                                    <>
                                    
                                    <tr>
                                        <td>{index +1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.language}</td>
                                        <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                        <td>{new Date(item.updated_at).toLocaleDateString()}</td>
                                        <td><Tooltip title={`${item.size} Kb `}><p>{`${item.size/1000} Mb`}</p></Tooltip></td>
                                        <td><Tooltip title={item.name}><a href={item.html_url} target="_blank">Click</a></Tooltip></td>
                                        <td> <Button variant="contained" color="primary" onClick={()=>{setModal2(true);getLanguages(item.languages_url,item.name);setLoadingAnime(true)}}>
                                                    View</Button>
                                        </td>
                                    </tr>
                                    
                                   {/* <h1> {item.name}</h1>
                                   <h2>{item.language}</h2>
                                   <a href={item.html_url}>Link to repo</a> */}
                                    </>
                                )
                            })}
                            </table>:"No repo found"}
                            </Modal.Body>
                    <Modal.Footer>
                    
                            <Button variant="contained" color="secondary" onClick={()=>{setModal(false)}}>
                            Close
                            </Button>
                    </Modal.Footer>
                </Modal>
                {/* Second Modal */}
                

      <Modal 
      show={modal2}
       onHide={()=>{setModal2(false)}}
       size='lg'
       >
        <Modal.Header closeButton>
          <Modal.Title>{languagesArray.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {loadingAnime?  <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
        </Spinner>:
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md-6 col-lg-6">
                        <h2 className="mt-3 mb-5"> Name</h2>
            {languagesArray.key.map((item,index)=>{
               return( <h3>{item}</h3>)
        })}
        </div>

        <div className="col-6 col-md-6 col-lg-6">
        <h2  className="mt-3 mb-5">Code %</h2>
            {languagesArray.value.map((item,index)=>{
               return( <h3>{(item/  languagesArray.value.reduce((accu,item,index)=>{
                return accu +=item
            },0)*100).toFixed(2)} %</h3>)
        })}
        </div>
        </div>
        </div>}
        </Modal.Body>
        <Modal.Footer>
          
        <Button variant="contained" color="secondary" onClick={()=>{setModal2(false)}}>
                            Close
        </Button>
        </Modal.Footer>
      </Modal>
  
    
              
        </div>:<Loader error={errorCode}/>}
    </> 
   )
}

export default MyData