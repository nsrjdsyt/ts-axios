import axios from '../../src/index'

axios({
  method: 'post',
  url: '/extend/post',
  data: {
    a: 1,
    b: 2
  }
})

axios('/extend/post', {
  method: 'post',
  data: {
    a: 1,
    b: 2
  }
})

axios.request({
  method: 'post',
  url: '/extend/post',
  data: {
    a: 1,
    b: 2
  }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', {msg: 'post'})

axios.put('/extend/put', {msg: 'put'})

axios.patch('/extend/patch', {msg: 'patch'})
