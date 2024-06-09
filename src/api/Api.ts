export async function GetUsersList (){

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if(!response.ok){
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    
    if(data)
      return data;
    
  } catch (error) {
    console.log(error);
  }

}