import fetch from 'node-fetch';  // Using `import` for node-fetch (v3.x)

// Parse the response data
function parseResponse(responseData) {
    const data = {};
    data["area"] = responseData.features[0].properties.areaDesc;
    data["sentTime"] = responseData.features[0].properties.sent;
    data["effectTime"] = responseData.features[0].properties.effective;
    data["startTime"] = responseData.features[0].properties.onset;
    data["endTime"] = responseData.features[0].properties.ends;
    data["expireTime"] = responseData.features[0].properties.expires;
    data["status"] = responseData.features[0].properties.status;
    data["messageType"] = responseData.features[0].properties.messageType;
    data["severity"] = responseData.features[0].properties.severity;
    data["certainty"] = responseData.features[0].properties.certainty;
    data["event"] = responseData.features[0].properties.event;
    data["headline"] = responseData.features[0].properties.headline;
    data["description"] = responseData.features[0].properties.description;
    data["instruction"] = responseData.features[0].properties.instruction;
    data["response"] = responseData.features[0].properties.response;

    return data;
}

// Function to fetch weather alerts for a given state
function fetchWeatherAlerts(state) {
    const url = `https://api.weather.gov/alerts/active?area=${state}`;
    
    return fetch(url)
        .then(response => response.json())
        .then(responseData => {
            if (responseData.features.length > 0) {
                const data = parseResponse(responseData);
                let alertText = '';

                // Determine the severity level
                let alertClass = '';
                switch (data.severity.toLowerCase()) {
                    case 'critical':
                        alertClass = 'alert-critical';
                        break;
                    case 'moderate':
                        alertClass = 'alert-moderate';
                        break;
                    default:
                        alertClass = 'alert-low';
                        break;
                }

                alertText += `<strong class="key ${alertClass}">Alert!</strong><br><br>`;
                alertText += `<strong class="key">Headline:</strong> <span class="value">${data.headline}</span><br>`;
                alertText += `<strong class="key">Event:</strong> <span class="value">${data.event}</span><br>`;
                alertText += `<strong class="key">Severity:</strong> <span class="value">${data.severity}</span><br>`;
                alertText += `<strong class="key">Sent Time:</strong> <span class="value">${data.sentTime}</span><br>`;
                alertText += `<strong class="key">Description:</strong><br><span class="value">${data.description}</span><br><br>`;
                alertText += `<strong class="key">Instructions:</strong> <span class="value">${data.instruction}</span><br>`;
                alertText += `<strong class="key">Response:</strong> <span class="value">${data.response}</span>`;

                return alertText;
            } else {
                return `No active alerts for ${state}.`;
            }
        })
        .catch(error => {
            console.error("Failed to retrieve data:", error);
            return 'Error fetching alert data.';
        });
}

// Read the state from the command line arguments
const state = process.argv[2] || 'TX';  // Default to 'TX' if no state is provided

// Display weather alerts for the given state
fetchWeatherAlerts(state)
    .then(alertHTML => {
        console.log(alertHTML);  // Prints the HTML content to the console
    });
