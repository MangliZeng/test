// 实现一个find  [].find(() => {})
Array.prototype.myFind = function (fn) {
  if (Object.prototype.toString.call(this).slice(8, -1) !== 'Array') throw new Error('不是数组')
  let arr = this
  let res = []
  arr.forEach(item => {
    if (fn(item)) {
      res.push(item)
    }
  })
  return res
}
let a = [
  {userId: 8,  title: 'title1'},
  {userId: 11, title: 'other'},
  {userId: 15, title: null},
  {userId: 19, title: 'title2'}
];
console.log(a.myFind(item => item.userId > 14))

// 实现一个手写字符串模版
function stringTemplate (content, obj) {
  let reg = new RegExp(/\$\{([^}]+)\}/, 'g')
  let replacer = function (match, item) {
    return obj[item]
  }
  return content.replace(reg, replacer)
}
console.log(stringTemplate('hfksj${a}d-${b}', {a: '*字符串*', b: '*字符串*'}))

// 实现Promise.all
function isPromice(promice) {
  return (
    !!promice &&
    (typeof promice === 'object' || typeof promice === 'function') &&
    typeof promice.then === 'function'
  )
}
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    return resolve('P1')
  }, 0)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    return resolve('P1')
  }, 1000)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    return resolve('P1')
  }, 3000)
})
let pArray = [p1, p2, p3]
function promiceAll (promice) {
  if (Object.prototype.toString.call(promice).slice(8, -1) !== 'Array') throw new Error('不是数组')
  return new Promise((resolve, reject) => {
    let length = promice.length
    let count = 0
    let value = new Array(length)
    for (let i = 0; i < length; i++) {
      let promice = promice[i]
      if (isPromice(promice)) {
        promice.then(res => {
          count++
          value[i] = res
        }).catch(error => {
          reject(error)
        })
      } else {
        count++
        value[i] = promice
      }
    }
    if (length === count) {
      resolve(value)
    }
  })
}

// 旋转、平移
/*
// @keyframes rotate{
//   0% {
//     transform: rotate(0deg) translate(20px, 0);
//   }
//   100% {
//     transform: rotate(360deg) translate(100px, 0);
//   }
  
// }
// .animo {
//   transtion: rotate 3s;
//   // transform: rotate(360deg) translate(100px, 0);
// }
*/
// Less\Sass
/*
// 区别：
// Less环境较Sass简单
// Sass的安装需要安装Ruby环境，Less基于JavaScript，是需要引入Less.js来处理代码输出css到浏览器，也可以在开发环节使用Less，然后编译成css文件，直接放在项目中，有less.app、SimpleLess、CodeKit.app这样的工具，也有在线编辑地址。
// Less使用较Sass简单
// Sass较Less略强大一些
// sass有变量和作用域；sass有函数的概念；进程控制；数据结构等；
// Less与Sass处理机制不一样
// 前者是通过客户端处理的，后者是通过服务端处理，相比较之下前者解析会比后者慢一点；
// 变量在Less和Sass中的唯一区别就是Less用@，Sass用$。
// 相同：
// 混入(Mixins)——class中的class；
// 参数混入——可以传递参数的class，就像函数一样；
// 嵌套规则——Class中嵌套class，从而减少重复的代码；
// 运算——CSS中用上数学；
// 颜色功能——可以编辑颜色；
// 名字空间(namespace)——分组样式，从而可以被调用；
// 作用域——局部修改样式；
// JavaScript 赋值——在CSS中使用JavaScript表达式赋值。
// 选择 Sass而不是Less？
// Sass有更成熟的框架，比如说Compass，而且有很多框架也使用Sass，比如说Foundation；
// 就国外讨论的热度来说，Sass绝对优于less；
// 在国内less集中的教程是less中文官网，而Sass的中文教程，在国内较为普遍；
// sass也是成熟的CSS预处理器之一，而且有一个稳定，强大的团队在维护；
// scss对sass语法进行了改良，sass 3变成了Scss(sassy css)。与原来的语法兼容，只是用{}取代了原来的缩进;
// bootstrap（Web框架）最新推出的版本4，使用的就是Sass，可以看出sass有更多市场价值.
*/

// 数组 转变成 类数组
[].push.apply({}, [])
// 类数组 转变成 数组
Array.prototype.slice.call(arguments)
Array.from(arguments)
// [...arguments]

// async await 如何实现的
function* helloWorldGenerator() {
  let cache = ''
  cache = yield new Promise((resove, reject) => {
    setTimeout(() =>{
      resove('hello')
    }, 1000)
  })
  cache = cache + (yield new Promise((resove, reject) => {
    setTimeout(() =>{
      resove(' world')
    }, 1000)
  }))
  cache = cache + (yield new Promise((resove, reject) => {
    setTimeout(() =>{
      resove('!')
    }, 1000)
  }))
  return cache
}

function my_co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      let {value, done} = it.next(data)
      if (!done) {
        Promise.resolve(value).then(val => {
          next(val);
        }, reject);
      } else {
        resolve(value)
      }
    }
    next()
  })
}
my_co(helloWorldGenerator()).then((data) =>{
  console.log('zml', data);
})

//commit 1

// commit 3
