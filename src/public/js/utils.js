const get_imageOwner = (url)=>{
    if(url.includes("unsplash.com")){
      const newUrl = url.split("/@")
      return newUrl[1]
    }
    
    if(url.includes("pixabay.com")){
      const newUrl = url.split("/users/")
      return newUrl[1].split("-")[0]
    }
  }

  export default {
    get_imageOwner
  }