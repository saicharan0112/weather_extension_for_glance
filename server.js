import express from 'express';  // Using `import` for ES Modules
import fetch from 'node-fetch';  // Using `import` for node-fetch (v3.x)

const app = express();
const port = 3000;

app.get('/getAlerts', async (req, res) => {
    const state = req.query.state || 'TX';  // Default to 'TX' if no state is provided
    const url = `https://api.weather.gov/alerts/active?area=${state}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        res.set('Widget-Title', 'Weather Alerts API');
        res.set('Widget-Content-Type', 'html');

        // Loop through the alerts and format them as needed
        // const alertsDiv = `
        //     <div id="alertInfo">
        //         ${data.features.map(alert => `
        //             <p><strong>Severity:</strong> ${alert.properties.severity}</p>
        //             <p><strong>Event:</strong> ${alert.properties.event}</p>
        //             <p><strong>Certainty:</strong> ${alert.properties.certainty}</p>
        //             <p><strong>Headline:</strong> ${alert.properties.headline}</p>
        //             <p><strong>Description:</strong><br><br> ${alert.properties.description.replace(/\n/g, '<br>')}</p>
        //             <p><strong>Instructions:</strong><br><br> ${alert.properties.instruction ? alert.properties.instruction.replace(/\n/g, '<br>') : 'No instructions provided.'}</p>
        //             <p><strong>Status:</strong> ${alert.properties.status}</p>
        //             <p><strong>Sent Time:</strong> ${alert.properties.sent}</p>
        //             <p><strong>Effective Time:</strong> ${alert.properties.effective}</p>
        //             <p><strong>Start Time:</strong> ${alert.properties.onset}</p>
        //             <p><strong>End Time:</strong> ${alert.properties.ends}</p>
        //             <p><strong>Expire Time:</strong> ${alert.properties.expires}</p>
        //             <p><strong>Message Type:</strong> ${alert.properties.messageType}</p>
        //             <hr>
        //         `).join('')}
        //     </div>
        // `;
        const alertsDiv = `
            ${data.features.map(alert => `
#Severity#: ${alert.properties.severity}
#Event#: ${alert.properties.event}
#Certainty#: ${alert.properties.certainty}
#Headline#: ${alert.properties.headline}
#Description#: 
${alert.properties.description}

#Instructions#:
${alert.properties.instruction}

#Status#: ${alert.properties.status}
#Sent Time#: ${alert.properties.sent}
#Effective Time#: ${alert.properties.effective}
#Start Time#:  ${alert.properties.onset}
#End Time#:${alert.properties.ends}
#Expire Time#: ${alert.properties.expires}
#Message Type#: ${alert.properties.messageType}
            `).join('\n')}
        `;

        res.send(alertsDiv);  // Send the formatted HTML output
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(3000, '0.0.0.0', () => console.log('Server running at http://0.0.0.0:3000'));

