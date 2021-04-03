import React,{useState,useEffect} from 'react'
import '../css/user.css'
import axios from 'axios'
import Loader from '../components/loader';
import {NavLink} from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import Button from '@material-ui/core/Button';
const User = ()=>{

        const [gitUserData,setGitUserData]=useState([])
        const[load,setLoad] = useState(false)
        const [id,setid]=useState(1)
        const [errorMessage,setErrorMessage] = useState('')

        useEffect(()=>{

            getData()
            return(()=>{
                console.log(window.screen.width,"x",window.screen.height)
                console.clear()
            })
        },[id])

        const getData = async()=>{
            const data = await axios(
                {
                    method: 'get',
                    url: `https://api.github.com/users?since=${id}`,
                    // headers: {
                    //     'User-Agent': 'request'
                    //   },
                }
            ).then((response)=>{
                setGitUserData(response.data)
                setErrorMessage("201")
                setLoad(true)
               
            })
            .catch((error)=>{
                
               setErrorMessage(error.message)
            })
        }

    return(
        <>
        <div className="text-center container-fluid">
            <div className="row">
                <div className="col-12 col-md-12 my-3">
                    <h2>List Of Github Users</h2><NavLink to="myData"><span className="float-right"> <Button variant="contained" color="primary"> Seacrh by username
                                </Button></span></NavLink>
                </div>
            </div>
            <div className="row">
                <div className="col-0 col-md-4"></div>
                <div className="col-12 col-md-4 my-3 text-capitalize text-center form-group ">
                    <label className="">Enter the starting id</label>
                    <input   className="text-center border-bottom   form-control" value={id} onChange={(e) =>{setid(e.target.value);setLoad(false);}} type="text" placeholder="Starting id"/>
                    <h6>Showing Data from { id? id:0} to {Number(id) + 29}</h6>
                </div>
            </div>
           
                
           { load? <div className="row my-5">
                
                
             {gitUserData.map((item,index)=>{
                 return(
                     <>
                    
                    <div key={index} className="col-12 col-md-4 frame my-3" >
                    <div className="row">
                        <div className="col-6 ">
                   <img src={item.avatar_url} alt="user_name" className="user_img "/>
                   </div>
                   <div  className="col-6 my-5">
                       <div className="row">
                           <div className="col-12">

                            <h3>{item.login}</h3> {item.type==="User"?<FaGithub  size="3em"/>:<FcApproval size="3em"/>}
                           
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                 {item.type} <a href={item.html_url} target="_blank">Visit User</a>
                                </div>
                        </div>
                   </div>
                    </div>
                </div>
                
                   </>
                  
                 )
             })}
                
        


             
                
                
            </div>:<Loader error={errorMessage}/>}

            
        </div>
        </>
    )
}

export default User;