const personMapping = {
    name: "<%-   name %>",
    address:'<%-   address.city+" "+  address.state %>',
    email: '<%-   email %>',
    keywords: ['<%-   keyword1 %>', '<%-   keyword2 %>'],
    hobbies: {
      primary: '<%-   hobby[0] %>',
      secondary: '<%-  hobby[1] %>'
    }
    
  };
  



  module.exports= personMapping