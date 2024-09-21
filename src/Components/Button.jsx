function Button({content,bgcolor,fontcolor,onClick}){
    return(
        <button 
        className='bg-slate-200 bord rounded-lg ml-5 my-2'
        onClick={onClick}
        style={{
            backgroundColor:bgcolor?bgcolor:"gray",
            color:fontcolor?fontcolor:"white",
            margin:"10px",
            padding:"1px",
            width: "75px",
            height: "30px",
            borderRadius: "5px",
        }}>{content}</button>
    )
}

export default Button