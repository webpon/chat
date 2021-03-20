
function HashTable () {
  this.storage = []
  this.count = 0
  this.limit = 7
  HashTable.prototype.hashFunc = function (str, size) {
    //1.定义hashCode变量
    var hashCode = 0
    //2.根据霍纳算法,计算hashCode的值
    //借助Unicode编码计算
    if(str){
      for (var i = 0; i < str.length; i++) {
        hashCode = 37 * hashCode + str.charCodeAt(i)
      }
    }

    //3.取余操作 5%4=1
    var index = hashCode % size
    return index
  }

  HashTable.prototype.put = function (key, value) {
    //1.根据key获取对应的index
    var index = this.hashFunc(key, this.limit)

    //2.根据index取得对应的bucket(bucket是key的hashCode对应下表位置，)
    var bucket = this.storage[index]
    //3.判断当前bucket是否为空
    if (bucket == null) {
      bucket = []
      this.storage[index] = bucket
    }

    //4.判断是否修改数据
    for (var i = 0; i < bucket.length; i++) {
      var tuple = bucket[i]
      if (tuple[0] == key) {
        tuple[1] = value
        return
      }
    }

    //5.当前bucket(链表)中没有该数据,就直接添加该数据
    bucket.push([key, value])
    this.count += 1

    //数组扩容
    if (this.count > this.limit * 0.75) {
      var newSize = this.limit * 2
      var newPrime = this.getPrime(newSize)
      this.resize(newPrime)
    }
  }

  //get获取元素
  HashTable.prototype.get = function (key) {
    /**
    *1.根据key,获得index;
    * 2.根据index,获得bucket;
    * 3.判断bucket是否为null,为null就直接返回null
    * 4.bucket不为null，则遍历找到对应的key
    * 5.遍历完后，没有找到对应的key，就返回null
    **/
    var index = this.hashFunc(key, this.limit)
    var bucket = this.storage[index]
    if (bucket == null) {
      return null
    }
    for (var i = 0; i < bucket.length; i++) {
      var tuple = bucket[i]
      if (tuple[0] == key) {
        return tuple[1]
      }
    }
    //在index对应的bucket（不为null）中没有找到对应的key
    return null

  }

  //remove方法
  HashTable.prototype.remove = function (key) {
    var index = this.hashFunc(key, this.limit)
    var bucket = this.storage[index]
    if (bucket == null) {
      return null
    }
    for (var i = 0; i < bucket.length; i++) {
      var tuple = bucket[i]
      if (tuple[0] == key) {
        bucket.splice(i, 1)//删除当前位置的元素https://wangdoc.com/javascript/stdlib/array.html#splice
        this.count--
        return tuple[1]

        //缩小容量
        if (this.limit > 7 && this.count < this.limit * 0.25) {
          var newSize = Math.floor(this.limit / 2)
          var newPrime = this.getPrime(newSize)
          this.resize(newPrime)
        }
      }
    }

    return null
  }

  HashTable.prototype.isEmpty = function () {
    return this.count == 0
  }
  HashTable.prototype.size = function () {
    return this.count
  }
  //获取哈希表中所有元素
  HashTable.prototype.getAllElement = function () {
    var oldStorage = this.storage
    var bucket = []
    let arr = []
    for (var i = 0; i < this.limit; i++) {
      bucket = oldStorage[i]
      if (bucket === undefined) {
        continue
      }
      for (var j = 0; j < bucket.length; j++) {
        var tuple = bucket[j]
        arr.push(tuple[1])
      }
    }
    return arr
  }
  //哈希表的扩容
  HashTable.prototype.resize = function (newLimit) {
    var oldStorage = this.storage

    this.storage = []
    this.count = 0
    this.limit = newLimit

    var bucket = []
    for (var i = 0; i < this.count; i++) {
      bucket = oldStorage[i]
      if (bucket == null) {
        continue
      }
      for (var j = 0; j < bucket.length; i++) {
        var tuple = bucket[i]
        this.put(tuple[0], tuple[1])
      }
    }
  }

  //判断数字是否是质数
  HashTable.prototype.isPrime = function (num) {
    //1.获得num的平方根
    var temp = parseInt(Math.sqrt(num))

    for (var i = 2; i < temp; i++) {
      if (num % i == 0) {
        return false
      }
    }

    return true
  }

  //获取质数的方法
  HashTable.prototype.getPrime = function (num) {
    while (!this.isPrime(num)) {
      num++
    }
    return num
  }

}

module.exports = HashTable
