module.exports = getDate; //to return the function value we can also use exports only
function getDate(){
    let options = {
        weekday : 'long',
        month: 'long',
        day: 'numeric'
      };
      
      let today = new Date();
      let day = today.toLocaleDateString("en-US",options);
 return day;   
}
