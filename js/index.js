// إنشاء النجوم

function createStars() {
    const starsContainer = document.querySelectorAll('.stars');
    starsContainer.forEach(container => {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(star);
        }
    });
}

// إنشاء الإيموجي المتساقطة
const emojis = ['❤️', '🎂', '🎉', '🎈', '🎁', '🌟', '💖', '🎊', '🥳', '🌹', '💝', '🎀', '✨', '🦋', '🌸'];

function createFallingEmoji() {
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + '%';
    emoji.style.animationDuration = (Math.random() * 3 + 2) + 's';
    emoji.style.animationDelay = Math.random() * 2 + 's';

    document.querySelector('.falling-emojis').appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
    }, 5000);
}

// تشغيل الموسيقى
let waitingMusicPlaying = false;
let perfectMusicPlaying = false;
let specialSongPlaying = true; // تبدأ الأغنية الخاصة مشغلة تلقائياً

function toggleWaitingMusic() {
    const audio = document.getElementById('waitingMusic');
    if (waitingMusicPlaying) {
        audio.pause();
        document.getElementById('firstPageAudio').textContent = '🔊';
        waitingMusicPlaying = false;
    } else {
        audio.play().catch(e => console.log('لا يمكن تشغيل الموسيقى'));
        document.getElementById('firstPageAudio').textContent = '🔇';
        waitingMusicPlaying = true;
    }
}

function toggleAudio() {
    const audio = document.getElementById('perfectMusic');
    if (perfectMusicPlaying) {
        audio.pause();
        document.getElementById('audioControl').textContent = '🔊';
        perfectMusicPlaying = false;
    } else {
        audio.play().catch(e => console.log('لا يمكن تشغيل الموسيقى'));
        document.getElementById('audioControl').textContent = '🔇';
        perfectMusicPlaying = true;
    }
}

function toggleSpecialSong() {
    const audio = document.getElementById('specialSong');
    const btnText = document.getElementById('chickBtnText');

    if (specialSongPlaying) {
        audio.pause();
        btnText.textContent = 'تشغيل الأغنية';
        specialSongPlaying = false;
    } else {
        audio.play().catch(e => console.log('لا يمكن تشغيل الأغنية الخاصة'));
        btnText.textContent = 'إيقاف الأغنية';
        specialSongPlaying = true;
    }
}

// التحكم في مستوى الصوت
function changeVolume() {
    const audio = document.getElementById('specialSong');
    const slider = document.getElementById('volumeSlider');
    audio.volume = slider.value;
}

function increaseVolume() {
    const slider = document.getElementById('volumeSlider');
    if (parseFloat(slider.value) < 1) {
        slider.value = (parseFloat(slider.value) + 0.1).toFixed(1);
        changeVolume();
    }
}

function decreaseVolume() {
    const slider = document.getElementById('volumeSlider');
    if (parseFloat(slider.value) > 0) {
        slider.value = (parseFloat(slider.value) - 0.1).toFixed(1);
        changeVolume();
    }
}

// إطلاق الصواريخ
function launchRocket() {
    const rocketsContainer = document.getElementById('rocketsContainer');
    const rocket = document.createElement('div');
    rocket.className = 'rocket';
    rocket.textContent = '🚀';
    rocket.style.left = Math.random() * 100 + '%';
    rocket.style.bottom = '0';
    rocketsContainer.appendChild(rocket);

    setTimeout(() => {
        createExplosion(rocket);
        rocket.remove();
    }, 3000);
}

// إنشاء انفجار
function createExplosion(rocket) {
    const rect = rocket.getBoundingClientRect();
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.textContent = '💥';
    explosion.style.left = rect.left + 'px';
    explosion.style.top = rect.top + 'px';
    document.getElementById('rocketsContainer').appendChild(explosion);

    setTimeout(() => {
        explosion.remove();
    }, 1000);
}

// إظهار الصواريخ عند انتهاء العد التنازلي
function showRockets() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            launchRocket();
        }, i * 500);
    }
}

// العد التنازلي حتى 11 أغسطس بتوقيت الجزائر
function updateCountdown() {
    // تحديد تاريخ 11 أغسطس 2025 بتوقيت الجزائر (UTC+1)
    const targetDate = new Date('2023-08-11T00:00:00+01:00');
    const now = new Date();
    

    // حساب الفرق بين التواريخ
    const diff = targetDate.getTime() - now.getTime() ;
    if (diff <= 0) {
        document.getElementById('countdown').style.display = 'none';
        document.getElementById('giftButton').style.display = 'inline-block';
        document.querySelector('.title').textContent = '🎉 عيد ميلاد سعيد دعاء! 🎉';
        showRockets();
        return;
    }

    // حساب الأيام، الساعات، الدقائق والثواني
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // تحديث العناصر في الصفحة
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

const countdownTimer = setInterval(updateCountdown, 1000);

// فتح صفحة الهدايا
function openGifts() {
    const waitingAudio = document.getElementById('waitingMusic');
    waitingAudio.pause();
    waitingMusicPlaying = false;

    const perfectAudio = document.getElementById('perfectMusic');
    perfectAudio.play().catch(e => console.log('لا يمكن تشغيل الموسيقى'));
    perfectMusicPlaying = true;

    // تشغيل الأغنية الخاصة تلقائياً عند فتح الصفحة الثانية
    const specialAudio = document.getElementById('specialSong');
    specialAudio.play().catch(e => console.log('لا يمكن تشغيل الأغنية الخاصة'));
    specialSongPlaying = true;

    document.getElementById('firstPage').style.display = 'none';
    document.getElementById('firstPageAudio').style.display = 'none';
    document.getElementById('secondPage').classList.add('active');

    // إعادة تشغيل الأغنية الخاصة عند انتهائها
    specialAudio.onended = function () {
        specialAudio.currentTime = 0;
        specialAudio.play();
    };
}

// العودة للصفحة الأولى
function goBack() {
    const perfectAudio = document.getElementById('perfectMusic');
    perfectAudio.pause();
    perfectMusicPlaying = false;

    const specialAudio = document.getElementById('specialSong');
    specialAudio.pause();
    specialSongPlaying = false;
    document.getElementById('chickBtnText').textContent = 'تشغيل الأغنية';

    document.getElementById('secondPage').classList.remove('active');
    document.getElementById('firstPage').style.display = 'block';
    document.getElementById('firstPageAudio').style.display = 'block';
}

// فتح نافذة التكبير للصورة
function openModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = "block";
    modalImg.src = src;
}

// إغلاق نافذة التكبير
function closeModal() {
    document.getElementById('imageModal').style.display = "none";
}

// فتح نافذة الرسوم المتحركة
function openAnimationPage() {
    const modal = document.getElementById('animationModal');
    modal.style.display = "block";
    // modal.style.width = window.innerWidth * 0.8;
    // modal.style.height = window.innerHeight * 0.8;


    // بدء الرسوم المتحركة
    // startAnimation();
}

// إغلاق نافذة الرسوم المتحركة
function closeAnimationModal() {
    document.getElementById('animationModal').style.display = "none";
}

// بدء الرسوم المتحركة
function startAnimation() {
    // اخفاء زر بدء الرسوم المتحركة
    document.getElementById("startAnimationModal").style.display = "none";
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');

    // تعيين حجم Canvas ليتناسب مع النافذة
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    const w = canvas.width;
    const h = canvas.height;
    const hw = w / 2;
    const hh = h / 2;

    const opts = {
        strings: ["HAPPY", "BIRTHDAY!", "to You"],
        charSize: 30,
        charSpacing: 35,
        lineHeight: 40,
        cx: w / 2,
        cy: h / 2,
        fireworkPrevPoints: 10,
        fireworkBaseLineWidth: 5,
        fireworkAddedLineWidth: 8,
        fireworkSpawnTime: 200,
        fireworkBaseReachTime: 30,
        fireworkAddedReachTime: 30,
        fireworkCircleBaseSize: 20,
        fireworkCircleAddedSize: 10,
        fireworkCircleBaseTime: 30,
        fireworkCircleAddedTime: 30,
        fireworkCircleFadeBaseTime: 10,
        fireworkCircleFadeAddedTime: 5,
        fireworkBaseShards: 5,
        fireworkAddedShards: 5,
        fireworkShardPrevPoints: 3,
        fireworkShardBaseVel: 4,
        fireworkShardAddedVel: 2,
        fireworkShardBaseSize: 3,
        fireworkShardAddedSize: 3,
        gravity: 0.1,
        upFlow: -0.1,
        letterContemplatingWaitTime: 360,
        balloonSpawnTime: 20,
        balloonBaseInflateTime: 10,
        balloonAddedInflateTime: 10,
        balloonBaseSize: 20,
        balloonAddedSize: 20,
        balloonBaseVel: 0.4,
        balloonAddedVel: 0.4,
        balloonBaseRadian: -(Math.PI / 2 - 0.5),
        balloonAddedRadian: -1,
    };

    const calc = {
        totalWidth: opts.charSpacing * Math.max(opts.strings[0].length, opts.strings[1].length)
    };

    const Tau = Math.PI * 2;
    const TauQuarter = Tau / 4;
    const letters = [];

    ctx.font = opts.charSize + "px Verdana";

    function Letter(char, x, y) {
        this.char = char;
        this.x = x;
        this.y = y;
        this.dx = -ctx.measureText(char).width / 2;
        this.dy = +opts.charSize / 2;
        this.fireworkDy = this.y - hh;

        const hue = (x / calc.totalWidth) * 360;
        this.color = "hsl(hue,80%,50%)".replace("hue", hue);
        this.lightAlphaColor = "hsla(hue,80%,light%,alp)".replace("hue", hue);
        this.lightColor = "hsl(hue,80%,light%)".replace("hue", hue);
        this.alphaColor = "hsla(hue,80%,50%,alp)".replace("hue", hue);

        this.reset();
    }

    Letter.prototype.reset = function () {
        this.phase = "firework";
        this.tick = 0;
        this.spawned = false;
        this.spawningTime = (opts.fireworkSpawnTime * Math.random()) | 0;
        this.reachTime = (opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random()) | 0;
        this.lineWidth = opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
        this.prevPoints = [[0, hh, 0]];
    };

    Letter.prototype.step = function () {
        if (this.phase === "firework") {
            if (!this.spawned) {
                ++this.tick;
                if (this.tick >= this.spawningTime) {
                    this.tick = 0;
                    this.spawned = true;
                }
            } else {
                ++this.tick;

                const linearProportion = this.tick / this.reachTime;
                const armonicProportion = Math.sin(linearProportion * TauQuarter);
                const x = linearProportion * this.x;
                const y = hh + armonicProportion * this.fireworkDy;

                if (this.prevPoints.length > opts.fireworkPrevPoints) this.prevPoints.shift();

                this.prevPoints.push([x, y, linearProportion * this.lineWidth]);

                const lineWidthProportion = 1 / (this.prevPoints.length - 1);

                for (let i = 1; i < this.prevPoints.length; ++i) {
                    const point = this.prevPoints[i];
                    const point2 = this.prevPoints[i - 1];

                    ctx.strokeStyle = this.alphaColor.replace("alp", i / this.prevPoints.length);
                    ctx.lineWidth = point[2] * lineWidthProportion * i;
                    ctx.beginPath();
                    ctx.moveTo(point[0], point[1]);
                    ctx.lineTo(point2[0], point2[1]);
                    ctx.stroke();
                }

                if (this.tick >= this.reachTime) {
                    this.phase = "contemplate";

                    this.circleFinalSize = opts.fireworkCircleBaseSize + opts.fireworkCircleAddedSize * Math.random();
                    this.circleCompleteTime = (opts.fireworkCircleBaseTime + opts.fireworkCircleAddedTime * Math.random()) | 0;
                    this.circleCreating = true;
                    this.circleFading = false;

                    this.circleFadeTime = (opts.fireworkCircleFadeBaseTime + opts.fireworkCircleFadeAddedTime * Math.random()) | 0;
                    this.tick = 0;
                    this.tick2 = 0;

                    this.shards = [];

                    const shardCount = (opts.fireworkBaseShards + opts.fireworkAddedShards * Math.random()) | 0;
                    const angle = Tau / shardCount;
                    const cos = Math.cos(angle);
                    const sin = Math.sin(angle);
                    let x = 1;
                    let y = 0;

                    for (let i = 0; i < shardCount; ++i) {
                        const x1 = x;
                        x = x * cos - y * sin;
                        y = y * cos + x1 * sin;

                        this.shards.push(new Shard(this.x, this.y, x, y, this.alphaColor));
                    }
                }
            }
        } else if (this.phase === "contemplate") {
            ++this.tick;

            if (this.circleCreating) {
                ++this.tick2;
                const proportion = this.tick2 / this.circleCompleteTime;
                const armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

                ctx.beginPath();
                ctx.fillStyle = this.lightAlphaColor.replace("light", 50 + 50 * proportion).replace("alp", proportion);
                ctx.beginPath();
                ctx.arc(this.x, this.y, armonic * this.circleFinalSize, 0, Tau);
                ctx.fill();

                if (this.tick2 > this.circleCompleteTime) {
                    this.tick2 = 0;
                    this.circleCreating = false;
                    this.circleFading = true;
                }
            } else if (this.circleFading) {
                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

                ++this.tick2;
                const proportion = this.tick2 / this.circleFadeTime;
                const armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

                ctx.beginPath();
                ctx.fillStyle = this.lightAlphaColor.replace("light", 100).replace("alp", 1 - armonic);
                ctx.arc(this.x, this.y, this.circleFinalSize, 0, Tau);
                ctx.fill();

                if (this.tick2 >= this.circleFadeTime) this.circleFading = false;
            } else {
                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
            }

            for (let i = 0; i < this.shards.length; ++i) {
                this.shards[i].step();

                if (!this.shards[i].alive) {
                    this.shards.splice(i, 1);
                    --i;
                }
            }

            if (this.tick > opts.letterContemplatingWaitTime) {
                this.phase = "balloon";

                this.tick = 0;
                this.spawning = true;
                this.spawnTime = (opts.balloonSpawnTime * Math.random()) | 0;
                this.inflating = false;
                this.inflateTime = (opts.balloonBaseInflateTime + opts.balloonAddedInflateTime * Math.random()) | 0;
                this.size = (opts.balloonBaseSize + opts.balloonAddedSize * Math.random()) | 0;

                const rad = opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random();
                const vel = opts.balloonBaseVel + opts.balloonAddedVel * Math.random();

                this.vx = Math.cos(rad) * vel;
                this.vy = Math.sin(rad) * vel;
            }
        } else if (this.phase === "balloon") {
            ctx.strokeStyle = this.lightColor.replace("light", 80);

            if (this.spawning) {
                ++this.tick;
                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

                if (this.tick >= this.spawnTime) {
                    this.tick = 0;
                    this.spawning = false;
                    this.inflating = true;
                }
            } else if (this.inflating) {
                ++this.tick;

                const proportion = this.tick / this.inflateTime;
                const x = this.cx = this.x;
                const y = this.cy = this.y - this.size * proportion;

                ctx.fillStyle = this.alphaColor.replace("alp", proportion);
                ctx.beginPath();
                generateBalloonPath(x, y, this.size * proportion);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, this.y);
                ctx.stroke();

                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

                if (this.tick >= this.inflateTime) {
                    this.tick = 0;
                    this.inflating = false;
                }
            } else {
                this.cx += this.vx;
                this.cy += this.vy += opts.upFlow;

                ctx.fillStyle = this.color;
                ctx.beginPath();
                generateBalloonPath(this.cx, this.cy, this.size);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(this.cx, this.cy);
                ctx.lineTo(this.cx, this.cy + this.size);
                ctx.stroke();

                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.cx + this.dx, this.cy + this.dy + this.size);

                if (this.cy + this.size < -hh || this.cx < -hw || this.cy > hw) {
                    this.phase = "done";
                }
            }
        }
    };

    function Shard(x, y, vx, vy, color) {
        const vel = opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random();

        this.vx = vx * vel;
        this.vy = vy * vel;

        this.x = x;
        this.y = y;

        this.prevPoints = [[x, y]];
        this.color = color;

        this.alive = true;

        this.size = opts.fireworkShardBaseSize + opts.fireworkShardAddedSize * Math.random();
    }

    Shard.prototype.step = function () {
        this.x += this.vx;
        this.y += this.vy += opts.gravity;

        if (this.prevPoints.length > opts.fireworkShardPrevPoints) this.prevPoints.shift();

        this.prevPoints.push([this.x, this.y]);

        const lineWidthProportion = this.size / this.prevPoints.length;

        for (let k = 0; k < this.prevPoints.length - 1; ++k) {
            const point = this.prevPoints[k];
            const point2 = this.prevPoints[k + 1];

            ctx.strokeStyle = this.color.replace("alp", k / this.prevPoints.length);
            ctx.lineWidth = k * lineWidthProportion;
            ctx.beginPath();
            ctx.moveTo(point[0], point[1]);
            ctx.lineTo(point2[0], point2[1]);
            ctx.stroke();
        }

        if (this.prevPoints[0][1] > hh) this.alive = false;
    };

    function generateBalloonPath(x, y, size) {
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(
            x - size / 2, y - size / 2,
            x - size / 4, y - size,
            x, y - size
        );
        ctx.bezierCurveTo(
            x + size / 4, y - size,
            x + size / 2, y - size / 2,
            x, y
        );
    }

    // إنشاء الحروف
    for (let i = 0; i < opts.strings.length; ++i) {
        for (let j = 0; j < opts.strings[i].length; ++j) {
            letters.push(
                new Letter(
                    opts.strings[i][j],
                    j * opts.charSpacing + opts.charSpacing / 2 - (opts.strings[i].length * opts.charSize) / 2,
                    i * opts.lineHeight + opts.lineHeight / 2 - (opts.strings.length * opts.lineHeight) / 2
                )
            );
        }
    }

    // دورة الرسوم المتحركة
    function anim() {
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, w, h);

        ctx.translate(hw, hh);

        let done = true;
        for (let l = 0; l < letters.length; ++l) {
            letters[l].step();
            if (letters[l].phase !== "done") done = false;
        }

        ctx.translate(-hw, -hh);

        if (done) {
            for (let l = 0; l < letters.length; ++l) {
                letters[l].reset();
            }
        }

        requestAnimationFrame(anim);
    }

    // بدء الرسوم المتحركة
    anim();
}


function showPoem() {
    const poemContainer = document.getElementById('poemContainer');
    poemContainer.style.display = 'block';
    document.getElementById('showPoemButton').style.display = 'none';
    document.getElementById('closePoemButton').style.display = 'block';
}

function closePoem() {
    const poemContainer = document.getElementById('poemContainer');
    poemContainer.style.display = 'none';
    document.getElementById('showPoemButton').style.display = 'block';
    document.getElementById('closePoemButton').style.display = 'none';
}




// عرض الكعكة
function showCake() {
    const cakeContainer = document.getElementById('cakeContainer');
    cakeContainer.style.display = 'flex';

    // إنشاء الشمعة مع انيميشن السقوط
    const candleContainer = document.createElement('div');
    candleContainer.className = 'candle-container';

    const candle = document.createElement('div');
    candle.className = 'candle';
    candleContainer.appendChild(candle);

    cakeContainer.appendChild(candleContainer);

    // بدء انيميشن الكعكة
    const animations = document.querySelectorAll('#cake animate');
    animations.forEach(anim => {
        anim.beginElement();
    });
}

// إخفاء الكعكة
function hideCake() {
    const cakeContainer = document.getElementById('cakeContainer');
    cakeContainer.style.display = 'none';

    // إزالة الشمعة عند الخروج
    const candle = document.querySelector('.candle-container');
    if (candle) {
        candle.remove();
    }
}

// إغلاق النافذة عند النقر خارج الصورة
window.onclick = function (event) {
    const modal = document.getElementById('imageModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }

    const animationModal = document.getElementById('animationModal');
    if (event.target == animationModal) {
        animationModal.style.display = "none";
    }
}

// تشغيل كل شيء عند تحميل الصفحة
window.onload = function () {
    createStars();
    setInterval(createFallingEmoji, 300);
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // تعيين مستوى الصوت الافتراضي للأغنية الخاصة
    document.getElementById('specialSong').volume = 1;

    // بدء عرض قصيدة الحب بعد تحميل الصفحة
    const poemLines = document.querySelectorAll('.poem-line');
    poemLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.animation = 'fadeIn 1s forwards';
        }, index * 1000);
    });
};
