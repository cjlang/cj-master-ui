const pageMixins = {
    data () {
      return {
        currentpage: 1,
        pagesize: 10,
        totalPage: 0,
        totalCount: 0
      }
    },
    methods: {
      sizeChangeHandle (val) {
        this.pagesize = val
        this.currentpage = 1
        this.getDataList()
      },
      currentChangeHandle (val) {
        this.currentpage = val
        this.getDataList()
      }
    }
  }
  
  export { pageMixins }
  