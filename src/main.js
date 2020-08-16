class Element {
  constructor(tag) {
    this._data = {
      tag: tag,
      attributes: {},
      children: [],
      parent: null
    }
  }

  set tag(tag){
    if(typeof tag == "string"){
      this._data.tag = tag
    }
  }

  get tag(){
    return this._data.tag
  }

  addAttribute(key, value){
    if(typeof key == "string" && typeof value == "string"){
      this._data.attributes[key] = value
    }
  }

  removeAttribute(key){
    if(typeof key == "string"){
      delete this._data.attributes[key]
    }
  }

  get attributes(){
    return this._data.attributes;
  }

  get children(){
    return this._data.children;
  }

  get firstChild(){
    return this._data.children[0];
  }

  get lastChild(){
    return this._data.children[this._data.children.length - 1];
  }

  addChild(node){
    if(node instanceof Node){
      node._data.parent = this
      this._data.children.push(node)
      return node
    }
    return null
  }

  removeChild(node){
    const i = this.children.indexOf(node)
    if(i >= 0){
      this.children.splice(i, 1)
    }
  }

  remove(){
    this.parent.removeChild(this)
  }

  get parent(){
    return this._data.parent;
  }
}

class Node extends Element {
  constructor(tag) {
    super(tag)
  }
}

class XMLContainer extends Element {
  constructor() {
    super("xml")
    this.addAttribute("version", "1.0")
    this.addAttribute("encoding", "UTF-8")
    this.addAttribute("standalone", "yes")
  }

  addChild(node){
    if(this._data.children.length == 0){
      return super.addChild(node)
    }
    return null
  }
}

/*
var n = new XMLContainer()
var t = n.addChild(new Node("a"))
t.addChild(new Node("b"))

t.remove()
n.removeChild(t)


console.log(n);
console.log(n.lastChild);
*/
