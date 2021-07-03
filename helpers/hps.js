const moment=require('moment');
const day = require('dayjs');
module.exports={
   
  formatTime:function(date, format){
    return moment(date).format(format);
  },
    formatDate:function(date){
        return moment(date).fromNow();
    },
    formatNew:function(date){
      return day(date).format('DD MMMM YYYY, h:mm a');
  },
  adminDate:function(){
    return day().format(' DD/MM/YYYY, h:mm a');
},
   
    select: function (selected, options) {
        return options
          .fn(this)
          .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
          )
          .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
          )
      },
        truncate:function (str, len){
        if(str.length> len && str.length>0){
            var new_str=str+"";
            new_str = str.substr(0, len);
            new_str = str.substr(0, new_str.lastIndexOf(""));
            new_str = (new_str.length>0)? new_str: str.substr(0, len);
            return new_str + '...';
        }
        return str;
    },
    stripTags:function(input){
        return input.replace(/<(?:.|\n)*?/gm, '');
    },
     
    section: function(name, options){
      if(!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
  },
     
};