const mainUrl = 'https://nikaza.io';
let GetDeviceList = '/v1/devices/assets'; // v1 could be changed
let SendMessage = 'http://203.91.199.43:8080/minerSafety/admin/sendMessage?'
let ReceiveMessage = "http://203.91.199.43:8080/minerSafety/admin/getLatestMessages?foruser=" //particular userid
// const ENVIRONMENT = process.env.ENV;
// if(ENVIRONMENT === 'local'){
//   GetDeviceList = 'http://localhost:8087/getDeviceList';
// }

export { mainUrl };
export { GetDeviceList };
export { SendMessage };
export { ReceiveMessage };