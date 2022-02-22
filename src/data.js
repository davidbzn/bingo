const fs = require('fs');
const path = require('path');

module.exports = {
    getUsersSaved(search = 'all'){
        let rawData = fs.readFileSync(path.resolve(`__dirname/../data/`, 'users.json'));
        let users = JSON.parse(rawData);
        users = users;

        if(search == 'all'){
            return users;
        }else{
            let usersSearch = [];
            console.log(users);
            for(let k in users) {
                if(users[k].name.indexOf(search) != -1)
                    usersSearch.push({id: users[k].id, name: users[k].name}); 
            }
            console.log(usersSearch);
            return usersSearch;
        }
    },
    updateUser(id, userName){

        let users = this.getUsersSaved();
        let exist = false;
        let index = null;  
        for (var i = 0; i < users.length; i++) {
            if(id == users[i].id)
                index = i;

            if (users[i].name === userName) {
                exist =  true;
                break;
            }
        }

        if(!exist){
            if(index === null){
                users.push({id: id, name: userName});
                console.log('add-teste');
            }else{
                console.log('edit-teste');
                users[index].name = userName;
            }            
            fs.writeFileSync(path.resolve(`__dirname/../data/`, 'users.json'), JSON.stringify(users,  undefined, 4));
            return 0;
        }else{
            return 1;
        }
    },
    deleteUser(id){
        let users = this.getUsersSaved();
        
        for (var i = 0; i < users.length; i++) {
            if(id == users[i].id)
                users.splice(i, 1);
        }

        fs.writeFileSync(path.resolve(`__dirname/../data/`, 'users.json'), JSON.stringify(users, undefined, 4));
    }
}
