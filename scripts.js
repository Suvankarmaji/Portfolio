/**
 * MAJI_OS v3.0 Script Engine
 * Core logic for terminal, dashboard, theme switching, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- UTILITIES ---
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // --- DASHBOARD LOGIC ---
    const dashboardOverlay = document.getElementById('dashboard-overlay');
    const dashboardTitle = document.getElementById('dashboard-title');
    const dashboardContent = document.getElementById('dashboard-content');

    window.openDashboard = function(type) {
        if (!dashboardOverlay) return;
        dashboardOverlay.classList.remove('hidden');
        dashboardOverlay.classList.add('flex');
        
        if (window.metricsInterval) clearInterval(window.metricsInterval);

        switch(type) {
            case 'src':
                dashboardTitle.innerText = 'CORE_PROJECT_MANIFEST';
                dashboardContent.innerHTML = `
                    <div class="space-y-4">
                        <p class="text-primary">// priority_logic.v1.java</p>
                        <div class="p-4 bg-surface-container-low border-l-2 border-primary/40 opacity-80">
                            <code class="block whitespace-pre">public class HospitalApp {\n  public static void main(String[] args) {\n    PriorityQueue&lt;Patient&gt; pQueue = new PriorityQueue&lt;&gt;();\n    pQueue.add(new Patient("Critical", 1));\n    pQueue.add(new Patient("Stable", 5));\n    process(pQueue);\n  }\n}</code>
                        </div>
                        <p class="text-primary">// fraud_detection.py</p>
                        <div class="p-4 bg-surface-container-low border-l-2 border-primary/40 opacity-80">
                            <code class="block whitespace-pre">def detect_fraud(transaction_data):\n    model = EnsembleModel.load('model_v4')\n    prediction = model.predict(transaction_data)\n    explainer = shap.TreeExplainer(model)\n    return prediction, explainer.shap_values(transaction_data)</code>
                        </div>
                    </div>`;
                break;
            case 'bin':
                dashboardTitle.innerText = 'NEURAL_UNIT_LOAD';
                const processes = [
                    { id: 1024, name: 'TRIAGE_SCHEDULER', user: 'root', cpu: '12.4%', mem: '45MB' },
                    { id: 2048, name: 'ML_INFERENCE_CORE', user: 'suvankar', cpu: '8.2%', mem: '128MB' },
                    { id: 4096, name: 'STREAMLIT_HOST', user: 'suvankar', cpu: '2.1%', mem: '84MB' },
                    { id: 8192, name: 'BED_MGMT_SYNC', user: 'system', cpu: '0.4%', mem: '12MB' }
                ];
                dashboardContent.innerHTML = `
                    <table class="w-full text-left border-collapse">
                        <tr class="text-on-surface-variant uppercase tracking-widest border-b border-primary/10 text-[10px]">
                            <th class="py-2">PID</th><th class="py-2">PROCESS</th><th class="py-2">USER</th><th class="py-2">CPU</th><th class="py-2">MEM</th>
                        </tr>
                        <tbody id="metrics-table-body">
                        ${processes.map(p => `
                            <tr class="hover:bg-primary/5 transition-colors border-b border-white/5 text-[10px]">
                                <td class="py-2 font-bold">${p.id}</td>
                                <td class="py-2 text-primary">${p.name}</td>
                                <td class="py-2">${p.user}</td>
                                <td class="py-2 text-secondary metric-cpu">${p.cpu}</td>
                                <td class="py-2 metric-mem">${p.mem}</td>
                            </tr>
                        `).join('')}
                        </tbody>
                    </table>`;
                window.metricsInterval = setInterval(() => {
                    document.querySelectorAll('.metric-cpu').forEach(el => {
                        el.innerText = (Math.random() * 15).toFixed(1) + '%';
                    });
                    document.querySelectorAll('.metric-mem').forEach(el => {
                        const base = parseInt(el.innerText);
                        el.innerText = (base + (Math.random() * 2 - 1)).toFixed(0) + 'MB';
                    });
                }, 2000);
                break;
            case 'var':
                dashboardTitle.innerText = 'ARCHITECT_METADATA';
                const envs = [
                    { key: 'MODEL_VERSION', val: 'E_LOG_V4.2' },
                    { key: 'TRIAGE_ALGO', val: 'H_PRIORITY_V2' },
                    { key: 'V_VELLORE_COORDS', val: '12.9716, 79.1595' },
                    { key: 'SSL_PROTOCOL', val: 'RSA_4096' },
                    { key: 'SHELL', val: '/usr/bin/zsh' },
                    { key: 'DEBUG_LEVEL', val: 'INFORMATIONAL' }
                ];
                dashboardContent.innerHTML = `
                    <div class="grid grid-cols-1 gap-2 text-[10px]">
                        ${envs.map(e => `
                            <div class="flex justify-between p-3 bg-surface-container-low border border-primary/5">
                                <span class="text-primary font-bold">${e.key}</span>
                                <span class="text-on-surface-variant font-mono">[${e.val}]</span>
                            </div>
                        `).join('')}
                    </div>`;
                break;
        }
    };

    window.closeDashboard = function() {
        if (dashboardOverlay) {
            dashboardOverlay.classList.add('hidden');
            dashboardOverlay.classList.remove('flex');
        }
    };

    // --- SIDEBAR EVENT LISTENERS ---
    const sbSrc = document.getElementById('sidebar-src');
    const sbBin = document.getElementById('sidebar-bin');
    const sbVar = document.getElementById('sidebar-var');
    const sbRoot = document.getElementById('sidebar-root');

    if (sbSrc) sbSrc.addEventListener('click', () => openDashboard('src'));
    if (sbBin) sbBin.addEventListener('click', () => openDashboard('bin'));
    if (sbVar) sbVar.addEventListener('click', () => openDashboard('var'));
    if (sbRoot) sbRoot.addEventListener('click', () => {
        const home = document.getElementById('home');
        if (home) home.scrollIntoView({ behavior: 'smooth' });
    });

    // Skill Fluctuations
    setInterval(() => {
        document.querySelectorAll('.sync-percent').forEach(el => {
            const current = parseInt(el.innerText);
            const delta = Math.floor(Math.random() * 3) - 1;
            el.innerText = Math.max(80, Math.min(99, current + delta));
        });
    }, 1500);

    // --- THEME ENGINE ---
    window.updateThemeColor = function(hex) {
        const root = document.querySelector(':root');
        const rgb = hexToRgb(hex);
        if (!rgb) return;
        
        root.style.setProperty('--primary', hex);
        root.style.setProperty('--primary-glow', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`);
        root.style.setProperty('--primary-bg', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
        
        document.querySelectorAll('.text-\\[\\#00FF00\\]').forEach(el => el.style.color = hex);
        document.querySelectorAll('.border-\\[\\#00FF00\\]').forEach(el => el.style.borderColor = hex);
        document.querySelectorAll('.bg-\\[\\#00FF00\\]').forEach(el => el.style.backgroundColor = hex);
        document.querySelectorAll('.bg-\\[\\#02e600\\]').forEach(el => el.style.backgroundColor = hex);
        document.querySelectorAll('.shadow-\\[0_0_10px_rgba\\(2\\,230\\,0\\,0\\.08\\)\\]').forEach(el => {
            el.style.boxShadow = `0 0 10px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`;
        });
        
        const ambient = document.getElementById('ambient-glow');
        if (ambient) ambient.style.backgroundImage = `radial-gradient(circle at 50% 50%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05) 0%, rgba(0,0,0,0) 100%)`;
    };

    // --- MODALS & TERMINAL ---
    const settingsModal = document.getElementById('settings-overlay');
    const closeSettings = document.getElementById('close-settings');
    const settingsTrigger = document.getElementById('settings-trigger');

    if (settingsTrigger) settingsTrigger.addEventListener('click', () => {
        settingsModal.classList.remove('hidden');
        settingsModal.classList.add('flex');
    });
    if (closeSettings) closeSettings.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
        settingsModal.classList.remove('flex');
    });

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => updateThemeColor(btn.dataset.color));
    });

    const toggleCrt = document.getElementById('toggle-crt');
    const crtOverlay = document.getElementById('crt-overlay');
    if (toggleCrt && crtOverlay) {
        toggleCrt.addEventListener('change', (e) => {
            crtOverlay.style.display = e.target.checked ? 'block' : 'none';
        });
    }

    const terminalOverlay = document.getElementById('terminal-overlay');
    const modalInput = document.getElementById('modal-terminal-input');
    const terminalHistory = document.getElementById('terminal-history');
    const terminalBody = document.getElementById('terminal-body');
    const terminalTrigger = document.getElementById('terminal-trigger');
    const closeTerminal = document.getElementById('close-terminal');

    if (terminalTrigger) terminalTrigger.addEventListener('click', () => {
        terminalOverlay.classList.remove('hidden');
        terminalOverlay.classList.add('flex');
        if (modalInput) modalInput.focus();
    });
    if (closeTerminal) closeTerminal.addEventListener('click', () => {
        terminalOverlay.classList.add('hidden');
        terminalOverlay.classList.remove('flex');
    });

    // Update modal input listener
    if (modalInput) {
        modalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = modalInput.value.trim().toLowerCase();
                processCommand(cmd);
                modalInput.value = '';
            }
        });
    }

    function processCommand(cmd) {
        if (!terminalHistory) return;
        const line = document.createElement('p');
        line.innerHTML = `<span class="text-primary font-bold">&gt; ${cmd}</span>`;
        terminalHistory.appendChild(line);

        const response = document.createElement('p');
        response.className = 'text-on-surface-variant font-light opacity-80 pl-4 text-xs';

        switch(cmd) {
            case 'help':
                response.innerHTML = 'AVAILABLE COMMANDS: <br> - ABOUT: Profile summary <br> - DEPLOY: Simulate build <br> - CLEAR: Reset history <br> - EXIT: Close';
                break;
            case 'deploy':
                runDeploySimulation();
                return;
            case 'clear':
                terminalHistory.innerHTML = '';
                return;
            case 'about':
                response.innerHTML = 'SUVANKAR MAJI: CS @ VIT Vellore. Architecting AI solutions.';
                break;
            case 'exit':
                terminalOverlay.classList.add('hidden');
                return;
            default:
                response.innerHTML = `ERR: CMD_NOT_FOUND: ${cmd}`;
        }
        terminalHistory.appendChild(response);
        if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function runDeploySimulation() {
        const steps = [
            { msg: 'INITIALIZING_BUILD...', delay: 500, color: 'primary' },
            { msg: 'COMPILING_LABS_ASSETS...', delay: 1000, color: 'on-surface-variant' },
            { msg: 'DEPLOYING_TO_EDGE...', delay: 1200, color: 'secondary' },
            { msg: 'SUCCESS: MAJI_OS LIVE ✅', delay: 500, color: 'primary' }
        ];
        let current = 0;
        function next() {
            if (current < steps.length) {
                const s = steps[current];
                const p = document.createElement('p');
                p.className = `text-${s.color} text-[10px] pl-4 opacity-80`;
                p.innerText = `>> ${s.msg}`;
                terminalHistory.appendChild(p);
                if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
                current++;
                setTimeout(next, s.delay);
            }
        }
        next();
    }

    // --- POWER / SHUTDOWN ---
    const powerTrigger = document.getElementById('power-trigger');
    const shutdownOverlay = document.getElementById('shutdown-overlay');
    if (powerTrigger && shutdownOverlay) {
        powerTrigger.addEventListener('click', () => {
            shutdownOverlay.classList.remove('hidden');
            shutdownOverlay.classList.add('flex');
            let progress = 100;
            const shutInterval = setInterval(() => {
                progress -= Math.random() * 5;
                const pBar = document.getElementById('shutdown-progress');
                if (pBar) pBar.style.width = progress + '%';
                if (progress <= 0) {
                    clearInterval(shutInterval);
                    triggerCrtCollapse();
                }
            }, 50);
        });
    }

    function triggerCrtCollapse() {
        const text = document.getElementById('shutdown-text');
        if (text) text.innerText = 'SYSTEM_OFFLINE';
        setTimeout(() => {
            document.body.classList.add('shutdown-anim');
            setTimeout(() => {
                const screen = document.getElementById('shutdown-screen');
                const reboot = document.getElementById('reboot-screen');
                if (screen) screen.classList.add('hidden');
                if (reboot) {
                    reboot.classList.remove('hidden');
                    reboot.classList.add('flex');
                }
                document.body.classList.remove('shutdown-anim');
                document.body.style.backgroundColor = 'black';
            }, 800);
        }, 500);
    }

    const rebootBtn = document.getElementById('reboot-btn');
    if (rebootBtn) rebootBtn.addEventListener('click', () => window.location.reload());

    // --- UPTIME ENGINE ---
    const uptimeEl = document.getElementById('uptime-counter');
    if (uptimeEl) {
        let start = Date.now();
        setInterval(() => {
            const d = Date.now() - start;
            const h = Math.floor(d / 3600000).toString().padStart(2, '0');
            const m = Math.floor((d % 3600000) / 60000).toString().padStart(2, '0');
            const s = Math.floor((d % 60000) / 1000).toString().padStart(2, '0');
            uptimeEl.innerText = `${h}:${m}:${s}`;
        }, 1000);
    }

    // --- TYPING ANIMATION (FOOTER) ---
    const termInput = document.getElementById('terminal-input');
    if (termInput) {
        const autoCommands = ['maji_os --scan', './view_labs.sh', 'whoami', 'date'];
        let active = true;
        let idx = 0;

        function type(cmd) {
            if (!active) return;
            let ci = 0;
            termInput.value = '';
            const int = setInterval(() => {
                if (!active) { clearInterval(int); return; }
                if (ci < cmd.length) termInput.value += cmd[ci++];
                else {
                    clearInterval(int);
                    setTimeout(() => { if (active) clear(); }, 2000);
                }
            }, 60);
        }

        function clear() {
            const int = setInterval(() => {
                if (!active) { clearInterval(int); return; }
                if (termInput.value.length > 0) termInput.value = termInput.value.slice(0, -1);
                else {
                    clearInterval(int);
                    idx = (idx + 1) % autoCommands.length;
                    setTimeout(() => type(autoCommands[idx]), 500);
                }
            }, 30);
        }

        termInput.addEventListener('focus', () => active = false);
        termInput.addEventListener('blur', () => {
            if (!termInput.value) { active = true; type(autoCommands[idx]); }
        });
        setTimeout(() => type(autoCommands[0]), 1000);
    }
});
