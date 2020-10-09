'use strict'
import axios from "axios"
import uri_compile from './uri_compile'

export default async (payload, callback) => {
  if(!payload || !payload.endpoint || !payload.endpointList) return false
  let { prefix, endpointList, endpoint, access_token, server_key, body, options } = payload

  let { method, url } = await uri_compile(endpointList, endpoint, prefix)

  let payloadContainer = new FormData()
  let requestOptions = {
    method: method || 'POST',
    timeout: 0
  }

  if (options != null) {
    requestOptions = { ...requestOptions, ...options}
  }

  if(access_token != null){
    url = `${url}?access_token=${access_token}`
  }

  if(server_key != null){
    payloadContainer.append('server_key', server_key)
  }

  if(body != null){
    try {  
      const bodyLength = Object.keys(body).length
      if (bodyLength > 0) {  
        for (let index = 0; index < bodyLength; index++) {
          const ent = Object.entries(body)[index]
          const key = ent[0]
          const value = ent[1]
  
          payloadContainer.append(key, value)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  axios({url, method: requestOptions.method, timeout: requestOptions.timeout, data: payloadContainer, headers: {'Content-Type': 'multipart/form-data' }})
    .then((response) => {
        return callback(false, response.data)
    })
    .catch((error) => {
        return callback(true, error)
    })
}
