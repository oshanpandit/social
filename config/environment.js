const development={

    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'user_list_db',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
    
            user:'convo.inc.internal',
            pass:'CONVODDDAAA'
        }

    },

    clientID:"919704372721-md6kpaot5k75ccud3ip55nf2ej2jk91s.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/user/auth/google/callback",

    jwt_secret:"convo",
}

const production ={

    name:'production'
}

module.exports=development;