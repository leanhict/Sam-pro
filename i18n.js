// ==========================================
// THẦN SÂM - INTERNATIONALIZATION (i18n)
// ==========================================

const TRANSLATIONS = {
    vi: {
        app_name: 'Thần <span class="text-indigo-600 dark:text-indigo-400">Sâm</span>',
        app_credit: "Made by Le Anh",
        tab_score: "Ghi Điểm",
        tab_history: "Lịch Sử",
        player_input_placeholder: "Tên tay chơi mới...",
        btn_add_player: "Thêm",
        standings_title: "Phong độ hiện tại",
        rounds_unit: "ván",
        round_prefix: "Ván thứ",
        round_edit_prefix: "Sửa ván thứ",
        btn_clear_scores: "XÓA ĐIỂM",
        btn_calc_winner: "TÍNH TỔNG LÁ CHO NGƯỜI THẮNG",
        btn_save_round: "LƯU ĐIỂM VÁN {num}",
        btn_update_round: "CẬP NHẬT ĐIỂM VÁN {num}",
        btn_an_sam: "Ăn sâm",
        btn_chat_2: "Chặt 2",
        btn_chat_sam: "Bắt sâm",
        btn_chay: "Cháy",
        history_search_placeholder: "Tìm ván, điểm, tên...",
        history_round_tag: "VÁN #{num}",
        history_empty: "Trống...",

        // Modals
        modal_reset_title: "Xóa sạch trận chơi?",
        modal_reset_desc: "Dữ liệu sẽ bị xóa hoàn toàn khỏi thiết bị.",
        modal_reset_confirm: "XÓA NGAY",
        modal_reset_cancel: "HỦY BỎ",
        modal_clear_title: "Xóa điểm ván này?",
        modal_clear_confirm: "XÁC NHẬN",
        modal_clear_cancel: "HỦY BỎ",
        modal_delete_title: "Xóa ván chơi này?",
        modal_delete_desc: "Thao tác này không thể hoàn tác.",
        modal_delete_confirm: "XÓA VÁN",
        modal_delete_cancel: "HỦY BỎ",
        modal_target_title_chat_2: "Chặt 2 của ai?",
        modal_target_title_chat_sam: "Bắt sâm của ai?",
        modal_target_title_default: "Ai bị bắt?",
        pts_unit: "điểm",

        // Notices / Toasts
        notice_max_players: "Tối đa 5 người thôi!",
        notice_missing_scores: "Hãy nhập điểm cho người thua!",
        notice_enter_penalties: "Nhập lá phạt trước!",
        notice_winner_points: "+{total} cho {name}",
        notice_an_sam_calculated: "Đã tính điểm Ăn Sâm",
        notice_chay_calculated: "Đã tính Cháy (-15 lá)",
        notice_action_chat_2: "Chặt 2",
        notice_action_chat_sam: "Bắt Sâm",
        notice_action_recorded: "Đã ghi nhận {action}!",
        notice_calc_first: "Hãy tính tổng lá trước!",
        notice_round_updated: "Đã cập nhật ván chơi",
        notice_round_saved: "Đã lưu ván mới",
        notice_editing_round: "Đang sửa ván đấu...",
        notice_round_deleted: "Đã xóa ván chơi",

        // Footer & General
        footer_local_mode: "Thần Sâm Local Mode"
    },
    en: {
        app_name: 'Sam <span class="text-indigo-600 dark:text-indigo-400">Master</span>',
        app_credit: "Made by Le Anh",
        tab_score: "Score",
        tab_history: "History",
        player_input_placeholder: "New player name...",
        btn_add_player: "Add",
        standings_title: "Current Standings",
        rounds_unit: "rounds",
        round_prefix: "Round #",
        round_edit_prefix: "Edit Round #",
        btn_clear_scores: "CLEAR",
        btn_calc_winner: "AUTO TOTAL FOR WINNER",
        btn_save_round: "SAVE ROUND {num}",
        btn_update_round: "UPDATE ROUND {num}",
        btn_an_sam: "Call Sam",
        btn_chat_2: "Chop 2",
        btn_chat_sam: "Catch Sam",
        btn_chay: "Bust",
        history_search_placeholder: "Search round, score, player...",
        history_round_tag: "ROUND #{num}",
        history_empty: "No records...",

        // Modals
        modal_reset_title: "Reset Entire Match?",
        modal_reset_desc: "All match data will be permanently cleared from this device.",
        modal_reset_confirm: "RESET ALL",
        modal_reset_cancel: "CANCEL",
        modal_clear_title: "Clear Current Round Scores?",
        modal_clear_confirm: "CONFIRM",
        modal_clear_cancel: "CANCEL",
        modal_delete_title: "Delete This Round?",
        modal_delete_desc: "This action cannot be undone.",
        modal_delete_confirm: "DELETE ROUND",
        modal_delete_cancel: "CANCEL",
        modal_target_title_chat_2: "Chop 2 from whom?",
        modal_target_title_chat_sam: "Catch Sam from whom?",
        modal_target_title_default: "Target player?",
        pts_unit: "pts",

        // Notices / Toasts
        notice_max_players: "Maximum 5 players allowed!",
        notice_missing_scores: "Please enter penalty cards for the losers!",
        notice_enter_penalties: "Enter penalty cards first!",
        notice_winner_points: "+{total} for {name}",
        notice_an_sam_calculated: "Calculated Call Sam score",
        notice_chay_calculated: "Calculated Bust (-15 cards)",
        notice_action_chat_2: "Chop 2",
        notice_action_chat_sam: "Catch Sam",
        notice_action_recorded: "Recorded {action}!",
        notice_calc_first: "Please calculate total scores first!",
        notice_round_updated: "Round updated successfully",
        notice_round_saved: "New round saved",
        notice_editing_round: "Editing round...",
        notice_round_deleted: "Round deleted",

        // Footer & General
        footer_local_mode: "Sam Master Local Mode"
    },
    ja: {
        app_name: 'サム<span class="text-indigo-600 dark:text-indigo-400">マスター</span>',
        app_credit: "Made by Le Anh",
        tab_score: "スコア記録",
        tab_history: "履歴",
        player_input_placeholder: "新規プレイヤー名...",
        btn_add_player: "追加",
        standings_title: "現在の成績",
        rounds_unit: "ラウンド",
        round_prefix: "ラウンド ",
        round_edit_prefix: "ラウンド編集 ",
        btn_clear_scores: "スコア消去",
        btn_calc_winner: "勝者の総得点を自動計算",
        btn_save_round: "第{num}ラウンドを保存",
        btn_update_round: "第{num}ラウンドを更新",
        btn_an_sam: "サム勝ち",
        btn_chat_2: "2を阻止",
        btn_chat_sam: "サム阻止",
        btn_chay: "バースト",
        history_search_placeholder: "ラウンド、スコア、プレイヤーを検索...",
        history_round_tag: "ラウンド #{num}",
        history_empty: "データがありません...",

        // Modals
        modal_reset_title: "試合を全リセットしますか？",
        modal_reset_desc: "この端末から全データが完全に削除されます。",
        modal_reset_confirm: "今すぐ消去",
        modal_reset_cancel: "キャンセル",
        modal_clear_title: "このラウンドのスコアを消去しますか？",
        modal_clear_confirm: "確認",
        modal_clear_cancel: "キャンセル",
        modal_delete_title: "このラウンドを削除しますか？",
        modal_delete_desc: "この操作は元に戻せません。",
        modal_delete_confirm: "ラウンド削除",
        modal_delete_cancel: "キャンセル",
        modal_target_title_chat_2: "誰の2を阻止しましたか？",
        modal_target_title_chat_sam: "誰のサムを阻止しましたか？",
        modal_target_title_default: "対象プレイヤー",
        pts_unit: "点",

        // Notices / Toasts
        notice_max_players: "最大5人までです！",
        notice_missing_scores: "敗者の残り枚数を入力してください！",
        notice_enter_penalties: "ペナルティ枚数を先に入力してください！",
        notice_winner_points: "{name} に +{total} 点",
        notice_an_sam_calculated: "サム勝ちの得点を計算しました",
        notice_chay_calculated: "バースト (-15枚) を計算しました",
        notice_action_chat_2: "2阻止",
        notice_action_chat_sam: "サム阻止",
        notice_action_recorded: "{action} を記録しました！",
        notice_calc_first: "先に合計枚数を計算してください！",
        notice_round_updated: "ラウンドを更新しました",
        notice_round_saved: "新規ラウンドを保存しました",
        notice_editing_round: "ラウンドを編集中...",
        notice_round_deleted: "ラウンドを削除しました",

        // Footer & General
        footer_local_mode: "サムマスター Local Mode"
    },
    zh: {
        app_name: '参牌<span class="text-indigo-600 dark:text-indigo-400">大师</span>',
        app_credit: "Made by Le Anh",
        tab_score: "记分",
        tab_history: "历史",
        player_input_placeholder: "新玩家姓名...",
        btn_add_player: "添加",
        standings_title: "当前战绩",
        rounds_unit: "局",
        round_prefix: "回合 ",
        round_edit_prefix: "编辑回合 ",
        btn_clear_scores: "清空分数",
        btn_calc_winner: "自动计算赢家总分",
        btn_save_round: "保存第{num}局",
        btn_update_round: "更新第{num}局",
        btn_an_sam: "吃参",
        btn_chat_2: "截杀2",
        btn_chat_sam: "抓参",
        btn_chay: "烧牌",
        history_search_placeholder: "搜索局数、分数、玩家...",
        history_round_tag: "第{num}局",
        history_empty: "暂无数据...",

        // Modals
        modal_reset_title: "重置整场比赛？",
        modal_reset_desc: "数据将从此设备中彻底清除。",
        modal_reset_confirm: "立即清除",
        modal_reset_cancel: "取消",
        modal_clear_title: "清空本局分数？",
        modal_clear_confirm: "确认",
        modal_clear_cancel: "取消",
        modal_delete_title: "删除此局？",
        modal_delete_desc: "此操作无法撤销。",
        modal_delete_confirm: "删除本局",
        modal_delete_cancel: "取消",
        modal_target_title_chat_2: "截杀了谁的2？",
        modal_target_title_chat_sam: "抓了谁的参？",
        modal_target_title_default: "被抓目标玩家",
        pts_unit: "分",

        // Notices / Toasts
        notice_max_players: "最多只能添加5名玩家！",
        notice_missing_scores: "请先输入输家的罚牌数！",
        notice_enter_penalties: "请先输入罚牌张数！",
        notice_winner_points: "{name} 获得 +{total} 分",
        notice_an_sam_calculated: "已计算吃参获胜分数",
        notice_chay_calculated: "已计算烧牌（-15张）",
        notice_action_chat_2: "截杀2",
        notice_action_chat_sam: "抓参",
        notice_action_recorded: "已记录{action}！",
        notice_calc_first: "请先自动计算总张数！",
        notice_round_updated: "已更新本局数据",
        notice_round_saved: "已保存新一局",
        notice_editing_round: "正在编辑该局...",
        notice_round_deleted: "已删除该局",

        // Footer & General
        footer_local_mode: "参牌大师 Local Mode"
    }
};

let currentLang = 'vi';

function detectDefaultLanguage() {
    const saved = localStorage.getItem('thanSamLang');
    if (saved && TRANSLATIONS[saved]) {
        return saved;
    }
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browserLang.startsWith('vi')) {
        return 'vi';
    }
    if (browserLang.startsWith('ja')) {
        return 'ja';
    }
    if (browserLang.startsWith('zh')) {
        return 'zh';
    }
    return 'en';
}

function getLanguage() {
    return currentLang;
}

function t(key, params = {}) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['vi'];
    let text = dict[key] || TRANSLATIONS['vi'][key] || key;
    if (typeof text === 'string') {
        Object.entries(params).forEach(([k, v]) => {
            text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
        });
    }
    return text;
}

function applyStaticTranslations() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = t(key);
        if (text) {
            el.innerHTML = text;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const text = t(key);
        if (text) {
            el.placeholder = text;
        }
    });

    updateLanguageUI();
}

function updateLanguageUI() {
    // Highlight active option in language dropdown
    const langItems = document.querySelectorAll('.lang-item');
    langItems.forEach(item => {
        const lang = item.getAttribute('data-lang');
        const check = item.querySelector('.checkmark');
        const isCurrent = lang === currentLang;
        if (check) {
            check.classList.toggle('hidden', !isCurrent);
        }
        item.classList.toggle('bg-indigo-50', isCurrent);
        item.classList.toggle('dark:bg-indigo-900/30', isCurrent);
        item.classList.toggle('text-indigo-600', isCurrent);
        item.classList.toggle('dark:text-indigo-400', isCurrent);
    });

    if (window.lucide) {
        lucide.createIcons();
    }
}

function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    localStorage.setItem('thanSamLang', lang);
    applyStaticTranslations();
    closeLangMenu();
    if (typeof renderAll === 'function') {
        renderAll();
    }
}

function toggleLangMenu(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

function closeLangMenu() {
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
        dropdown.classList.add('hidden');
    }
}

function initI18n() {
    currentLang = detectDefaultLanguage();
    applyStaticTranslations();

    // Close language dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const langContainer = document.getElementById('lang-container');
        if (langContainer && !langContainer.contains(e.target)) {
            closeLangMenu();
        }
    });
}

