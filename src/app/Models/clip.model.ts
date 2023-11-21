import  firebase  from 'firebase/compat/app';

export default interface IClip {
    clipid? : string
    uid : string
    userName : string | null
    clipTitle : string
    fileName : string
    url : string,
    imgUrl? : string , 
    timeStamp : firebase.firestore.FieldValue
}