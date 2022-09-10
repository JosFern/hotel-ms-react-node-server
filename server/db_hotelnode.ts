import * as mysql from 'mysql';
import * as util from 'util';

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'Password!',
    database: 'hotel_system'
})

conn.connect()
const query = util.promisify(conn.query).bind(conn)

interface RegisterUser {
  email: string
  password: string
  name: string
  role: string
}

interface logUser {
  email: string
  password: string
}
interface updateUser {
  id: string | number
  name: string
  email: string
  password: string
}

interface Id{
  id: string | number | null
}

interface editRoom{
  id: string | number
  number: string
}

interface checkIn {
  room_id: string | number
  user_id: string | number
  day_stays: string | number
  checkin: string
}
interface checkout {
  room_id: string | number
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
                    
//---------------------------------------------ROOMS---------------------------------------
export const getRooms = async() => {
  const result = await query("SELECT room.id AS roomId, room.* , user.id, user.name, user.email, user.role FROM hotel_system.room LEFT JOIN hotel_system.user ON room.user_id = user.id")
  return result
}

export const postRoom = async (values: string[][]) => {

  const isExist = await query(`SELECT * FROM room WHERE number IN ('${values.join("\',\'")}')`)

  if (isExist.length > 0) return -1
    
  const result = await query(`INSERT INTO room(number) VALUES ?`, [values])
  return result
}

export const putRoom = async (value: editRoom) => {

  const isExist = await query(`SELECT * FROM room WHERE number = '${value.number}'`)

  if (isExist.length > 0) return -1
    
  const result = await query(`UPDATE room SET number = '${value.number}' WHERE id = '${value.id}'`)
  return result
}

export const deleteRoom = async (values: string) => {
    
  const result = await query(`DELETE FROM room WHERE id IN (${values})`)
  return result
}

//-----------------------------------USERS-------------------------------------------
export const getUsers = async() => {
  const result = await query("SELECT * FROM user")
  return result
}

export const getUser = async (user: Id) => {
  const result = await query(`SELECT * FROM user WHERE id = '${user.id}'`)
  return result
}

export const putUser = async (user: updateUser) => {
  const checkEmail = await query(`SELECT  * FROM user WHERE email = '${user.email}'`)

  if (checkEmail.length > 0) return -1;

  const result = await query(`UPDATE user SET name = '${user.name}', email = '${user.email}', password = '${user.password}' WHERE id = '${user.id}'`)
  return result
}

//--------------------------------------------ACCOUNT---------------------------------------
export const putAccount = async (user: updateProfile) => {
  const checkEmail = await query(`SELECT  * FROM user WHERE email = '${user.email}'`)

  if (checkEmail.length > 0) return -1;

  const result = await query(`UPDATE user SET name = '${user.name}', email = '${user.email}' WHERE id = '${user.id}'`)
  return result
}

export const putPass = async (user: updatePassword) => {
  const getInfo = await query(`SELECT  * FROM user WHERE id = '${user.id}'`)
  const resp = JSON.stringify(getInfo)
  const value = JSON.parse(resp)
  

  if (value[0].password !== user.oldPass) return -1;

  const result = await query(`UPDATE user SET password = '${user.newPass}' WHERE id = '${user.id}'`)
  return result
}

//--------------------------------------------LOGIN---------------------------------------
export const loginUser = async (values: logUser) => {
  const user = await query(`SELECT * FROM user WHERE email = '${values.email}'`)
  const isExist = JSON.stringify(user)
  const value = JSON.parse(isExist)

  if (user.length === 0) return 'Email is not exist!';

  if (value[0].password !== values.password) return 'Password is invalid!';

  return user
}


//-------------------------------------------------REGISTRATION----------------------------
export const postUser = async (values: RegisterUser) => {
  const user = await query(`SELECT * FROM user WHERE email = '${values.email}'`)

  if (user.length > 0) return -1;

  const result = await query(`INSERT INTO user(name, email, password, role) VALUES ('${values.name}','${values.email}','${values.password}', '${values.role}')`)
  return result
  
}

//-------------------------------------------------CHECKIN--------------------------------
export const putCheckin = async(values: checkIn) => {
  const searchRoomId = await query(`SELECT * FROM room WHERE id = ${values.room_id}`)
  const isExist = JSON.stringify(searchRoomId)
  const value = JSON.parse(isExist)

  if (searchRoomId.length === 0) return 0;//room doesnt exist

  if (value[0].user_id !== null) return -1;//room occupied

  const result = await query(`UPDATE room SET user_id = '${values.user_id}', day_stays = '${values.day_stays}', checkin = '${values.checkin}' WHERE id = '${values.room_id}'`)
  return result
}


//-------------------------------------------------CHECKOUT----------------------------
export const putCheckOut = async(values: checkout) => {

  const result = await query(`UPDATE room SET user_id = NULL, day_stays = NULL, checkin = NULL WHERE id = '${values.room_id}'`)
  return result
}
