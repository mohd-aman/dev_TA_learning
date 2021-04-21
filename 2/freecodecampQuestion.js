function updateRecords(object, id, prop, value) {
    let obj=object[id];
    if(prop!='tracks' && value!='')
    {
      obj[prop]=value;
    }
    else if(prop=='tracks' &&  obj.tracks==undefined)
    {
      let arr=[];
      arr.push(value)
      obj[prop]=arr;
    }
    else if(prop=='tracks' && value!=='')
    {
      obj[prop].push(value);
    }
    else if(value=='')
    {
      delete obj[prop];
    }
    return object;
  }