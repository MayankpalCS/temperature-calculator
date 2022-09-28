express=require("express")
parser=require("body-parser")
https=require('https')
app=express()
app.use(parser.urlencoded({extende:true}))
app.get("/",function(req,res){
  res.sendFile(__dirname+'/inner.html')
})
app.post("/temp",function(req,res){
  city=req.body.city
  api='your api key'
  url='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+api
  https.get(url,function(response){
    status=response.statusCode
    if(status!==200){
      res.send("This city us not in our database")
    }
    response.on('data',function(data){
      da=JSON.parse(data);
      temperature=da.main.temp
      pressure=da.main.pressure
      humidity=da.main.humidity
      long=da.coord.lon
      lat=da.coord.lat
      res.write('temperature: '+(temperature-273.15)+'\n')
      res.write('pressure: '+pressure+'\n')
      res.write('humidity: '+humidity+'\n')
      res.write('longitude: '+long+'\n')
      res.write('latitudes: '+lat)
      res.send()
    })
  })
})
app.listen(3000,function(){
  console.log("server started at port 3000")
})
