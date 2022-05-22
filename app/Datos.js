const fs = require('fs');


//pasar paramentos de los datos
const info =( fulln1,email1, password1)=>{
    fs.readFile('userData.js', (err, data)=>{
       if(err){
           throw err
       }
       var datoss = data.toString()

       var entrada = 0

       for(var i = datoss.length; i >= 0; i --){
           if(datoss[i]=== "]" ){
               entrada = i

               break
           }
       }

       
       var guardo = datoss.slice(0,entrada-1)
       var newData = ", \n { \n fulln:'"+fulln1+"', \n email:'"+email1+"', \n password:'"+password1+"' \n } "
       var dat = guardo+newData+"]; \n module.exports = { data }"

       fs.writeFile('userData.js',dat,(err)=>{
           if(err){
               throw err
           }
       })
    })
}

module.exports = {info}
