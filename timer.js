let timeLeft = 25 * 60; // 25分を秒に変換
let timerInterval;
let isRunning = false;
let currentMode = 'work'; // 'work' or 'break'

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('timeDisplay').textContent = formatTime(timeLeft);
        } else {
            // タイマー終了時の処理
            clearInterval(timerInterval);
            isRunning = false;
            if (currentMode === 'work') {
                // 作業時間終了後は休憩時間に切り替え
                timeLeft = 5 * 60; // 5分の休憩
                currentMode = 'break';
                document.getElementById('timeDisplay').textContent = formatTime(timeLeft);
                alert('作業時間終了！休憩時間です。');
            } else {
                // 休憩時間終了後は作業時間に切り替え
                timeLeft = 25 * 60; // 25分の作業
                currentMode = 'work';
                document.getElementById('timeDisplay').textContent = formatTime(timeLeft);
                alert('休憩時間終了！作業時間です。');
            }
        }
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    currentMode = 'work';
    timeLeft = 25 * 60;
    document.getElementById('timeDisplay').textContent = formatTime(timeLeft);
}
