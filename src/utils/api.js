import httpClient from './axios'

async function getApplianceList() {
  return await httpClient.get('/getAllAppliances')
  .then((res) => {
    if (res.status === 200) {
      return res.data 
    } else {
      throw new Error({error: res.statusText})
    }
  })
  .then((data) => {
    return data
  })
  .catch((error) => {
    console.log(error)
  })  
}

async function addAppliance({ type, model, name }) {
  return await httpClient.post('/addAppliance', {
    type, model, name
  })
  .then((res) => {
    if (res.status === 200) return res.data
    throw new Error({error: res.statusText})
  })
  .then((data) => {
    return data
  })
  .catch((error) => {
    console.log(error)
  })  
}

async function getAppliance(id) {
  return await httpClient.post('/getAppliance', {
    _id: id
  })
  .then((res) => {
    if (res.status === 200) return res.data
    throw new Error({error: res.statusText})
  })
  .then((data) => {
    return data
  })
  .catch((error) => {
    console.log(error)
  })  
}

async function changeAppliance(type, _id, name) {
  return await httpClient.post('/changeAppliance', {
    type, _id, name
  })
  .then((res) => {
    if (res.status === 200) return res.data
    throw new Error({error: res.statusText})
  })
  .then((data) => {
    return data
  })
  .catch((error) => {
    console.log(error)
  })  
}

async function deleteAppliance(type, _id) {
  return await httpClient.post('/deleteAppliance', {
    type, _id
  })
  .then((res) => {
    if (res.status === 200) return res.data
    throw new Error({error: res.statusText})
  })
  .then((data) => {
    return data
  })
  .catch((error) => {
    console.log(error)
  })  
}

async function controlAppliance(newObject) {
  return await httpClient.post('/controlAppliance', newObject)
  .then((res) => {
    if (res.status === 200) return res.data
    throw new Error({error: res.statusText})
  })
  .then((data) => {
    return data
  })
  .catch((error) => {
    console.log(error)
  })  
}

export {
  getApplianceList,
  addAppliance,
  getAppliance,
  changeAppliance,
  deleteAppliance,
  controlAppliance
}