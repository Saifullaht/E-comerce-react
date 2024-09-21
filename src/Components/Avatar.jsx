function Avatar({ img, username, title = "---", onClick, bgColor, textColor }) {
    return (
      <div 
        onClick={onClick}
        style={{
          backgroundColor: bgColor || "white",
          color: textColor || "black",
        }}
        className="m-3 p-2 cursor-pointer rounded-lg"
      >
        <div className="w-28 h-28 flex justify-center items-center overflow-hidden rounded-lg bg-gray-100">
          <img 
            className="w-full h-full object-cover"
            src={img}
            alt={`${username}'s avatar`}
          />
        </div>
        <div className="mt-2 text-center">
          <h1 className="font-bold">{title}</h1>
          <h2 className="font-medium">{username}</h2>
        </div>
      </div>
    );
  }
  
  export default Avatar;
  