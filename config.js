let config = {}

if(process.env.NODE_ENV === "development"){
  
  config = {
    APIURL: "http://localhost:3000/api"
  }

}
else {

  config = {
    APIURL: "https://www.ask-me.social/api"
  }

}

export default config