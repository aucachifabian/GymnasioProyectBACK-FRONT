const tool  = {}


tool.addDays = function(amount, day)
{ 
  return day.getDate()+amount;  
}


module.exports = tool;