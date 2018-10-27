(function (window, Vue) {
	new Vue({
		el: '#app',
		data: {
			dataList: JSON.parse(window.localStorage.getItem('dataList')) || [],
			newTodo: ''
		},
		methods: {
			addTodo () {
				if (!this.newTodo.trim()) return
				this.dataList.push({
					content: this.newTodo.trim(),
					isFinish: false,
					id: this.dataList.length ? this.dataList.sort((a, b) => a.id - b.id)[this.dataList.length - 1]['id'] + 1 : 1
				})
				this.newTodo = ''
			},
			delTodo (index) {
				this.dataList.splice(index, 1)
			},
			delAll () {
				this.dataList = this.dataList.filter(item => !item.isFinish)
			}
		},
		directives: {
			focus: {
				inserted (el) {
					el.focus()
				}
			}
		},
		watch: {
			dataList: {
				handler (newArr) {
					window.localStorage.setItem('dataList', JSON.stringify(newArr))
				},
				deep: true
			}
		},
		computed: {
			activeNum () {
				return this.dataList.filter(item => !item.isFinish).length
			},
			toggleAll: {
				get () {
					return this.dataList.every(item => item.isFinish)
				},
				set (val) {
					this.dataList.forEach(item => item.isFinish = val)
				}
			}
		}
	})
})(window, Vue);
