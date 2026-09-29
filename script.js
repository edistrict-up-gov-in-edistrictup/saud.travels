// 1. Button Click to Start Video with Audio
document.getElementById('start-btn').addEventListener('click', function() {
    const video = document.getElementById('bg-video');
    const startBtn = document.getElementById('start-btn');
    const introContent = document.getElementById('intro-content');
    const introScreen = document.getElementById('intro-screen');
    const mainWebsite = document.getElementById('main-website');

    // Hide button and show Welcome animation
    startBtn.style.display = 'none';
    introContent.style.display = 'block';

    // Play video WITH sound from the beginning
    video.currentTime = 0;
    video.muted = false;
    video.volume = 1.0;
    video.play();

    // Exactly 10 Seconds later: Hide intro screen, mute video, show dashboard
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainWebsite.style.display = 'block';
        
        // Mute video so it runs silently in background (Video rukega nahi)
        video.muted = true;
        
        // Load Offer Popup
        fetchOfferPopup();
    }, 10000); // 10000 milliseconds = 10 Seconds
});

// 2. लाइव टाइमर और हिंदी दिन (Live Timer)
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

// 3. Stop & Go Image Scroller (Har 5 seconds mein ruk-ruk kar scroll karega)
setInterval(() => {
    const scroller = document.getElementById('img-scroller');
    if (scroller) {
        const scrollAmount = 340; // Ek image scroll hogi
        
        if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 10) {
            scroller.scrollTo({ left: 0, behavior: 'smooth' }); 
        } else {
            scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
}, 5000);

// 4. सर्विसेस लिस्ट (Dynamic Services Grid)
const services = [
    "आय जात निवास प्रमाण पत्र", "आधार कार्ड में पता बदले", "शादी के बाद पति का नाम डाले", 
    "न्यू पैन कार्ड", "पैन कार्ड संसोधन", "पहचान पत्र", "पहचान पत्र में संसोधन", 
    "ड्राइविंग लाइसेंस", "आयुष्मान कार्ड", "आभा कार्ड", "आपार कार्ड", "किसान सम्मान निधि", 
    "पासपोर्ट", "फ्लाइट टिकट", "रेल टिकट", "बस टिकट", "बिमा", 
    "दो चक्का और चार चक्का प्लेट नंबर आवेदन", "PCC", "आन लाइन फार्म आवेदन"
];

const grid = document.getElementById('servicesGrid');
const whatsappNumber = "918604890504";

services.forEach(service => {
    const a = document.createElement('a');
    a.href = `https://wa.me/${whatsappNumber}?text=नमस्ते, मुझे '${service}' के बारे में जानकारी चाहिए।`;
    a.className = 'service-box';
    a.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${service}</span>`;
    a.target = "_blank";
    grid.appendChild(a);
});

// 5. Offer Popup Logic
function fetchOfferPopup() {
    fetch('data/offer.json')
        .then(response => response.json())
        .then(data => {
            if(data.showOffer) {
                document.getElementById('offerTitle').innerText = data.offerName;
                document.getElementById('offerDesc').innerText = data.offerDesc;
                document.getElementById('offerImage').src = data.offerImage;
                document.getElementById('offerModal').style.display = "flex";
            }
        })
        .catch(error => console.log("No active offer found."));
}

function closeOffer() {
    document.getElementById('offerModal').style.display = "none";
}