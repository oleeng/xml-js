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
    if(this._data.tag == "xml-js-text-field"){
      // text feld
      return null
    }
    if(node instanceof Node){
      node._data.parent = this
      this._data.children.push(node)
      return node
    }else if(typeof node == "string"){
      let n = new Node("xml-js-text-field")
      n.addAttribute("textContent", node)
      n._data.parent = this
      this._data.children.push(n)
      return n
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

  export(){
    if(this.constructor != XMLContainer){
      console.log("export nur auf den XMLContainer anwendbar...");
      return ;
    }
    let xml = ""

    xml += createHeader(this._data)

    xml += createContent(this._data.children)

    return xml

    function createHeader(header){
      let hString = ""
      hString += "<?"+header.tag
      for(const a in header.attributes){
        hString += " "+a+"=\""+header.attributes[a]+"\""
      }
      hString += "?>"
      return hString
    }

    function createContent(content){
      let cString = ""
      for(const c in content){
        if(content[c].tag == "xml-js-text-field"){
          // text node
          cString += content[c]._data.attributes["textContent"]
          continue
        }
        cString += "<"+content[c].tag
        for(const a in content[c].attributes){
          cString += " "+a+"=\""+content[c].attributes[a]+"\""
        }
        if(content[c].children.length == 0){
          cString += "/>"
        }else{
          cString += ">"
          cString += createContent(content[c].children)
          cString += "</"+content[c].tag+">"
        }
      }
      return cString
    }
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
