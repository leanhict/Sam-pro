// ==========================================
// THẦN SÂM - STATE & LOGIC
// ==========================================

// --- State Management ---
let players = JSON.parse(localStorage.getItem('thanSamPlayers') || '[]');
let rounds = JSON.parse(localStorage.getItem('thanSamRounds') || '[]');
let currentScores = {};
let isTotalCalculated = false;
let actionWinnerId = null;
let currentActionType = null; 
let editingRoundId = null;

// --- Utils ---
const removeAccents = (str) => {
    if (!str) return '';
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
};

const fuzzySearch = (text, query) => {
    if (!query) return true;
    const cleanQuery = query.trim().replace(/\s+/g, ' ');
    if (text.toLowerCase().includes(cleanQuery.toLowerCase())) return true;
    const nText = removeAccents(text.toLowerCase()).replace(/\s+/g, '');
    const nQuery = removeAccents(cleanQuery.toLowerCase()).replace(/\s+/g, '');
    return nText.includes(nQuery);
};

// --- Theme Logic ---
function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeUI();
}

function updateThemeUI() {
    const isDark = document.documentElement.classList.contains('dark');
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
        lucide.createIcons();
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
    updateThemeUI();
}

// --- Modal Management ---
function openModal(id) { 
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden'); 
}

function closeModal(id) { 
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden'); 
}

// --- Actions & Scoring Logic ---
function addPlayer(e) {
    e.preventDefault();
    const input = document.getElementById('new-player-name');
    const name = input.value.trim();
    if (players.length >= 5) { 
        showNotice("Tối đa 5 người thôi!", "warning"); 
        return; 
    }
    if (!name) return;
    players.push({ id: Date.now().toString(), name });
    input.value = '';
    sync();
}

function handleScoreKeyDown(e, idx) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const nextInput = document.getElementById(`score-input-${idx + 1}`);
        if (nextInput) {
            nextInput.focus();
            nextInput.select();
        } else {
            e.target.blur();
        }
    }
}

function updateInputStyle(inputEl, score) {
    if (!inputEl) return;
    const baseClass = "w-14 h-11 text-center font-black rounded-xl border-2 outline-none text-sm transition-all flex-shrink-0";
    let scoreClass = 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300';
    if (score !== undefined && score !== null && !isNaN(score)) {
        if (score > 0) {
            scoreClass = 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-400 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400';
        } else if (score < 0) {
            scoreClass = 'bg-rose-50 dark:bg-rose-900/10 border-rose-400 dark:border-rose-500/30 text-rose-700 dark:text-rose-400';
        }
    }
    inputEl.className = `${baseClass} ${scoreClass}`;
}

function handleScoreChange(id, val, inputEl) {
    isTotalCalculated = false;
    const clean = val.replace(/[^0-9+-]/g, '');
    if (!clean || clean === '-' || clean === '+') {
        delete currentScores[id];
    } else {
        const num = parseInt(clean, 10);
        if (isNaN(num)) {
            delete currentScores[id];
        } else {
            if (val.includes('+')) {
                currentScores[id] = Math.abs(num);
            } else if (val.includes('-')) {
                currentScores[id] = -Math.abs(num);
            } else {
                currentScores[id] = num === 0 ? 0 : -Math.abs(num);
            }
        }
    }
    
    if (inputEl) {
        updateInputStyle(inputEl, currentScores[id]);
    }
    
    const chayBtn = document.getElementById(`chay-btn-${id}`);
    if (chayBtn) {
        const isChay = currentScores[id] === -15;
        chayBtn.className = `h-10 flex-1 rounded-xl text-[8px] font-black uppercase border transition-all ${isChay ? 'bg-amber-500 text-white border-amber-600 shadow-sm' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30'} flex items-center justify-center whitespace-nowrap px-0.5 active:scale-95`;
    }

    updateSaveButton();
}

function calculateTotalLeaves() {
    const missing = players.filter(p => currentScores[p.id] === undefined);
    if (missing.length > 1) { 
        showNotice("Hãy nhập điểm cho người thua!", "warning"); 
        return; 
    }
    if (missing.length === 0) return;
    const winnerId = missing[0].id;
    let total = 0;
    players.forEach(p => { 
        if (p.id !== winnerId) {
            const s = currentScores[p.id] || 0;
            const penalty = s > 0 ? -s : s;
            currentScores[p.id] = penalty;
            total += Math.abs(penalty);
        }
    });
    if (total === 0) { 
        showNotice("Nhập lá phạt trước!", "warning"); 
        return; 
    }
    currentScores[winnerId] = total;
    isTotalCalculated = true;
    renderPlayersList();
    updateSaveButton();
    showNotice(`+${total} cho ${missing[0].name}`, "success");
}

function quickAction(id, type) {
    if (type === 'AN_SAM') {
        players.forEach(p => { 
            currentScores[p.id] = (p.id === id) ? (players.length - 1) * 20 : -20; 
        });
        isTotalCalculated = true;
        renderPlayersList();
        updateSaveButton();
        showNotice("Đã tính điểm Ăn Sâm", "success");
    } else if (type === 'CHAY') {
        currentScores[id] = -15;
        isTotalCalculated = false;
        renderPlayersList();
        updateSaveButton();
        showNotice("Đã tính Cháy (-15 lá)", "success");
    } else {
        actionWinnerId = id;
        currentActionType = type;
        document.getElementById('action-modal-title').innerText = type === 'CHAT_2' ? "Chặt 2 của ai?" : "Bắt sâm của ai?";
        renderActionTargetList();
        openModal('action-target-modal');
    }
}

function executeAction(loserId) {
    const points = currentActionType === 'CHAT_2' ? 20 : 80;
    currentScores[actionWinnerId] = (currentScores[actionWinnerId] || 0) + points;
    currentScores[loserId] = (currentScores[loserId] || 0) - points;
    
    if (currentActionType === 'CHAT_SAM') {
        players.forEach(p => {
            if (p.id !== actionWinnerId && p.id !== loserId && currentScores[p.id] === undefined) {
                currentScores[p.id] = 0;
            }
        });
        isTotalCalculated = true;
    }
    
    closeModal('action-target-modal');
    renderPlayersList();
    updateSaveButton();
    showNotice(`Đã ghi nhận ${currentActionType === 'CHAT_2' ? 'Chặt 2' : 'Bắt Sâm'}!`, "success");
}

function saveRound() {
    if (!isTotalCalculated) { 
        showNotice("Hãy tính tổng lá trước!", "warning"); 
        return; 
    }
    const roundData = {
        id: editingRoundId || Date.now(),
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        scores: { ...currentScores }
    };
    if (editingRoundId) {
        const idx = rounds.findIndex(r => r.id === editingRoundId);
        if (idx !== -1) rounds[idx] = roundData;
        editingRoundId = null;
        showNotice("Đã cập nhật ván chơi", "success");
    } else {
        rounds.push(roundData);
        showNotice("Đã lưu ván mới", "success");
    }
    currentScores = {};
    isTotalCalculated = false;
    sync();
}

function editRound(id) {
    const round = rounds.find(r => r.id === id);
    if (!round) return;
    editingRoundId = id;
    currentScores = { ...round.scores };
    isTotalCalculated = true;
    switchTab('active');
    renderAll();
    showNotice("Đang sửa ván đấu...", "info");
}

function deleteRound(id) {
    const btn = document.getElementById('confirm-delete-round-btn');
    btn.onclick = () => {
        rounds = rounds.filter(r => r.id !== id);
        if (editingRoundId === id) { 
            editingRoundId = null; 
            currentScores = {}; 
            isTotalCalculated = false; 
        }
        sync();
        closeModal('delete-round-modal');
        showNotice("Đã xóa ván chơi", "info");
    };
    openModal('delete-round-modal');
}

function confirmClearScores() {
    currentScores = {};
    isTotalCalculated = false;
    editingRoundId = null;
    closeModal('clear-scores-modal');
    renderAll();
}

function resetGame() {
    players = []; 
    rounds = []; 
    currentScores = {}; 
    isTotalCalculated = false; 
    editingRoundId = null;
    localStorage.clear();
    closeModal('reset-modal');
    sync();
}

function showNotice(msg, type) {
    const toast = document.createElement('div');
    const bgClass = type === 'warning' ? 'bg-rose-500' : (type === 'success' ? 'bg-emerald-600' : 'bg-slate-800 dark:bg-slate-700');
    toast.className = `fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 rounded-2xl shadow-xl text-white font-bold text-[11px] flex items-center gap-2 animate-in slide-in-from-top-4 ${bgClass}`;
    toast.innerHTML = `<i data-lucide="${type==='warning' ? 'alert-circle' : (type === 'success' ? 'check-circle' : 'zap')}" class="w-4 h-4 text-white"></i> ${msg}`;
    document.body.appendChild(toast);
    lucide.createIcons();
    setTimeout(() => toast.remove(), 3000);
}

function sync() {
    localStorage.setItem('thanSamPlayers', JSON.stringify(players));
    localStorage.setItem('thanSamRounds', JSON.stringify(rounds));
    renderAll();
}

function switchTab(tab) {
    document.getElementById('view-active').classList.toggle('hidden', tab !== 'active');
    document.getElementById('view-history').classList.toggle('hidden', tab !== 'history');
    const btnA = document.getElementById('tab-active');
    const btnH = document.getElementById('tab-history');
    if (tab === 'active') {
        btnA.className = "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-bold transition-all bg-indigo-600 text-white shadow-md";
        btnH.className = "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-bold transition-all text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800";
    } else {
        btnH.className = "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-bold transition-all bg-indigo-600 text-white shadow-md";
        btnA.className = "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-bold transition-all text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800";
    }
    lucide.createIcons();
}

// --- Render Functions ---
function renderAll() {
    document.getElementById('setup-section').classList.toggle('hidden', players.length >= 5 || editingRoundId !== null);
    document.getElementById('chart-section').classList.toggle('hidden', players.length === 0);
    document.getElementById('scoring-section').classList.toggle('hidden', players.length === 0);
    document.getElementById('round-count').innerText = `${rounds.length} ván`;
    if (editingRoundId) {
        const roundIdx = rounds.findIndex(r => r.id === editingRoundId);
        document.getElementById('current-round-title').innerHTML = `<i data-lucide="edit-3" class="w-3.5 h-3.5 text-amber-500"></i> Sửa ván thứ ${roundIdx + 1}`;
        document.getElementById('save-btn-text').innerText = "CẬP NHẬT ĐIỂM VÁN " + (roundIdx + 1);
    } else {
        document.getElementById('current-round-title').innerHTML = `<i data-lucide="star" class="w-3.5 h-3.5 text-yellow-500 fill-yellow-500"></i> Ván thứ ${rounds.length + 1}`;
        document.getElementById('save-btn-text').innerText = "LƯU ĐIỂM VÁN " + (rounds.length + 1);
    }
    renderPlayersList(); 
    renderChart(); 
    renderHistory(); 
    updateSaveButton(); 
    lucide.createIcons();
}

function renderPlayersList() {
    const list = document.getElementById('players-list');
    list.innerHTML = players.map((p, idx) => {
        const score = currentScores[p.id];
        const scoreClass = score > 0 
            ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-400 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400' 
            : (score < 0 
                ? 'bg-rose-50 dark:bg-rose-900/10 border-rose-400 dark:border-rose-500/30 text-rose-700 dark:text-rose-400' 
                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300');
        
        const wins = rounds.filter(r => (r.scores[p.id] || 0) > 0).length;
        
        return `
        <div class="flex items-center gap-1.5 p-1 bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 transition-all h-16">
            <div class="flex items-center gap-2 flex-[0.85] min-w-0">
                <div class="relative flex-shrink-0">
                    <div class="w-7 h-7 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-indigo-600 dark:text-indigo-300 rounded-lg flex items-center justify-center font-black text-xs uppercase shadow-sm">${p.name.charAt(0)}</div>
                    <span class="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm leading-none z-10">${wins}</span>
                </div>
                <span class="text-[12px] font-bold text-slate-700 dark:text-slate-200 truncate">${p.name}</span>
            </div>
            <div class="flex gap-1 flex-[2.8]">
                <button onclick="quickAction('${p.id}', 'AN_SAM')" class="h-10 flex-1 rounded-xl text-[8px] font-black uppercase border transition-all bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center whitespace-nowrap px-0.5 active:scale-95">Ăn sâm</button>
                <button onclick="quickAction('${p.id}', 'CHAT_2')" class="h-10 flex-1 rounded-xl text-[8px] font-black uppercase border transition-all bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-900/20 flex items-center justify-center whitespace-nowrap px-0.5 active:scale-95">Chặt 2</button>
                <button onclick="quickAction('${p.id}', 'CHAT_SAM')" class="h-10 flex-1 rounded-xl text-[8px] font-black uppercase border transition-all bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30 flex items-center justify-center whitespace-nowrap px-0.5 active:scale-95">Bắt sâm</button>
                <button id="chay-btn-${p.id}" onclick="quickAction('${p.id}', 'CHAY')" class="h-10 flex-1 rounded-xl text-[8px] font-black uppercase border transition-all ${score === -15 ? 'bg-amber-500 text-white border-amber-600 shadow-sm' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30'} flex items-center justify-center whitespace-nowrap px-0.5 active:scale-95">Cháy</button>
            </div>
            <input type="text" id="score-input-${idx}" inputmode="numeric" onfocus="this.select()" onkeydown="handleScoreKeyDown(event, ${idx})" oninput="handleScoreChange('${p.id}', this.value, this)" value="${score !== undefined ? score : ''}" class="w-14 h-11 text-center font-black rounded-xl border-2 outline-none text-sm transition-all flex-shrink-0 ${scoreClass}" placeholder="0">
        </div>`;
    }).join('');
    lucide.createIcons();
}

function renderChart() {
    const container = document.getElementById('chart-bars');
    if (players.length === 0) return;
    const totals = players.map(p => ({ ...p, total: rounds.reduce((s, r) => s + (r.scores[p.id] || 0), 0) }));
    const maxVal = Math.max(...totals.map(t => Math.abs(t.total)), 20);
    const sorted = [...totals].sort((a,b) => b.total - a.total);
    const topId = sorted[0].total > 0 ? sorted[0].id : null;
    const bottomIds = sorted.slice(-2).map(x => x.id);
    const poopIcon = `
        <div class="smelly-container mb-1">
            <span class="text-lg animate-bounce inline-block">💩</span>
            <span class="smelly-smoke wave-1">~</span>
            <span class="smelly-smoke wave-2">~</span>
            <span class="smelly-smoke wave-3">~</span>
        </div>`;
    const crownIcon = `
        <div class="crown-glow mb-1 relative w-6 h-6 flex items-center justify-center">
            <div class="crown-ring ring-1"></div>
            <div class="crown-ring ring-2"></div>
            <div class="crown-ring ring-3"></div>
            <i data-lucide="crown" class="w-4 h-4 text-yellow-500 fill-yellow-500 relative z-10 animate-bounce"></i>
        </div>`;
    container.innerHTML = totals.map(p => {
        const isPos = p.total >= 0;
        const h = (Math.abs(p.total) / maxVal) * 100;
        const isTop = p.id === topId;
        const isBottom = bottomIds.includes(p.id) && totals.length >= 3;
        return `
        <div class="flex-1 flex flex-col items-center relative h-full overflow-visible px-0.5">
            <div class="flex-1 w-full flex flex-col justify-end items-center relative overflow-visible">
                ${isPos ? `
                    <div class="absolute flex flex-col items-center z-20" style="bottom: calc(${h}% + 8px)">
                        ${isTop ? crownIcon : ''}
                        ${isBottom && !isTop ? poopIcon : ''}
                        <span class="text-[10px] font-extrabold text-slate-600 dark:text-slate-300 uppercase truncate max-w-[58px] mb-1 text-center leading-tight tracking-tight">${p.name}</span>
                        <span class="text-[10px] font-black tabular-nums px-1.5 py-0.5 rounded-md shadow-sm border whitespace-nowrap ${p.total > 0 ? 'text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/40 border-indigo-100 dark:border-indigo-800' : 'text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'}">${p.total}</span>
                    </div>
                    <div class="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t ${isTop ? 'from-yellow-500 to-yellow-300' : 'from-indigo-600 dark:from-indigo-700 to-indigo-400 dark:to-indigo-500'} shadow-sm chart-bar-transition" style="height: ${h}%"></div>
                ` : ''}
            </div>
            <div class="flex-1 w-full flex flex-col justify-start items-center relative overflow-visible">
                ${!isPos ? `
                    <div class="w-full max-w-[40px] rounded-b-lg bg-gradient-to-b from-rose-500 dark:from-rose-600 to-rose-400 dark:to-rose-500 shadow-sm chart-bar-transition" style="height: ${h}%"></div>
                    <div class="absolute flex flex-col items-center z-20" style="top: calc(${h}% + 8px)">
                        <span class="text-[10px] font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/40 border border-rose-100 dark:border-rose-800 px-1.5 py-0.5 rounded-md shadow-sm tabular-nums whitespace-nowrap mb-1">${p.total}</span>
                        <span class="text-[10px] font-extrabold text-slate-600 dark:text-slate-300 uppercase truncate max-w-[58px] mb-1 text-center leading-tight tracking-tight">${p.name}</span>
                        ${isBottom ? poopIcon.replace('mb-1', 'animate-pulse') : ''}
                    </div>
                ` : ''}
            </div>
        </div>`;
    }).join('');
    lucide.createIcons();
}

function renderHistory() {
    const q = document.getElementById('history-search').value;
    const container = document.getElementById('history-list');
    const filtered = rounds.filter(r => fuzzySearch(r.timestamp, q) || players.some(p => fuzzySearch(p.name, q)));
    container.innerHTML = filtered.slice().reverse().map((r, idx) => {
        const originalIdx = rounds.findIndex(x => x.id === r.id);
        return `
        <div class="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div class="flex justify-between items-center mb-4 pb-2 border-b border-slate-50 dark:border-slate-800">
                <div class="flex items-center gap-2">
                    <span class="text-[9px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded-md uppercase border border-indigo-100 dark:border-indigo-900/30">VÁN #${originalIdx + 1}</span>
                    <span class="text-[9px] text-slate-400 dark:text-slate-500 font-black">${r.timestamp}</span>
                </div>
                <div class="flex gap-2">
                    <button onclick="editRound(${r.id})" class="p-1.5 text-amber-500 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:scale-110 transition-all"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>
                    <button onclick="deleteRound(${r.id})" class="p-1.5 text-rose-500 bg-rose-50 dark:bg-rose-900/20 rounded-lg hover:scale-110 transition-all"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                </div>
            </div>
            <div class="grid grid-cols-5 gap-2">
                ${players.map(p => {
                    const s = r.scores[p.id] || 0;
                    const c = s > 0 ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30' : (s < 0 ? 'bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-700');
                    return `<div class="text-center"><p class="text-[8px] font-bold text-slate-400 dark:text-slate-500 truncate mb-1 text-[7px]">${p.name}</p><div class="py-1 rounded-lg font-black text-[10px] border ${c}">${s}</div></div>`;
                }).join('')}
            </div>
        </div>`;
    }).join('');
    if (!filtered.length) container.innerHTML = '<p class="text-center text-xs text-slate-400 dark:text-slate-600 py-10 font-bold uppercase tracking-widest text-[10px]">Trống...</p>';
    lucide.createIcons();
}

function renderActionTargetList() {
    const list = document.getElementById('action-target-list');
    const points = currentActionType === 'CHAT_2' ? 20 : 80;
    list.innerHTML = players.filter(p => p.id !== actionWinnerId).map(p => `
        <button onclick="executeAction('${p.id}')" class="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 border border-slate-100 dark:border-slate-700 rounded-2xl group transition-all text-left">
            <span class="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-300 text-[13px]">${p.name}</span>
            <span class="text-xs font-black text-rose-500 text-[11px]">-${points} điểm</span>
        </button>
    `).join('');
}

function updateSaveButton() {
    const btn = document.getElementById('save-round-btn');
    const hasScores = Object.keys(currentScores).length > 0;
    btn.classList.toggle('opacity-50', !hasScores);
    btn.classList.toggle('cursor-not-allowed', !hasScores);
    btn.disabled = !hasScores;
}

// --- App Bootstrap ---
window.onload = () => { 
    initTheme(); 
    lucide.createIcons(); 
    renderAll(); 
};
