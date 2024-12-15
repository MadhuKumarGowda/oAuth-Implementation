const oauthService = require("./auth_service");
function oauthProcessor(code, done){

    oauthService.getGitHubaccessToken((code, token)=>{
            if(err){
                done(err)
            }else{
                done(undefined, token)
            }
    })
}

module.exports = { oauthProcessor }