// Canvas Particle System
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
        this.color = `rgba(255, ${Math.floor(Math.random() * 100 + 139)}, ${Math.floor(Math.random() * 100 + 171)}, ${Math.random() * 0.5 + 0.3})`;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections
    particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 139, 171, ${0.2 * (1 - distance / 150)})`;
                ctx.lineWidth = 1;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Typewriter Effect
const typewriterTexts = [
    'Kamu adalah alasan aku bahagia...',
    'Setiap hari bersamamu adalah berkah...',
    'Cintaku padamu takkan pernah berakhir...',
    'Kamu sempurna di mataku...',
    'Terima kasih sudah jadi milikku...'
];
let typewriterIndex = 0;

setInterval(() => {
    typewriterIndex = (typewriterIndex + 1) % typewriterTexts.length;
    document.getElementById('typewriter').textContent = typewriterTexts[typewriterIndex];
}, 6000);

// Love Messages
const loveMessages = [
    "Setiap detik bersamamu terasa seperti surga. Kamu adalah senyum di pagi hariku, kehangatan di malam dinginku, dan alasan aku percaya pada keajaiban cinta sejati. Terima kasih sudah hadir dan melengkapi hidupku, sayangku. 💕",
    "Kamu tahu? Di antara miliaran orang di dunia ini, aku menemukan kamu. Dan itu bukan kebetulan, itu adalah takdir terindah yang pernah Tuhan berikan padaku. I love you more than words can say! 🌟",
    "Cintaku padamu seperti langit yang tak terbatas, seperti laut yang tak bertepi. Setiap hari bersamamu adalah petualangan baru yang penuh kebahagiaan. Forever and always, my love! 💖",
    "Kalau cinta punya warna, kamu adalah pelangi terindah dalam hidupku. Kalau cinta punya suara, kamu adalah melodi yang selalu terngiang di hatiku. You complete me! 🎨🎵",
    "Aku bersyukur setiap hari karena punya kamu. Kamu bukan hanya pasanganku, tapi juga sahabat terbaik, pelindungku, dan rumah dimana hatiku beristirahat. Thank you for being you! 🏡",
    "Seandainya aku bisa memberikan satu hal di dunia ini, aku akan memberikanmu cermin untuk melihat betapa istimewanya kamu di mataku. You're my everything! ✨",
    "Dari semua keputusan yang pernah aku buat, memilih untuk mencintaimu adalah keputusan terbaik. Dan aku akan terus memilihmu, setiap hari, selamanya. 💍",
    "Cinta kita seperti bintang di langit malam - indah, bercahaya, dan abadi. Terima kasih sudah menerangi hidupku dengan cintamu yang tulus, sayangku. 🌟",
    "Aku mencintai semua tentang kamu: tawamu, senyummu, caramu peduli, bahkan saat kamu sedang ngambek sekalipun. Everything about you is perfect! 😊",
    "Kamu adalah jawaban dari setiap doaku, mimpi yang jadi kenyataan, dan cinta yang selalu aku inginkan. I'm the luckiest person alive because I have you! 🙏💕"
];

let currentMessageIndex = 0;

function changeLoveMessage() {
    currentMessageIndex = (currentMessageIndex + 1) % loveMessages.length;
    const messageEl = document.getElementById('loveMessage');
    messageEl.style.opacity = '0';
    messageEl.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        messageEl.textContent = loveMessages[currentMessageIndex];
        messageEl.style.transition = 'all 0.5s ease';
        messageEl.style.opacity = '1';
        messageEl.style.transform = 'translateY(0)';
    }, 300);

    createHeartRain();
}

// Love Meter
function fillLoveMeter() {
    const meter = document.getElementById('loveMeter');
    const percentage = document.getElementById('lovePercentage');
    let width = 0;
    
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            createFireworks();
            showModal('💖 Love Meter Penuh! 💖', '😍💕✨', 'Cintaku padamu sudah melampaui batas! 100% bahkan tidak cukup untuk menggambarkan betapa besar cintaku padamu, sayangkuuu cintakuu! 💖💖💖');
        } else {
            width++;
            meter.style.width = width + '%';
            meter.textContent = width + '%';
            percentage.textContent = width;
        }
    }, 20);
}

// Hearts Grid Game
const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞', '💟'];
const gameMessages = [
    'Kamu menemukan cintaku! 💕',
    'Hatiku milikmu! ❤️',
    'Love you to the moon and back! 🌙',
    'You\'re my soulmate! 💫',
    'Forever yours! 💍',
    'Kamu adalah segalanya bagiku! ✨',
    'My heart beats for you! 💓',
    'You make me complete! 💖',
    'Always and forever! 💝'
];

function initHeartsGame() {
    const grid = document.getElementById('heartsGrid');
    grid.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const box = document.createElement('div');
        box.className = 'heart-box';
        box.textContent = '?';
        box.onclick = function() {
            if (!this.classList.contains('revealed')) {
                this.classList.add('revealed');
                this.textContent = heartEmojis[i];
                document.getElementById('gameMessage').textContent = gameMessages[i];
                createMiniExplosion(this);
            }
        };
        grid.appendChild(box);
    }
}

initHeartsGame();

// Photo Messages
const photoMessages = [
    { title: '💕 Kenangan Indah', emoji: '📸💖', message: 'Setiap foto kita adalah bukti cinta yang tak terlupakan. Setiap senyum, setiap tawa, setiap momen bersama adalah harta karun yang akan selalu aku jaga di hatiku (Kadang malas foto sih hehe..)! 💕' },
    { title: '💖 Momen Spesial', emoji: '🌟😊', message: 'Dari semua tempat yang pernah kita kunjungi bersama, tempat favoritku tetaplah pelukan hangatmu. Home is wherever I\'m with you! (Jangan pernah melupakan tempat pertama yang kita kunjungi ya sayanggg...🏡' },
    { title: '💗 Petualangan Kita', emoji: '🌍✈️', message: 'Setiap petualangan bersamamu adalah cerita cinta yang tertulis di bintang-bintang. Mari kita buat lebih banyak kenangan indah bersama! 🌟' },
    { title: '💓 Cinta Sejati', emoji: '💑💕', message: 'Inilah bukti bahwa cinta sejati itu nyata. Kamu dan aku, bersama melawan dunia. Forever my partner in crime! 👫' },
    { title: '💝 Kebersamaan', emoji: '🤗💖', message: 'Setiap detik kebersamaan kita adalah detik yang tak ternilai harganya. Terima kasih sudah menjadikan hidupku penuh warna dan bahagia! 🎨' },
    { title: '💘 Our Story', emoji: '📖💕', message: 'Cerita cinta kita adalah yang paling indah. Belum selesai dan akan terus berlanjut sampai akhir waktu. To be continued... forever! 💫' }
];

function showPhotoMessage(index) {
    const msg = photoMessages[index - 1];
    showModal(msg.title, msg.emoji, msg.message);
    createHeartRain();
}

// Mega Surprise
const megaSurprises = [
    { title: '🎉 SURPRISE ULTRA! 🎉', emoji: '😍💖✨🌟💕', message: 'Kamu tahu nggak? Setiap hari bersamamu adalah hadiah terindah yang pernah aku terima. Aku bersyukur setiap detik karena punya kamu. YOU ARE MY GREATEST BLESSING! 💝' },
    { title: '💥 LEDAKAN CINTA! 💥', emoji: '💣💖💕💗💓', message: 'BOOMM! Cintaku padamu meledak! Terlalu besar untuk bisa ditahan! Kamu adalah alasan jantungku berdetak, alasan aku bangun dengan senyuman, dan alasan aku percaya pada keajaiban! Anjaiii Gombalankuhhh.. 🌟' },
    { title: '🌟 MAGIC MOMENT! 🌟', emoji: '✨🪄💫💖🎆', message: 'Ini bukan sulap, ini bukan sihir - ini adalah CINTA, dan SAYANG ku kepada adekku tersayanggg ! Adekk mengubah hidupku dari hitam putih menjadi technicolor! Thank you for being my rainbow bubb! 🌈' },
    { title: '🚀 TO INFINITY! 🚀', emoji: '🚀🌙⭐💖🌟', message: 'Aku akan mencintai adek sampai ke bulan dan kembali lagi, sampai ke bintang dan lebih jauh lagi, sampai infinity dan beyond! My love for you knows no bounds wkwk! ∞' },
    { title: '👑 QUEEN OF MY HEART! 👑', emoji: '👑💖✨🌹💕', message: 'Kamu adalah ratu di kerajaan hatiku, permaisuri di istana cintaku, dan satu-satunya yang berkuasa penuh atas perasaanku. Long live the queen! My And Princess 👑' }
];

function showMegaSurprise() {
    const surprise = megaSurprises[Math.floor(Math.random() * megaSurprises.length)];
    showModal(surprise.title, surprise.emoji, surprise.message);
    createFireworks();
    createHeartExplosion();
    createHeartRain();
    
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200]);
    }
}

// Modal Functions
function showModal(title, emoji, message) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalEmoji').textContent = emoji;
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('surpriseModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('surpriseModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target.id === 'surpriseModal') {
        closeModal();
    }
}

// Fireworks Effect
function createFireworks() {
    const colors = ['#ff8fab', '#ffc1cc', '#d4567a', '#ffb3c6', '#ffd1dc'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(firework);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 100 + Math.random() * 200;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let x = 0, y = 0, opacity = 1;
            const animation = setInterval(() => {
                x += vx / 20;
                y += vy / 20;
                opacity -= 0.02;
                
                firework.style.transform = `translate(${x}px, ${y}px) scale(${opacity * 2})`;
                firework.style.opacity = opacity;
                
                if (opacity <= 0) {
                    clearInterval(animation);
                    firework.remove();
                }
            }, 30);
        }, i * 20);
    }
}

// Heart Rain Effect
function createHeartRain() {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.fontSize = (20 + Math.random() * 30) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            document.body.appendChild(heart);
            
            let yPos = -50;
            const fallSpeed = 2 + Math.random() * 3;
            const swing = Math.random() * 4 - 2;
            let xOffset = 0;
            
            const animation = setInterval(() => {
                yPos += fallSpeed;
                xOffset += swing;
                heart.style.top = yPos + 'px';
                heart.style.transform = `translateX(${xOffset}px) rotate(${xOffset}deg)`;
                
                if (yPos > window.innerHeight) {
                    clearInterval(animation);
                    heart.remove();
                }
            }, 30);
        }, i * 100);
    }
}

// Heart Explosion
function createHeartExplosion() {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = centerX + 'px';
            heart.style.top = centerY + 'px';
            heart.style.fontSize = '30px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            document.body.appendChild(heart);
            
            const angle = (Math.PI * 2 * i) / 50;
            const velocity = 100 + Math.random() * 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let x = 0, y = 0, opacity = 1;
            const animation = setInterval(() => {
                x += vx / 10;
                y += vy / 10;
                opacity -= 0.02;
                
                heart.style.transform = `translate(${x}px, ${y}px) rotate(${x}deg)`;
                heart.style.opacity = opacity;
                
                if (opacity <= 0) {
                    clearInterval(animation);
                    heart.remove();
                }
            }, 30);
        }, i * 20);
    }
}

// Mini Explosion for Game
function createMiniExplosion(element) {
    const rect = element.getBoundingClientRect();
    const hearts = ['❤️', '💕', '💖'];
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + rect.height / 2 + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        document.body.appendChild(heart);
        
        const angle = (Math.PI * 2 * i) / 8;
        const velocity = 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0, y = 0, opacity = 1;
        const animation = setInterval(() => {
            x += vx / 10;
            y += vy / 10;
            opacity -= 0.05;
            
            heart.style.transform = `translate(${x}px, ${y}px)`;
            heart.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(animation);
                heart.remove();
            }
        }, 30);
    }
}

// Auto fill love meter on page load
setTimeout(() => {
    fillLoveMeter();
}, 1000);

// Random heart rain
setInterval(() => {
    if (Math.random() > 0.7) {
        createHeartRain();
    }
}, 15000);