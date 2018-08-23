
interface StateType {
  count: Number,
  states:String
}

// 下面是在state中定义的数据，尽量使用变量声明

let state: StateType = {
  count: 0,
  states:'turn-on' //控制路由返回
}
export default state
