
// 因为在作用域查找的时候少了一级作用域所以要引进来
(function (window, Vue) {
    /* 1 自己准备一个数组
       2 在data中把数组添加进去
       3 section 和 footer 两个区域是显示或者不显示
       数组的length ===0 不显示
       4 根据数组渲染页面
       5 每一个li里面的 input 和 label 不联动
       6 自定义属性 directive 自动获取光标
       7 添加一个todo
       只要向数组中添加一条数据就可以了 （对象）
       content： input框输入的内容
       isFinish：false
       id：如果没有 length        id =1
       如果有 length =》  id 最大的那一项， 拿出id+1
       先排序，拿到最后一项的id+1
       //8 持久化存储  添加一个要存   删除一个要存 
       // isFinish 改变要存 
       // content 改变要存
       // 只要数组变化，数组里面的每一项有变化都要存
       // watch 开启深度监听 deep：true
       9 渲染一个数字（有多少个正在活动着的todo）
       需要统计一下 dataList 这个数组里面有多少个 isFinish === false
       10 全选按钮的显示与隐藏
       显示：dataList里面至少有一个isFinish 为true
       隐藏：dataList 里面全都是false
       如果activeNum === dataList说明每一个都是false隐藏 否则显示
      10 全选按钮的显示和隐藏 
      显示： datalist里面至少有一个isfinish为true
      隐藏：datalist里面全都是false
      如果activenum=== datalist。length 说明每一个都是false 隐藏
      否则显示
      11 删除一个 todo
      最合理的是应该拿到id
      渲染id和index是配套的
      可以使用index来删除
      12 删除所有 isfinish 为 true的todo
      遍历数组 把每一个isfinish为true的删除
      所以 筛选出所有isfinish为false
      13 全选和反选
      全选按钮的显示问题
      在每一个是否完成按钮上改变的时候就要去遍历一下数组，看看是否全是true


  
*/
            //  var arr = [ 
            //        {
            //            id: 1,
            //            content: 'abc',
            //            isFinish:true
            //        },
            //        {
            //         id: 1,
            //         content: 'abc',
            //         isFinish:true
            //     },
            //     {
            //         id: 1,
            //         content: 'abc1',
            //         isFinish:false
            //     },
            //     {
            //         id: 1,
            //         content: 'abc2',
            //         isFinish:true
            //     },
            //    ]
     
    new Vue({
        el:'#app',
        data:{
            // dataList:JSON.parse(window.localStorage.getItem('dataList'))||[],
               dataList:JSON.parse(window.localStorage.getItem('dataList')) || [],
            newTodo:''
        },
        // 自定义属性
        directives:{
               focus:{
                   inserted (el){
                       el.focus()
                   }
               }
        },
        // 监听
        watch:{
          // 这个是简写形式只能监听到数组里面每一项有没有变化
          // 完整的书写形式
          dataList:{
              handler (newArr){
           // 监听到了数组的变化
           // 存储到 localstorage 里面
           window.localStorage.setItem('dataList',JSON.stringify(newArr))
              },
              // 开启深度监听
              deep:true
          }     
        },
         // 计算属性
         computed:{
           activeNum () {
               return this.dataList.filter(item=> !item.isFinish).length
           },
           toggleAll: {
            get () {
                return this.dataList.every(item => item.isFinish)
            },
            set (val) {
                this.dataList.forEach(item => item.isFinish = val)
            }
        }
         },
        methods:{
            // 添加一条todo
            addTodo(){
               // console.log(addTodo);
                // 非空验证
                if(!this.newTodo.trim()) return
                //组装一个对象出来
                this.dataList.push({
                    content:this.newTodo.trim(),
                    isFinish:false,
                     id:this.dataList.length ? this.dataList.sort((a,b) => a.id - b.id)[this.dataList.length - 1]['id']+1 : 1
                })
                // 清空文本框
                this.newTodo = ''
            },
            // 删除一条 todo
            delTodo(index){
                this.dataList.splice(index,1)
            },
            // 删除所有
            delAll(){
                this.dataList = this.dataList.filter(item => !item.isFinish )
            }
        },
        // 全选按钮
      
    
    })
})(window, Vue);
 





  
        




 