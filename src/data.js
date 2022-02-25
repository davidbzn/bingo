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
            for(let k in users) {
                if(users[k].name.indexOf(search) != -1)
                    usersSearch.push({id: users[k].id, name: users[k].name}); 
            }
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
                users.sort(function(a, b) {
                    return a.id - b.id;
                }); 

                fs.writeFileSync(path.resolve(`__dirname/../data/`, 'users.json'), JSON.stringify(users,  undefined, 4));
                return 2;
            }else{        
                users[index].name = userName;
                fs.writeFileSync(path.resolve(`__dirname/../data/`, 'users.json'), JSON.stringify(users,  undefined, 4));
                return 1;
            }
        }else{
            return 9;
        }
    },
    deleteUser(id){
        let users = this.getUsersSaved();
        
        for (var i = 0; i < users.length; i++) {
            if(id == users[i].id)
                users.splice(i, 1);
        }

        fs.writeFileSync(path.resolve(`__dirname/../data/`, 'users.json'), JSON.stringify(users, undefined, 4));
    },
    paginate(userList, index = 0, limit = 6){

        //console.log(`index ${index} limit ${limit} tamanho ${userList.length}`)

        if(userList.length < index)
            return [[], 0];

        return [ JSON.stringify(userList.slice(index, (index + limit)), null, 2) ];
    }
}
