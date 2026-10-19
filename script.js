// ==========================================================================
// DANH SÁCH 28 BỨC ẢNH THẬT TỪ THƯ MỤC "Ảnh ni"
// ==========================================================================
const PHOTO_FILES = [
  "FB_IMG_1774073021206.jpg",
  "IMG_20260802_131043_194.jpg",
  "IMG_20261010_204635.jpg",
  "Messenger_creation_0F1897FD-EEB6-4442-ACFA-FEF2D2C4B27C.jpeg",
  "Messenger_creation_13D2FC57-4816-4FD8-86D8-3599B09202B4.jpeg",
  "Messenger_creation_3738CF6E-05E8-40FD-986A-023B0D6A4D3F.jpeg",
  "Messenger_creation_44A6B9D3-AF61-4E7F-842E-E58D6F330B8D.png",
  "Messenger_creation_4BA94B21-BBF3-4EF7-BEF7-C78B10AEE237.jpeg",
  "Messenger_creation_601F0C56-DE52-4D8B-9E6F-00F97220CBCA.jpeg",
  "Messenger_creation_663B9DA0-F64C-45F2-A3D2-CC1084CF7234.png",
  "Messenger_creation_7D0D2374-EB60-4B09-95DC-C10371CC7B44.jpeg",
  "Messenger_creation_94F1532D-2699-495E-8BA7-B0D017506D31.jpeg",
  "Messenger_creation_B4EBC7D0-C45E-4DB6-9A80-4A1C6708C72A.jpeg",
  "Messenger_creation_B783F05A-623D-4129-9B44-1DC6A0DE4EA3.jpeg",
  "Messenger_creation_C21EB852-6C71-4157-8539-0AFEBDCDF25C.jpeg",
  "Messenger_creation_CA95E490-8FBF-4CCD-AD6B-6CD9B1103FF0.jpeg",
  "Messenger_creation_CCEDF153-6BD2-43B0-8244-6B2DC2AD6FC4.jpeg",
  "Messenger_creation_CF59A6C0-BD5F-40F8-BA4D-BD3B78D6A9CE.jpeg",
  "Messenger_creation_DB9C561D-AE97-4E36-96FF-A690ABC3A501.jpeg",
  "Messenger_creation_E66A108C-B966-4460-A7FC-F59F719EB02C.png",
  "Messenger_creation_FFC3C776-8142-4C9E-930B-C54CAD660DDA.jpeg",
  "Screenshot_2026-03-26-13-10-23-63_f69139cffc4d135a71392e13634f144a.jpg",
  "Screenshot_2026-07-11-17-19-34-57_f69139cffc4d135a71392e13634f144a.jpg",
  "Screenshot_2026-08-13-13-59-42-26_99c04817c0de5652397fc8b56c3b3817.jpg",
  "Screenshot_2026-08-22-12-41-46-80_8a5f4726f7453c77b8d93615cedb556d.jpg",
  "Screenshot_2026-08-31-21-44-23-83_be80aec1db9a2b53c9d399db0c602181.jpg",
  "Screenshot_2026-09-03-21-08-49-01_a99cd44f521a5bf63db6ba4a79736c95.jpg",
  "Screenshot_2026-09-03-21-08-55-37_a99cd44f521a5bf63db6ba4a79736c95.jpg"
];

const photosData = PHOTO_FILES.map((fileName, i) => ({
  id: i + 1,
  src: encodeURI(`Ảnh ni/${fileName}`)
}));

// ==========================================================================
// 1. HIỆU ỨNG MƯA TRÁI TIM NỀN (VẼ BẰNG CANVAS, KHÔNG DÙNG ICON)
// ==========================================================================
const heartsCanvas = document.getElementById("hearts-canvas");
const hCtx = heartsCanvas.getContext("2d");
let floatingHearts = [];
let fireworkHearts = [];

function resizeHeartsCanvas() {
  heartsCanvas.width = window.innerWidth;
  heartsCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeHeartsCanvas);
resizeHeartsCanvas();

function createFloatingHeart() {
  return {
    x: Math.random() * heartsCanvas.width,
    y: heartsCanvas.height + 20 + Math.random() * 100,
    size: 10 + Math.random() * 18,
    speedY: 0.6 + Math.random() * 1.3,
    swayAmp: 0.4 + Math.random() * 1.1,
    swaySpeed: 0.01 + Math.random() * 0.025,
    angle: Math.random() * Math.PI * 2,
    opacity: 0.25 + Math.random() * 0.5,
    color: ["#ff5c8a", "#ff8fab", "#fb6f92", "#ffb3c6", "#e03168"][
      Math.floor(Math.random() * 5)
    ]
  };
}

for (let i = 0; i < 36; i++) {
  const h = createFloatingHeart();
  h.y = Math.random() * heartsCanvas.height;
  floatingHearts.push(h);
}

function drawHeartShape(ctx, x, y, size, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
  ctx.bezierCurveTo(
    x - size / 2,
    y + (size + topCurveHeight) / 2,
    x,
    y + (size + topCurveHeight) / 1.4,
    x,
    y + size
  );
  ctx.bezierCurveTo(
    x,
    y + (size + topCurveHeight) / 1.4,
    x + size / 2,
    y + (size + topCurveHeight) / 2,
    x + size / 2,
    y + topCurveHeight
  );
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function spawnHeartFireworks(centerX, centerY, count = 38) {
  const cx = centerX ?? window.innerWidth / 2;
  const cy = centerY ?? window.innerHeight / 2;
  const colors = ["#ff2a6d", "#ff5c8a", "#ff8fab", "#ffd166", "#e03168"];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
    const speed = 2.5 + Math.random() * 6.5;
    fireworkHearts.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5,
      size: 10 + Math.random() * 14,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

function animateHeartsCanvas() {
  hCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);

  floatingHearts.forEach((h) => {
    h.y -= h.speedY;
    h.angle += h.swaySpeed;
    h.x += Math.sin(h.angle) * h.swayAmp;
    if (h.y < -30) {
      h.y = heartsCanvas.height + 25;
      h.x = Math.random() * heartsCanvas.width;
    }
    drawHeartShape(hCtx, h.x, h.y, h.size, h.color, h.opacity);
  });

  for (let i = fireworkHearts.length - 1; i >= 0; i--) {
    const p = fireworkHearts[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.12;
    p.alpha -= 0.016;
    if (p.alpha <= 0) {
      fireworkHearts.splice(i, 1);
    } else {
      drawHeartShape(hCtx, p.x, p.y, p.size, p.color, p.alpha);
    }
  }

  requestAnimationFrame(animateHeartsCanvas);
}
animateHeartsCanvas();

// ==========================================================================
// 2. HỘP NHẠC TÌNH YÊU
// ==========================================================================
const btnMusic = document.getElementById("btn-music");
const bgAudio = document.getElementById("bg-audio");
let isMusicPlaying = false;
let audioCtx = null;
let musicBoxTimer = null;

const MELODY_NOTES = [
  523.25, 659.25, 783.99, 1046.5, 783.99, 659.25,
  587.33, 698.46, 880.0, 1046.5, 880.0, 698.46,
  523.25, 659.25, 783.99, 1046.5, 987.77, 783.99,
  659.25, 587.33, 523.25, 659.25, 783.99, 523.25
];
let noteIdx = 0;

function playMusicBoxNote() {
  if (!isMusicPlaying) return;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(MELODY_NOTES[noteIdx % MELODY_NOTES.length], audioCtx.currentTime);
  gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.65);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.68);
  noteIdx++;
}

function startRomanticMusic() {
  if (isMusicPlaying) return;
  isMusicPlaying = true;
  btnMusic.classList.add("playing");
  bgAudio.play().catch(() => {
    if (musicBoxTimer) clearInterval(musicBoxTimer);
    musicBoxTimer = setInterval(playMusicBoxNote, 420);
  });
}

function toggleRomanticMusic() {
  if (isMusicPlaying) {
    isMusicPlaying = false;
    btnMusic.classList.remove("playing");
    bgAudio.pause();
    if (musicBoxTimer) clearInterval(musicBoxTimer);
  } else {
    startRomanticMusic();
  }
}
btnMusic.addEventListener("click", toggleRomanticMusic);

// ==========================================================================
// 3. ĐIỀU HƯỚNG 4 MÀN
// ==========================================================================
const stepDots = document.querySelectorAll(".step-dot");
const screens = document.querySelectorAll(".screen");

function switchScreen(screenNum) {
  screens.forEach((sc, idx) => {
    sc.classList.toggle("active", idx + 1 === Number(screenNum));
  });
  stepDots.forEach((dot) => {
    dot.classList.toggle("active", dot.dataset.target === String(screenNum));
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  spawnHeartFireworks(window.innerWidth / 2, 140, 22);

  if (Number(screenNum) === 2) {
    startTypewriterLetter();
  }
}

stepDots.forEach((dot) => {
  dot.addEventListener("click", () => switchScreen(dot.dataset.target));
});

document.querySelectorAll("[data-goto]").forEach((btn) => {
  btn.addEventListener("click", () => switchScreen(btn.dataset.goto));
});

// ==========================================================================
// 4. MÀN 1: MỞ PHONG BÌ THƯ & CÀO THẺ BÍ MẬT
// ==========================================================================
const envelopeBox = document.getElementById("envelope-box");
const scratchWrap = document.getElementById("scratch-wrap");
const envelopeHint = document.getElementById("envelope-hint");
const scratchCanvas = document.getElementById("scratch-canvas");
const sCtx = scratchCanvas.getContext("2d");

function initScratchCard() {
  sCtx.globalCompositeOperation = "source-over";
  const grad = sCtx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
  grad.addColorStop(0, "#ff7aa2");
  grad.addColorStop(0.5, "#ff9ebb");
  grad.addColorStop(1, "#ff5c8a");
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);

  sCtx.fillStyle = "#ffffff";
  sCtx.font = "bold 18px Quicksand, sans-serif";
  sCtx.textAlign = "center";
  sCtx.fillText("CÀO LỚP NHŨ HỒNG NÀY ĐI NI ƠI", scratchCanvas.width / 2, 95);
  sCtx.font = "14px Quicksand, sans-serif";
  sCtx.fillText("(Dùng chuột hoặc ngón tay chà nhẹ nhé)", scratchCanvas.width / 2, 122);
}
initScratchCard();

let isScratching = false;
function scratchAt(x, y) {
  sCtx.globalCompositeOperation = "destination-out";
  sCtx.beginPath();
  sCtx.arc(x, y, 26, 0, Math.PI * 2);
  sCtx.fill();
}

scratchCanvas.addEventListener("mousedown", () => (isScratching = true));
window.addEventListener("mouseup", () => (isScratching = false));
scratchCanvas.addEventListener("mousemove", (e) => {
  if (!isScratching) return;
  const rect = scratchCanvas.getBoundingClientRect();
  scratchAt(e.clientX - rect.left, e.clientY - rect.top);
});
scratchCanvas.addEventListener("touchstart", () => (isScratching = true));
scratchCanvas.addEventListener("touchend", () => (isScratching = false));
scratchCanvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = scratchCanvas.getBoundingClientRect();
  scratchAt(touch.clientX - rect.left, touch.clientY - rect.top);
});

envelopeBox.addEventListener("click", (e) => {
  envelopeBox.classList.add("open");
  scratchWrap.classList.add("visible");
  envelopeHint.textContent = "Phong bì đã mở! Cào thẻ bên dưới để nhận đặc quyền 20/10 nhé!";
  startRomanticMusic();
  spawnHeartFireworks(e.clientX, e.clientY, 42);
});

// ==========================================================================
// 5. MÀN 2: ĐỒNG HỒ ĐẾM NGÀY YÊU (FIX CỨNG 01/09/2024) & THƯ ĐÁNH MÁY
// ==========================================================================
const tDays = document.getElementById("t-days");
const FIXED_START_TIME = new Date("2025-09-01T00:00:00").getTime();

function updateLoveTimer() {
  const now = Date.now();
  const diff = Math.max(0, now - FIXED_START_TIME);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  tDays.textContent = days;
}
setInterval(updateLoveTimer, 1000);
updateLoveTimer();

const LOVE_LETTER_CONTENT = `Nhân ngày 20/10 anh chúc em Thảo Nhi mít ướt khóc nhè nhưng đôi lúc lạnh lùng vô cảm của anh.

Nhân ngày Phụ nữ Việt Nam 20/10, anh chúc người yêu/người vợ tương lai của anh luôn tươi cười rạng rỡ, luôn xinh đẹp, tự tin. Luôn ăn uống đầy đủ, luôn ngủ đủ giấc và luôn nhìu tìn trong túi để mua goods Furina.

Và đặc biệt, anh cũng rất hối lỗi khi đã làm cô bé mít ướt khóc rất nhiều lần, cái đó anh thành thật thấy có lỗi và hi vọng em có thể bỏ qua để tận hưởng ngày 20/10 đầy ý nghĩa này. Cuối cùng chúc em luôn thành công khi theo đuổi ước mơ, hạnh phúc, mục tiêu của bản thân, mục tiêu gần ắt hẳn là luôn điểm cao trong các bài kiểm tra sắp tới nha Ni.

iu iu iu iu em nhìu nhìu nhìu lắm á.`;

const typewriterEl = document.getElementById("typewriter-text");
let typewriterTimer = null;

function startTypewriterLetter() {
  if (typewriterTimer) clearInterval(typewriterTimer);
  typewriterEl.innerHTML = "";
  let idx = 0;
  typewriterTimer = setInterval(() => {
    if (idx < LOVE_LETTER_CONTENT.length) {
      const ch = LOVE_LETTER_CONTENT[idx];
      typewriterEl.innerHTML += ch === "\n" ? "<br/>" : ch;
      idx++;
    } else {
      clearInterval(typewriterTimer);
    }
  }, 24);
}

document.getElementById("btn-retype").addEventListener("click", startTypewriterLetter);

// ==========================================================================
// 6. MÀN 3: BẢO TÀNG ẢNH (TRÁI TIM, POLAROID, LẬT THẺ BÀI)
// ==========================================================================
const galleryContainer = document.getElementById("gallery-container");
const viewModeBtns = document.querySelectorAll("[data-viewmode]");
let currentViewMode = "heart";
let currentDeckIndex = 0;

const HEART_MATRIX = [
  [0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0]
];

function renderGallery() {
  galleryContainer.innerHTML = "";

  if (currentViewMode === "heart") {
    const grid = document.createElement("div");
    grid.className = "heart-mosaic-grid";
    let photoIndex = 0;

    HEART_MATRIX.forEach((row) => {
      row.forEach((cell) => {
        if (cell === 0) {
          const empty = document.createElement("div");
          empty.className = "heart-cell-empty";
          grid.appendChild(empty);
        } else {
          const item = photosData[photoIndex];
          const currentIdx = photoIndex;
          const tile = document.createElement("div");
          tile.className = "photo-tile";
          const rot = (Math.random() * 8 - 4).toFixed(1);
          tile.style.transform = `rotate(${rot}deg)`;

          tile.innerHTML = `<img src="${item.src}" alt="Kỷ niệm" />`;
          tile.addEventListener("click", () => openLightbox(currentIdx));
          grid.appendChild(tile);
          photoIndex++;
        }
      });
    });

    galleryContainer.appendChild(grid);
  } else if (currentViewMode === "polaroid") {
    const wall = document.createElement("div");
    wall.className = "polaroid-wall";
    photosData.forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = "polaroid-card";
      const rot = ((idx % 2 === 0 ? 1 : -1) * (1.5 + (idx % 4))).toFixed(1);
      card.style.transform = `rotate(${rot}deg)`;
      card.innerHTML = `<img src="${item.src}" alt="Kỷ niệm" />`;
      card.addEventListener("click", () => openLightbox(idx));
      wall.appendChild(card);
    });
    galleryContainer.appendChild(wall);
  } else if (currentViewMode === "deck") {
    const item = photosData[currentDeckIndex];
    const stage = document.createElement("div");
    stage.className = "deck-stage";
    stage.innerHTML = `
      <div class="deck-card-spotlight" id="deck-spotlight">
        <img src="${item.src}" alt="Kỷ niệm" style="margin-bottom: 0;" />
      </div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
        <button class="btn-outline-pink" id="deck-prev">Ảnh trước</button>
        <button class="btn-pink" id="deck-next">Lật ảnh tiếp theo</button>
      </div>
    `;
    galleryContainer.appendChild(stage);

    document.getElementById("deck-prev").addEventListener("click", () => {
      currentDeckIndex = (currentDeckIndex - 1 + photosData.length) % photosData.length;
      renderGallery();
    });
    document.getElementById("deck-next").addEventListener("click", (e) => {
      currentDeckIndex = (currentDeckIndex + 1) % photosData.length;
      spawnHeartFireworks(e.clientX, e.clientY, 16);
      renderGallery();
    });
    document.getElementById("deck-spotlight").addEventListener("click", () => openLightbox(currentDeckIndex));
  }
}

viewModeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    viewModeBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentViewMode = btn.dataset.viewmode;
    renderGallery();
  });
});

// Hiệu ứng Gom Yêu Thương (Bay từ ngẫu nhiên về hình trái tim)
document.getElementById("btn-shuffle-heart").addEventListener("click", (e) => {
  currentViewMode = "heart";
  viewModeBtns.forEach((b) => b.classList.toggle("active", b.dataset.viewmode === "heart"));
  renderGallery();
  spawnHeartFireworks(e.clientX, e.clientY, 45);

  const tiles = document.querySelectorAll(".photo-tile");
  tiles.forEach((tile) => {
    const rx = (Math.random() - 0.5) * 340;
    const ry = (Math.random() - 0.5) * 260;
    const rdeg = (Math.random() - 0.5) * 90;
    tile.style.transition = "none";
    tile.style.transform = `translate(${rx}px, ${ry}px) rotate(${rdeg}deg) scale(0.5)`;
    tile.style.opacity = "0.3";
    requestAnimationFrame(() => {
      setTimeout(() => {
        tile.style.transition = "all 0.85s cubic-bezier(0.22, 1, 0.36, 1)";
        const finalRot = (Math.random() * 6 - 3).toFixed(1);
        tile.style.transform = `translate(0, 0) rotate(${finalRot}deg) scale(1)`;
        tile.style.opacity = "1";
      }, 40);
    });
  });
});

// Lightbox xem ảnh phóng to
const lightboxModal = document.getElementById("lightbox-modal");
const lightboxImg = document.getElementById("lightbox-img");
let activeLightboxIndex = 0;

function openLightbox(index) {
  activeLightboxIndex = index;
  const item = photosData[activeLightboxIndex];
  lightboxImg.src = item.src;
  lightboxModal.classList.add("open");
}

document.getElementById("lightbox-close").addEventListener("click", () => {
  lightboxModal.classList.remove("open");
});
lightboxModal.addEventListener("click", (e) => {
  if (e.target === lightboxModal) lightboxModal.classList.remove("open");
});
document.getElementById("lightbox-prev").addEventListener("click", () => {
  openLightbox((activeLightboxIndex - 1 + photosData.length) % photosData.length);
});
document.getElementById("lightbox-next").addEventListener("click", () => {
  openLightbox((activeLightboxIndex + 1) % photosData.length);
});

renderGallery();

// ==========================================================================
// 7. MÀN 4: NÚT "KHÔNG" CHẠY TRỐN HÀI HƯỚC & CHỐT QUÀ 20/10
// ==========================================================================
const btnYesLove = document.getElementById("btn-yes-love");
const btnNoRunaway = document.getElementById("btn-no-runaway");
const runawayArena = document.getElementById("runaway-arena");
const runawaySubtext = document.getElementById("runaway-subtext");
const celebrationBanner = document.getElementById("celebration-banner");
const celebrationSummary = document.getElementById("celebration-summary");

const FUNNY_NO_TEXTS = [
  "Ơ kìa, bấm nhầm nút rồi Ni ơi!",
  "Nút này bị lỗi kỹ thuật rồi, bấm nút màu hồng bên cạnh đi!",
  "Định bấm 'Không' thật á? Tim anh vụn vỡ bây giờ!",
  "Không bắt được đâu lêu lêu!",
  "Hệ thống chỉ chấp nhận đáp án: YÊU ANH CỰC KỲ NHIỀU!",
  "Nút Yêu anh đang to lên kìa, bấm vào đó đi công chúa!"
];
let noCount = 0;
let yesScale = 1;

function moveNoButton() {
  noCount++;
  yesScale = Math.min(1.65, yesScale + 0.1);
  btnYesLove.style.transform = `scale(${yesScale})`;
  runawaySubtext.textContent = FUNNY_NO_TEXTS[noCount % FUNNY_NO_TEXTS.length];

  const arenaRect = runawayArena.getBoundingClientRect();
  const maxOffsetX = Math.max(40, arenaRect.width / 2 - 90);
  const maxOffsetY = Math.max(30, arenaRect.height / 2 - 50);
  const randX = (Math.random() * 2 - 1) * maxOffsetX;
  const randY = (Math.random() * 2 - 1) * maxOffsetY;

  btnNoRunaway.style.transform = `translate(${randX}px, ${randY}px)`;
}

btnNoRunaway.addEventListener("mouseenter", moveNoButton);
btnNoRunaway.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});
btnNoRunaway.addEventListener("click", moveNoButton);

// Chọn Voucher
const voucherItems = document.querySelectorAll(".voucher-item");
voucherItems.forEach((v) => {
  v.addEventListener("click", () => {
    v.classList.toggle("selected");
  });
});

btnYesLove.addEventListener("click", (e) => {
  const selectedVouchers = Array.from(document.querySelectorAll(".voucher-item.selected")).map(
    (el) => el.dataset.voucher
  );
  const voucherText =
    selectedVouchers.length > 0
      ? selectedVouchers.map((item) => `- ${item}`).join("<br/>")
      : "- Tất cả tình yêu to bự của anh dành cho Ni";

  celebrationSummary.innerHTML = `
    Cảm ơn công chúa Ni đã xác nhận yêu anh <strong>3000%</strong> (sau ${noCount} lần thử trêu anh)!<br/><br/>
    <strong>Danh sách đặc quyền 20/10 của Ni đã được kích hoạt:</strong><br/>
    ${voucherText}<br/><br/>
    <em>Chụp màn hình này gửi ngay cho anh để nhận quà liền tay nhé! Yêu em nhất trên đời!</em>
  `;
  celebrationBanner.classList.add("show");
  spawnHeartFireworks(e.clientX, e.clientY, 65);
});

document.getElementById("btn-fireworks").addEventListener("click", () => {
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      spawnHeartFireworks(
        window.innerWidth * (0.2 + Math.random() * 0.6),
        window.innerHeight * (0.2 + Math.random() * 0.5),
        45
      );
    }, i * 260);
  }
});
