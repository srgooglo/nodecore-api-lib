'use strict'
import axios from 'axios'
import process from 'process'

const uri = () => {
    if (process.env.RESOLVER_HOST) {
        return process.env.RESOLVER_HOST
    }
    return "https://api.ragestudio.net/resolver/"
}

export default () => {
    return new Promise(resolve => {
        axios({
            method: 'post',
            url: uri(),
        }).then((res) => {
            return resolve(res.data.response)
        })
    })
}