// Personal API for OpenWeatherMap API
const apiKey = '9e755ef08011dd344ce59076560d6515';
const currentDate = new Date().toDateString();

// Event listener to add function to existing HTML DOM element
document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate');
    generateButton.addEventListener('click', performAction);
});

// Function called by event listener
function performAction(){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeatherData(zipCode)
	    .then(data => {
			if(data.cod ==200){
                const temp = data.main.temp;
                const newData= {
                    temperature: temp,
                    feelings: feelings,
                    date: new Date().toLocaleDateString()
                }; 
                postData('/add', newData);
                udpateUI();
		    }else{
			    console.error('Error fetching weather data:', data.message);
			    if (data.message ==='city not found'){
				   alert('City not found. Please enter a valid code.');
			    }
		    }
		})
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
}

// Function to GET Web API Data
const getWeatherData = async (zip) =>{
	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`);
    try{
        const data = await response.json();
        return data;
    }catch (error){
        console.error('Error fparsing response:', error);
    }

}

// Function to POST data
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        return newData;
    }catch(error){
        console.error('Error posting data:', error);
    }
}

// Function to Update UI
const udpateUI = async() =>{
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}°F`;
        document.getElementById('content').innerHTML = `Feelings: ${allData.feelings}`;
    } catch (error){
        console.error('Error Updating UI:', error);
    }
}