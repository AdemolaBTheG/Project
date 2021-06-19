function htmlUrl(e) {
    if (e.key === 'Enter') {
        const url = document.getElementById("url").value;
        const xml = new XMLHttpRequest();
        xml.open("GET", "https://webrisk.googleapis.com/v1/uris:search?key=AIzaSyDaYuRIEVJWw-vPgJ8bqIRRZpvdABaIs88&threatTypes=MALWARE&uri=" + encodeURIComponent(url));
        
        xml.onload = () => {
            if (xml.status == 200) {
                const response = JSON.parse(xml.responseText);
                
                if (Object.entries(response).length == 0) {
                    window.alert("URL isn't provied in any threat lists!")
                } else {
                    const threat = response.threat;
                    let message = "URL IS provided in a threat list!";
                    if (threat.threatTypes && threat.threatTypes.length > 0) {
                        message += "\nThread types: " + threat.threatTypes[0];
                        for (let i = 1; i < threat.threatTypes.length; i++) {
                            const element = threat.threatTypes[i];
                            message += ", " + element;
                        }
                    }
        
                    if (threat.expireTime) {
                        message += "\nExpire time: " + threat.expireTime;
                    }
        
                    window.alert(message)
                }
            }
        }
        
        xml.send();
    } 
}
