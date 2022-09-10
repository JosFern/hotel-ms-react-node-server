import * as http from 'http';
import * as url from 'url';

import * as db from "./db_hotelnode.js";

http.createServer(async (req, res) => {
    const link = url.parse(req.url, true)

    const headers = {
        'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Max-Age': 2592000, // 30 days
        'Content-Type' : 'application/json'          
    }

    try {

//-------------------------------------ROOMS-----------------------------------
        

        if (link.pathname === '/rooms') {
            
            interface editRoom{
                id: string | number
                number: string
            }
            switch (req.method) {
                case 'GET':     //get rooms for admin
                    const result = await db.getRooms()

                    res.writeHead(200, headers)
                    res.end(JSON.stringify(result))
                    break;
                
                case 'POST':    //add rooms
                    
                    let addData = '';
                    req.on('data', (bufferData) => {
                        addData += bufferData;
                    })
            
                    req.on('end', async () => {
                        const values = JSON.parse(addData)

                        res.writeHead(200, headers)
                        
                        const newRooms = []
                        for (let i = 0; i < values.length; i++){
                            newRooms.push([values[i].room])
                        }
                        const number = await db.postRoom(newRooms)

                        number === -1 ? res.writeHead(400, headers) : res.writeHead(200, headers)
                        
                        res.write(JSON.stringify(number))

                        res.end()
                    })
                    break;
                
                case 'OPTIONS':
                    res.writeHead(200, headers)
                    res.end()

                    break;
                
                case 'PUT':     //update room
                    let updateData = '';
                    req.on('data', (bufferData) => {
                        updateData += bufferData;
                    })
                    
            
                    req.on('end', async () => {
                        const values = JSON.parse(updateData)

                        const editedRoom: editRoom = {
                            id: values.id,
                            number: values.number
                        }
                        
            
                        const result = await db.putRoom(editedRoom)

                        result === -1 ? res.writeHead(400, headers) : res.writeHead(200, headers)
                        

                        res.write(JSON.stringify(result))
                        res.end()
                    })
                    break;
                
                case 'DELETE':
                    let deleteData = '';

                    req.on('data', (bufferData) => {
                        
                        deleteData += bufferData;
                    })
                    req.on('end', async () => {

                        const values = JSON.parse(deleteData)

                        res.writeHead(200, {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': '*',
                            'Access-Control-Max-Age': 2592000, // 30 days
                            'Access-Control-Allow-Headers': '*',
                            'Access-Control-Request-Headers': '*',
                            'Content-Type' : 'application/json'  
                            }
                        )
                        const joinIds = [];
                        
                        

                        for (let i = 0; i < values.length; i++){
                            joinIds.push(values[i].room_id)
                        }

                        if (joinIds.length > 0) {
                            const result = await db.deleteRoom(joinIds.join())
                            res.write(JSON.stringify(result))
                        }

                        res.end()
                    })
                    break;
            }
        }

//-----------------------------------------USERS---------------------------------------
        

        else if (link.pathname === '/users') {
            interface updateUser {
                id: string | number
                name: string
                email: string
                password: string
            }
            switch (req.method) {

                case 'GET':
                    const result = await db.getUsers()
    
                    res.writeHead(200, headers)
                    res.end(JSON.stringify(result))
                    break;
                
                case 'OPTIONS':
                    res.writeHead(200, headers)
                    res.end()
                    break;
                
                case 'PUT':        //update user info in admin
                    let data = '';
                    req.on('data', (bufferData) => {
                        data += bufferData;
                    })
            
                    req.on('end', async () => {
                        const values = JSON.parse(data)

                        const user: updateUser = {
                            id: values.id,
                            name: values.name,
                            email: values.email,
                            password: values.password
                        }
            
                        const result = await db.putUser(user)

                        result === -1 ? res.writeHead(400, headers) : res.writeHead(200, headers)
                        

                        res.write(JSON.stringify(result))
                        res.end()
                    })
                    break;
            }
        }
            
//-----------------------------------------ACCOUNT---------------------------------------
            
        else if (link.pathname === '/account') {
            interface Id{
                id: string | number | null
            }

            interface updateProfile {
                id: string | number
                name: string
                email: string
            }

            interface updatePassword {
                id: string | number
                oldPass: string
                newPass: string
            }
            switch (req.method) {
                case 'GET':
                    res.writeHead(200, headers)

                    const params = new URLSearchParams(link.search)
            
                    const user: Id = {
                        id: params.get('id')
                    }
                    const result = await db.getUser(user)
                    res.write(JSON.stringify(result))
                    res.end()
                    break;
                
                case 'OPTIONS':
                    res.writeHead(200, headers)
                    res.end()
                    break;
                
                case 'PUT': //update user account on their profile
                    let data = '';
                    req.on('data', (bufferData) => {
                        data += bufferData;
                    })
            
                    req.on('end', async () => {
                        const values = JSON.parse(data)

                        if (values.changeType === 'password') {
                            const accountUpdate: updatePassword = {
                                id: values.id,
                                oldPass: values.oldPass,
                                newPass: values.newPass
                            }

                            const result = await db.putPass(accountUpdate)
    
                            result === -1 ? res.writeHead(400, headers) : res.writeHead(200, headers)

                            res.write(JSON.stringify(result))

                        } else {
                            const accountUpdate: updateProfile = {
                                id: values.id,
                                name: values.name,
                                email: values.email
                            }
                            
                            const result = await db.putAccount(accountUpdate)
    
                            result === -1 ? res.writeHead(400, headers) : res.writeHead(200, headers)

                            res.write(JSON.stringify(result))
                        }

                        res.end()
                    })
                    break;
            }
        }

//-------------------------------------REGISTRATION-----------------------------------
        

        else if (link.pathname === '/registrations') {
            interface RegisterUser {
                email: string
                password: string
                name: string
                role: string
            }
            switch (req.method) {
                case 'POST':
                    let data = '';
                    req.on('data', (bufferData) => {
                        data += bufferData;
                    })
            
                    req.on('end', async () => {
                        const values = JSON.parse(data)
                        

                        const registered: RegisterUser = {
                            email: values.email,
                            password: values.password,
                            name: values.name,
                            role: values.role
                        }
            
                        const user = await db.postUser(registered)

                        user === -1 ? res.writeHead(400, headers) : res.writeHead(200, headers)
            
                        res.write(JSON.stringify(user))
                        res.end()
                    })
                    break;
            }
        }

//-------------------------------------LOGIN-----------------------------------
        

        else if (link.pathname === '/login') {
            interface logUser {
                email: string
                password: string
            }
            switch (req.method) {
                case 'POST':
                    let data = '';
                    req.on('data', (bufferData) => {
                        data += bufferData;
                    })
            
                    req.on('end', async () => {
                        const values = JSON.parse(data)
                        const loginUser: logUser = {
                            email: values.email,
                            password: values.password
                        }
            
                        const login = await db.loginUser(loginUser)

                        if (login === 'Email is not exist!') {
                            res.writeHead(400, headers)
                        } else if (login === 'Password is invalid!') {
                            res.writeHead(400, headers)
                        } else {
                            res.writeHead(200, headers)
                        }
                        
            
                        res.write(JSON.stringify(login))
                        res.end()
                    })
                    break;
            }
        }

//-------------------------------------CHECK IN-----------------------------------
        

        else if (link.pathname === '/check-in') {
            interface checkIn {
                room_id: string | number
                user_id: string | number
                day_stays: string | number
                checkin: string
            }
            switch (req.method) {
                
                case 'POST':    //checkin user
                    let data = '';
                    req.on('data', (bufferData) => {
                        data += bufferData;
                    })
            
                    req.on('end', async () => {
                        const values = JSON.parse(data)

                        const roomCheckIn: checkIn = {
                            room_id: values.room_id,
                            user_id: values.user_id,
                            day_stays: values.day_stays,
                            checkin: values.checkin
                        }
                        
            
                        const result = await db.putCheckin(roomCheckIn)

                        if (result === 0) {
                            res.writeHead(400, headers)
                        } else if (result === -1) {
                            res.writeHead(400, headers)
                        } else {
                            res.writeHead(200, headers)
                        }

                        res.write(JSON.stringify(result))
                        res.end()
                    })
                    break;
            }
        }

//-------------------------------------CHECK OUT-----------------------------------
        
        else if (link.pathname === '/check-out') {
            interface checkout {
                room_id: string | number
            }
            switch (req.method) {

                case 'OPTIONS':
                    res.writeHead(200, headers)
                    res.end()
                    break;

                case 'PUT':    //checkout user
                    let data = '';
                    req.on('data', (bufferData) => {
                        data += bufferData;
                    })
            
                    req.on('end', async () => {
                        const values = JSON.parse(data)

                        res.writeHead(200, headers)

                        const roomCheckOut: checkout = {
                            room_id: values.room_id,
                        }
                        
            
                        const result = await db.putCheckOut(roomCheckOut)

                        res.write(JSON.stringify(result))
                        res.end()
                    })
                    break;
                
            }
        }


    } catch (err) {
        console.log(err);
    }
    
}).listen(8080)
