// लाइव टाइमर और हिंदी दिन
function updateTime() {
    const now = new Date();
    const days = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
    
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    const timeStr = `${hours}:${minutes}:${seconds} ${ampm}`;
    const dateStr = `${day}, ${date}/${month}/${year}`;
    
    document.getElementById('date-time').innerText = `${dateStr} | ${timeStr}`;
}
setInterval(updateTime, 1000);
updateTime();

// सर्विसेस लिस्ट 
const services = [
    "आय जात निवास प्रमाण पत्र", "आधार कार्ड में पता बदले", "शादी के बाद पति का नाम डाले", 
    "न्यू पैन कार्ड", "पैन कार्ड संसोधन", "पहचान पत्र", "पहचान पत्र में संसोधन", 
    "ड्राइविंग लाइसेंस", "आयुष्मान कार्ड", "आभा कार्ड", "आपार कार्ड", "किसान सम्मान निधि", 
    "पासपोर्ट", "फ्लाइट टिकट", "रेल टिकट", "बस टिकट", "बिमा", 
    "दो चक्का और चार चक्का प्लेट नंबर आवेदन", "PCC", "आन लाइन फार्म आवेदन"
];

const grid = document.getElementById('servicesGrid');
const whatsappNumber = "918604890504";

// डायनामिक रूप से सर्विसेस को HTML में जोड़ना और WhatsApp लिंक लगाना
services.forEach(service => {
    const a = document.createElement('a');
    a.href = `https://wa.me/${whatsappNumber}?text=नमस्ते, मुझे '${service}' के बारे में जानकारी चाहिए।`;
    a.className = 'service-box';
    a.innerText = service;
    a.target = "_blank";
    grid.appendChild(a);
});

// Offer Popup Logic (Reads from local JSON file in 'data' folder)
window.onload = function() {
    fetch('data/offer.json')
        .then(response => response.json())
        .then(data => {
            if(data.showOffer) {
                document.getElementById('offerTitle').innerText = data.offerName;
                document.getElementById('offerDesc').innerText = data.offerDesc;
                document.getElementById('offerImage').src = data.offerImage;
                document.getElementById('offerModal').style.display = "block";
            }
        })
        .catch(error => console.log("No active offer found or fetch error."));
};

function closeOffer() {
    document.getElementById('offerModal').style.display = "none";
}